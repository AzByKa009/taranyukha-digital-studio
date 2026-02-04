import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// Get allowed origins from environment, with fallback for development
const getAllowedOrigins = (): string[] => {
  const envOrigins = Deno.env.get("ALLOWED_ORIGINS");
  if (envOrigins) {
    return envOrigins.split(",").map((o) => o.trim());
  }
  // Default to production domain + localhost for development
  return [
    "https://taranyukha-digital-studio.lovable.app",
    "https://id-preview--cfb231d2-f3ba-4099-910d-c2951be206d2.lovable.app",
    "http://localhost:5173",
    "http://localhost:8080",
  ];
};

const getCorsHeaders = (origin: string | null) => {
  const allowedOrigins = getAllowedOrigins();
  const isAllowed = origin && allowedOrigins.some((allowed) => 
    origin === allowed || origin.endsWith(".lovable.app")
  );
  
  return {
    "Access-Control-Allow-Origin": isAllowed ? origin : allowedOrigins[0],
    "Access-Control-Allow-Headers":
      "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
  };
};

interface LeadPayload {
  name: string;
  contact: string;
  message?: string;
  source_page?: string;
  // Honeypot field - should always be empty
  website?: string;
}

async function sendTelegramMessage(text: string): Promise<boolean> {
  const botToken = Deno.env.get("TELEGRAM_BOT_TOKEN");
  const chatId = Deno.env.get("TELEGRAM_CHAT_ID");

  if (!botToken || !chatId) {
    console.error("Telegram credentials not configured");
    return false;
  }

  try {
    const response = await fetch(
      `https://api.telegram.org/bot${botToken}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text,
          parse_mode: "HTML",
        }),
      }
    );

    if (!response.ok) {
      const error = await response.text();
      console.error("Telegram API error:", error);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Failed to send Telegram message:", error);
    return false;
  }
}

// Get client IP with proxy support
function getClientIP(req: Request): string {
  const forwardedFor = req.headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0].trim();
  }
  const realIP = req.headers.get("x-real-ip");
  if (realIP) {
    return realIP;
  }
  return "unknown";
}

Deno.serve(async (req) => {
  const origin = req.headers.get("origin");
  const corsHeaders = getCorsHeaders(origin);
  
  // Validate origin
  const allowedOrigins = getAllowedOrigins();
  const isOriginAllowed = origin && (
    allowedOrigins.includes(origin) || 
    origin.endsWith(".lovable.app")
  );
  
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  // Reject requests from disallowed origins
  if (!isOriginAllowed) {
    return new Response(JSON.stringify({ error: "Forbidden" }), {
      status: 403,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    const payload: LeadPayload = await req.json();

    // Honeypot check - if website field is filled, it's a bot
    if (payload.website && payload.website.trim() !== "") {
      // Silently accept but don't process (confuse the bot)
      console.log("Honeypot triggered, rejecting submission");
      return new Response(
        JSON.stringify({ success: true, id: "blocked" }),
        {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Validate required fields
    if (!payload.name?.trim() || !payload.contact?.trim()) {
      return new Response(
        JSON.stringify({ error: "Name and contact are required" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Create Supabase client with service role for insert
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    // Check rate limit (5 submissions per hour per IP)
    const clientIP = getClientIP(req);
    const { data: isAllowed } = await supabaseAdmin.rpc("check_rate_limit", {
      _ip_address: clientIP,
      _endpoint: "submit-lead",
      _max_requests: 5,
      _window_minutes: 60,
    });

    if (!isAllowed) {
      return new Response(
        JSON.stringify({ error: "Too many requests. Please try again later." }),
        {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Sanitize inputs
    const name = payload.name.trim().slice(0, 100);
    const contact = payload.contact.trim().slice(0, 200);
    const message = payload.message?.trim().slice(0, 2000) || null;
    const source_page = payload.source_page?.trim().slice(0, 200) || null;

    // Insert lead into database
    const { data: lead, error: dbError } = await supabaseAdmin
      .from("leads")
      .insert({
        name,
        contact,
        message,
        source_page,
      })
      .select()
      .single();

    if (dbError) {
      console.error("Database error:", dbError);
      return new Response(
        JSON.stringify({ error: "Failed to save lead" }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Send Telegram notification
    const telegramMessage = `🔔 <b>Новая заявка!</b>

👤 <b>Имя:</b> ${name}
📱 <b>Контакт:</b> ${contact}
${message ? `💬 <b>Сообщение:</b> ${message}` : ""}
${source_page ? `📍 <b>Страница:</b> ${source_page}` : ""}

🕐 ${new Date().toLocaleString("ru-RU", { timeZone: "Europe/Moscow" })}`;

    await sendTelegramMessage(telegramMessage);

    return new Response(
      JSON.stringify({ success: true, id: lead.id }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error processing lead:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
