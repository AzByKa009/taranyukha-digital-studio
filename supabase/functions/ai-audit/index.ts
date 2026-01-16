import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Input validation schema
const AuditRequestSchema = z.object({
  businessType: z.string()
    .min(5, "Тип бизнеса должен содержать минимум 5 символов")
    .max(500, "Тип бизнеса не должен превышать 500 символов")
    .transform(val => val.trim()),
  currentProcesses: z.string()
    .min(10, "Описание процессов должно содержать минимум 10 символов")
    .max(1500, "Описание процессов не должно превышать 1500 символов")
    .transform(val => val.trim()),
  painPoints: z.string()
    .min(10, "Описание проблем должно содержать минимум 10 символов")
    .max(1500, "Описание проблем не должно превышать 1500 символов")
    .transform(val => val.trim()),
  budget: z.enum([
    "До 50 000 ₽",
    "50 000 - 150 000 ₽", 
    "150 000 - 500 000 ₽",
    "500 000+ ₽",
    "Пока не определён"
  ]),
  goals: z.string()
    .min(5, "Цели должны содержать минимум 5 символов")
    .max(1000, "Цели не должны превышать 1000 символов")
    .transform(val => val.trim()),
});

// Sanitize input to prevent prompt injection
function sanitizeInput(input: string): string {
  // Remove potential prompt injection patterns
  return input
    .replace(/```/g, '')
    .replace(/\*\*\*/g, '')
    .replace(/#{3,}/g, '')
    .replace(/\[system\]/gi, '')
    .replace(/\[assistant\]/gi, '')
    .replace(/\[user\]/gi, '')
    .replace(/ignore previous instructions/gi, '')
    .replace(/forget everything/gi, '')
    .trim();
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // 1. Authentication check
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      console.error("Missing authorization header");
      return new Response(
        JSON.stringify({ error: "Требуется авторизация" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY");
    
    if (!supabaseUrl || !supabaseAnonKey) {
      throw new Error("Supabase configuration is missing");
    }

    const supabaseClient = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: authHeader } }
    });

    const { data: { user }, error: authError } = await supabaseClient.auth.getUser();
    
    if (authError || !user) {
      console.error("Authentication failed:", authError?.message);
      return new Response(
        JSON.stringify({ error: "Недействительный токен авторизации" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log("Authenticated user:", user.id);

    // 2. Parse and validate input
    let requestBody;
    try {
      requestBody = await req.json();
    } catch {
      return new Response(
        JSON.stringify({ error: "Некорректный формат запроса" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const parseResult = AuditRequestSchema.safeParse(requestBody);
    
    if (!parseResult.success) {
      console.error("Validation failed:", parseResult.error.issues);
      return new Response(
        JSON.stringify({ 
          error: "Некорректные данные формы",
          details: parseResult.error.issues.map(issue => issue.message)
        }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const { businessType, currentProcesses, painPoints, budget, goals } = parseResult.data;

    // 3. Sanitize inputs
    const sanitizedBusinessType = sanitizeInput(businessType);
    const sanitizedCurrentProcesses = sanitizeInput(currentProcesses);
    const sanitizedPainPoints = sanitizeInput(painPoints);
    const sanitizedGoals = sanitizeInput(goals);

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const systemPrompt = `Ты — эксперт по AI-автоматизации бизнеса. Твоя задача — создать персонализированный план автоматизации на основе информации о бизнесе клиента.

Формат ответа — структурированный план на русском языке:

## 🎯 Резюме
Краткое описание текущей ситуации и потенциала автоматизации (2-3 предложения).

## 🚀 Приоритетные направления
Список из 3-5 направлений автоматизации, отсортированных по приоритету. Для каждого:
- Название направления
- Почему это важно для данного бизнеса
- Ожидаемый эффект (экономия времени / денег / рост эффективности)

## 🛠️ Рекомендуемые инструменты
Конкретные AI-решения и инструменты (чат-боты, Make/Zapier, генераторы контента и т.д.) с объяснением, как их применить.

## 📋 План внедрения
Пошаговый план на 3 месяца:
- Месяц 1: Быстрые победы
- Месяц 2: Основные внедрения  
- Месяц 3: Масштабирование

## 💡 Важные рекомендации
2-3 ключевые рекомендации для успешного внедрения.

Будь конкретным и практичным. Избегай общих фраз. Давай actionable советы.`;

    const userPrompt = `Проанализируй бизнес и создай план автоматизации:

Тип бизнеса: ${sanitizedBusinessType}

Текущие процессы: ${sanitizedCurrentProcesses}

Боли и проблемы: ${sanitizedPainPoints}

Бюджет на автоматизацию: ${budget}

Цели: ${sanitizedGoals}

Создай персонализированный план автоматизации.`;

    console.log("Generating AI audit plan for user:", user.id, "business:", sanitizedBusinessType.substring(0, 50));

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        max_tokens: 2000,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI Gateway error:", response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Слишком много запросов. Попробуйте позже." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Сервис временно недоступен. Попробуйте позже." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      
      throw new Error(`AI Gateway error: ${response.status}`);
    }

    const data = await response.json();
    const plan = data.choices?.[0]?.message?.content;

    if (!plan) {
      throw new Error("No content in AI response");
    }

    console.log("Successfully generated audit plan for user:", user.id);

    return new Response(
      JSON.stringify({ plan }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    // Log detailed error server-side only for debugging
    console.error("Error in ai-audit function:", error);
    
    // Return generic message to client - never expose internal error details
    return new Response(
      JSON.stringify({ error: "Произошла ошибка. Попробуйте позже." }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
