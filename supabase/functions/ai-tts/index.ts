import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";

// Rate limiting configuration
const RATE_LIMIT_MAX_REQUESTS = 10;
const RATE_LIMIT_ENDPOINT = "ai-tts";

// Extract client IP from request headers
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

// Build allowed origins from environment variable
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

function buildCorsHeaders(origin: string | null) {
  const allowedOrigins = getAllowedOrigins();
  const allowed = !!origin && allowedOrigins.has(origin);
  return {
    "Access-Control-Allow-Origin": allowed && origin ? origin : "null",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Vary": "Origin",
  };
}

// Input validation schema
const TTSRequestSchema = z.object({
  text: z.string()
    .min(1, "Text is required")
    .max(5000, "Text too long (max 5000 characters)"),
  voice: z.string().max(50).optional()
});

serve(async (req) => {
  const origin = req.headers.get("Origin");
  const corsHeaders = buildCorsHeaders(origin);

  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  // Verify origin
  const allowedOrigins = getAllowedOrigins();
  if (origin && !allowedOrigins.has(origin)) {
    return new Response(
      JSON.stringify({ error: "Origin not allowed" }),
      { status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }

  try {
    // Require authentication
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: "Требуется авторизация" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY");
    const supabaseServiceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    
    if (!supabaseUrl || !supabaseAnonKey || !supabaseServiceRoleKey) {
      throw new Error("Supabase configuration is missing");
    }

    const supabaseClient = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: authHeader } }
    });

    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey);

    const { data: { user }, error: authError } = await supabaseClient.auth.getUser();
    
    if (authError || !user) {
      return new Response(
        JSON.stringify({ error: "Недействительный токен авторизации" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Rate limiting
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
        JSON.stringify({ error: "Превышен лимит запросов. Попробуйте через час." }),
        { 
          status: 429, 
          headers: { 
            ...corsHeaders, 
            "Content-Type": "application/json",
            "Retry-After": "3600"
          } 
        }
      );
    }

    // Parse and validate request body
    let requestBody;
    try {
      requestBody = await req.json();
    } catch {
      return new Response(
        JSON.stringify({ error: "Некорректный формат запроса" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const parseResult = TTSRequestSchema.safeParse(requestBody);
    if (!parseResult.success) {
      return new Response(
        JSON.stringify({ error: "Некорректные данные" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const { text, voice } = parseResult.data;

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");

    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    // Use Gemini for TTS via chat completion with audio output request
    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          {
            role: "system",
            content: `You are a text-to-speech converter. Convert the following text to natural speech. Voice style: ${voice || "neutral"}. Read the text naturally and expressively.`
          },
          {
            role: "user",
            content: `Please read this text aloud: "${text}"`
          }
        ],
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Превышен лимит запросов" }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Сервис временно недоступен" }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      console.error("TTS error:", response.status);
      return new Response(JSON.stringify({ error: "Ошибка генерации речи" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await response.json();
    const speechText = data.choices?.[0]?.message?.content || text;

    // Return the processed text (actual audio would need ElevenLabs or similar)
    return new Response(JSON.stringify({ 
      success: true,
      text: speechText,
      message: "TTS через Lovable AI подготовлен. Для полноценной озвучки рекомендуется ElevenLabs."
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("TTS error:", e);
    return new Response(JSON.stringify({ error: "Произошла ошибка" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
