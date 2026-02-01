import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface LeadPayload {
  name: string;
  contact: string;
  message?: string;
  source_page?: string;
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

Deno.serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    const payload: LeadPayload = await req.json();

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

    // Sanitize inputs
    const name = payload.name.trim().slice(0, 100);
    const contact = payload.contact.trim().slice(0, 200);
    const message = payload.message?.trim().slice(0, 2000) || null;
    const source_page = payload.source_page?.trim().slice(0, 200) || null;

    // Create Supabase client with service role for insert
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

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
