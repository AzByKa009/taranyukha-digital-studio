import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

function extractImageDataUrl(gatewayPayload: any): string | null {
  const msg = gatewayPayload?.choices?.[0]?.message;
  if (!msg) return null;

  // Primary: Lovable AI image schema
  const img0 = msg?.images?.[0];
  const direct = img0?.image_url?.url;
  if (typeof direct === "string" && direct.startsWith("data:image/")) return direct;

  // Variant: image_url might be directly a string
  const direct2 = img0?.image_url;
  if (typeof direct2 === "string" && direct2.startsWith("data:image/")) return direct2;

  // Variant: some gateways return message.content as a string data URL
  if (typeof msg?.content === "string" && msg.content.startsWith("data:image/")) return msg.content;

  // Variant: OpenAI-style multimodal content array
  if (Array.isArray(msg?.content)) {
    for (const part of msg.content) {
      const url = part?.image_url?.url ?? part?.image_url;
      if (typeof url === "string" && url.startsWith("data:image/")) return url;
    }
  }

  return null;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    // === AUTHENTICATION CHECK ===
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: "Authentication required" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    // Verify user authentication
    const supabaseAuth = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: authHeader } }
    });

    const { data: { user }, error: authError } = await supabaseAuth.auth.getUser();
    if (authError || !user) {
      return new Response(
        JSON.stringify({ error: "Invalid authentication" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Check admin role using service role client
    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);
    const { data: isAdmin, error: roleError } = await supabaseAdmin.rpc('has_role', {
      _user_id: user.id,
      _role: 'admin'
    });

    if (roleError || !isAdmin) {
      return new Response(
        JSON.stringify({ error: "Admin access required" }),
        { status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    // === END AUTHENTICATION CHECK ===

    const { prompt, folder = "generated", referenceImage } = await req.json();

    if (!prompt) {
      return new Response(
        JSON.stringify({ error: "Prompt is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    // Build message content - text only or multimodal with reference image
    let userContent: any;
    if (referenceImage) {
      userContent = [
        {
          type: "image_url",
          image_url: { url: referenceImage }
        },
        {
          type: "text",
          text: `Edit this image according to these instructions: ${prompt}. Output ONLY the resulting image, no text.`
        }
      ];
    } else {
      userContent = `Generate a professional, high-quality image for a business website. The image should be: ${prompt}. Make it look premium, modern, and suitable for a professional services portfolio. Aspect ratio should be 16:9 or 4:3 for thumbnail use.`;
    }

    // Generate image using Lovable AI Gateway with Gemini image model
    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash-image",
        messages: [
          {
            role: "user",
            content: userContent
          }
        ],
        modalities: ["image", "text"]
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again later." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Payment required. Please add credits to your account." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const errorText = await response.text();
      console.error("AI Gateway error:", response.status, errorText);
      throw new Error("Failed to generate image");
    }

    const data = await response.json();
    const imageData = extractImageDataUrl(data);

    if (!imageData) {
      // Provide useful diagnostics without leaking secrets.
      const preview = {
        model: data?.model,
        hasChoices: Array.isArray(data?.choices),
        messageKeys: Object.keys(data?.choices?.[0]?.message ?? {}),
        contentType: typeof data?.choices?.[0]?.message?.content,
        contentPreview:
          typeof data?.choices?.[0]?.message?.content === "string"
            ? data.choices[0].message.content.slice(0, 300)
            : Array.isArray(data?.choices?.[0]?.message?.content)
              ? data.choices[0].message.content.map((p: any) => Object.keys(p ?? {})).slice(0, 3)
              : null,
      };
      console.error("AI Gateway returned no image. Payload preview:", preview);
      return new Response(
        JSON.stringify({
          error:
            "AI Gateway вернул ответ без изображения. Попробуйте уточнить промпт (например: 'сгенерируй именно картинку') или повторить запрос.",
          debug: preview,
        }),
        { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Extract base64 data (remove data:image/... prefix)
    const base64Match = imageData.match(/^data:image\/(\w+);base64,(.+)$/);
    if (!base64Match) {
      throw new Error("Invalid image data format");
    }

    const [, imageFormat, base64Data] = base64Match;
    const binaryData = Uint8Array.from(atob(base64Data), c => c.charCodeAt(0));

    // Upload to Supabase Storage using admin client
    const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).substring(7)}.${imageFormat}`;

    const { error: uploadError } = await supabaseAdmin.storage
      .from("uploads")
      .upload(fileName, binaryData, {
        contentType: `image/${imageFormat}`,
        upsert: false
      });

    if (uploadError) {
      console.error("Upload error:", uploadError);
      throw new Error("Failed to upload generated image");
    }

    const { data: { publicUrl } } = supabaseAdmin.storage
      .from("uploads")
      .getPublicUrl(fileName);

    return new Response(
      JSON.stringify({ 
        success: true, 
        imageUrl: publicUrl,
        message: data.choices?.[0]?.message?.content || "Image generated successfully"
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Generate image error:", error);
    return new Response(
      JSON.stringify({ error: "An error occurred while generating the image" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});