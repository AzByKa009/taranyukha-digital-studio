import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { prompt, duration = 5, aspectRatio = "16:9" } = await req.json();

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

    console.log("Starting video generation with prompt:", prompt);

    // Use Lovable's video generation API
    const response = await fetch("https://video.lovable.dev/v1/videos", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: prompt,
        duration: duration,
        aspect_ratio: aspectRatio,
        resolution: "1080p"
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Video API error:", response.status, errorText);
      
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
      
      throw new Error(`Video generation failed: ${errorText}`);
    }

    const data = await response.json();
    console.log("Video generation response:", data);

    // If we get a video URL directly
    if (data.video_url || data.url) {
      const videoUrl = data.video_url || data.url;
      
      // Download and upload to Supabase storage
      const videoResponse = await fetch(videoUrl);
      if (!videoResponse.ok) {
        throw new Error("Failed to download generated video");
      }
      
      const videoBlob = await videoResponse.arrayBuffer();
      const videoData = new Uint8Array(videoBlob);

      const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
      const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
      const supabase = createClient(supabaseUrl, supabaseServiceKey);

      const fileName = `generated/${Date.now()}-${Math.random().toString(36).substring(7)}.mp4`;

      const { error: uploadError } = await supabase.storage
        .from("uploads")
        .upload(fileName, videoData, {
          contentType: "video/mp4",
          upsert: false
        });

      if (uploadError) {
        console.error("Upload error:", uploadError);
        throw new Error("Failed to upload generated video");
      }

      const { data: { publicUrl } } = supabase.storage
        .from("uploads")
        .getPublicUrl(fileName);

      return new Response(
        JSON.stringify({ 
          success: true, 
          videoUrl: publicUrl,
          message: "Video generated successfully"
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // If we get a job ID for async processing
    if (data.id || data.job_id) {
      return new Response(
        JSON.stringify({ 
          success: true, 
          jobId: data.id || data.job_id,
          status: "processing",
          message: "Video generation started. Check back for status."
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    throw new Error("Unexpected response from video API");

  } catch (error) {
    console.error("Generate video error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
