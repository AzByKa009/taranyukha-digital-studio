import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";

const RATE_LIMIT_MAX_REQUESTS = 100;
const RATE_LIMIT_ENDPOINT = "analytics";

function getClientIp(req: Request): string {
  const xForwardedFor = req.headers.get("x-forwarded-for");
  if (xForwardedFor) {
    return xForwardedFor.split(",")[0].trim();
  }
  
  const xRealIp = req.headers.get("x-real-ip");
  if (xRealIp) {
    return xRealIp.trim();
  }
  
  const cfConnectingIp = req.headers.get("cf-connecting-ip");
  if (cfConnectingIp) {
    return cfConnectingIp.trim();
  }
  
  return "unknown";
}

function getAllowedOrigins(): Set<string> {
  const envOrigins = Deno.env.get("ALLOWED_ORIGINS") || "";
  const defaultOrigins = [
    "http://localhost:5173",
    "http://localhost:8080",
  ];
  
  const origins = envOrigins
    ? envOrigins.split(",").map(o => o.trim()).filter(Boolean)
    : defaultOrigins;
    
  return new Set(origins);
}

const corsHeaders = {
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Vary": "Origin",
};

function buildCorsHeaders(origin: string | null) {
  const allowedOrigins = getAllowedOrigins();
  const allowed = !!origin && allowedOrigins.has(origin);
  return {
    ...corsHeaders,
    "Access-Control-Allow-Origin": allowed && origin ? origin : "null",
  };
}

// Validation schemas
const PageViewSchema = z.object({
  page_path: z.string().max(500),
  page_title: z.string().max(200).optional(),
  referrer: z.string().max(2000).nullable().optional(),
  device_type: z.enum(["desktop", "mobile", "tablet"]).optional(),
  browser: z.string().max(50).optional(),
  session_id: z.string().max(100),
  visitor_id: z.string().max(100),
});

const SessionSchema = z.object({
  session_id: z.string().max(100),
  visitor_id: z.string().max(100),
  entry_page: z.string().max(500),
  referrer: z.string().max(2000).nullable().optional(),
  traffic_source: z.enum(["direct", "search", "social", "referral", "internal"]).optional(),
  device_type: z.enum(["desktop", "mobile", "tablet"]).optional(),
  browser: z.string().max(50).optional(),
  is_active: z.boolean().optional(),
});

const UpdateSessionSchema = z.object({
  session_id: z.string().max(100),
  exit_page: z.string().max(500).optional(),
  is_active: z.boolean().optional(),
  duration_seconds: z.number().min(0).max(86400).optional(),
});

const RequestSchema = z.object({
  action: z.enum(["page_view", "session_start", "session_update"]),
  data: z.record(z.unknown()),
});

serve(async (req) => {
  const origin = req.headers.get("Origin");
  const headers = buildCorsHeaders(origin);

  if (req.method === "OPTIONS") {
    return new Response(null, { headers });
  }

  const allowedOrigins = getAllowedOrigins();
  if (origin && !allowedOrigins.has(origin)) {
    return new Response(
      JSON.stringify({ error: "Origin not allowed" }),
      { status: 403, headers: { ...headers, "Content-Type": "application/json" } }
    );
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseServiceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    
    if (!supabaseUrl || !supabaseServiceRoleKey) {
      throw new Error("Supabase configuration is missing");
    }

    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey);

    // Rate limiting by IP
    const clientIp = getClientIp(req);
    const { data: rateLimitAllowed, error: rateLimitError } = await supabaseAdmin.rpc(
      "check_rate_limit",
      {
        _ip_address: clientIp,
        _endpoint: RATE_LIMIT_ENDPOINT,
        _max_requests: RATE_LIMIT_MAX_REQUESTS,
        _window_minutes: 60
      }
    );

    if (rateLimitError) {
      console.error("Rate limit check failed:", rateLimitError.message);
    } else if (rateLimitAllowed === false) {
      return new Response(
        JSON.stringify({ error: "Rate limited" }),
        { 
          status: 429, 
          headers: { ...headers, "Content-Type": "application/json", "Retry-After": "3600" } 
        }
      );
    }

    let requestBody;
    try {
      requestBody = await req.json();
    } catch {
      return new Response(
        JSON.stringify({ error: "Invalid request format" }),
        { status: 400, headers: { ...headers, "Content-Type": "application/json" } }
      );
    }

    const parseResult = RequestSchema.safeParse(requestBody);
    if (!parseResult.success) {
      return new Response(
        JSON.stringify({ error: "Invalid request data" }),
        { status: 400, headers: { ...headers, "Content-Type": "application/json" } }
      );
    }

    const { action, data } = parseResult.data;
    const userAgent = req.headers.get("user-agent") || null;

    if (action === "page_view") {
      const pvResult = PageViewSchema.safeParse(data);
      if (!pvResult.success) {
        return new Response(
          JSON.stringify({ error: "Invalid page view data" }),
          { status: 400, headers: { ...headers, "Content-Type": "application/json" } }
        );
      }

      const { error } = await supabaseAdmin.from("page_views").insert({
        ...pvResult.data,
        user_agent: userAgent,
      });

      if (error) {
        console.error("Failed to insert page view:", error.message);
        return new Response(
          JSON.stringify({ error: "Failed to track page view" }),
          { status: 500, headers: { ...headers, "Content-Type": "application/json" } }
        );
      }
    } else if (action === "session_start") {
      const sessResult = SessionSchema.safeParse(data);
      if (!sessResult.success) {
        return new Response(
          JSON.stringify({ error: "Invalid session data" }),
          { status: 400, headers: { ...headers, "Content-Type": "application/json" } }
        );
      }

      const { error } = await supabaseAdmin.from("sessions").insert(sessResult.data);

      if (error) {
        console.error("Failed to insert session:", error.message);
        return new Response(
          JSON.stringify({ error: "Failed to create session" }),
          { status: 500, headers: { ...headers, "Content-Type": "application/json" } }
        );
      }
    } else if (action === "session_update") {
      const updateResult = UpdateSessionSchema.safeParse(data);
      if (!updateResult.success) {
        return new Response(
          JSON.stringify({ error: "Invalid session update data" }),
          { status: 400, headers: { ...headers, "Content-Type": "application/json" } }
        );
      }

      const { session_id, ...updateData } = updateResult.data;
      const { error } = await supabaseAdmin
        .from("sessions")
        .update({
          ...updateData,
          last_activity_at: new Date().toISOString(),
        })
        .eq("session_id", session_id);

      if (error) {
        console.error("Failed to update session:", error.message);
        return new Response(
          JSON.stringify({ error: "Failed to update session" }),
          { status: 500, headers: { ...headers, "Content-Type": "application/json" } }
        );
      }
    }

    return new Response(
      JSON.stringify({ success: true }),
      { headers: { ...headers, "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("Analytics tracking error:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { ...headers, "Content-Type": "application/json" } }
    );
  }
});
