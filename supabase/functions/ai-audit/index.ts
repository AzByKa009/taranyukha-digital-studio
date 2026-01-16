import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { businessType, currentProcesses, painPoints, budget, goals } = await req.json();

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

**Тип бизнеса:** ${businessType}

**Текущие процессы:** ${currentProcesses}

**Боли и проблемы:** ${painPoints}

**Бюджет на автоматизацию:** ${budget}

**Цели:** ${goals}

Создай персонализированный план автоматизации.`;

    console.log("Generating AI audit plan for:", businessType);

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

    console.log("Successfully generated audit plan");

    return new Response(
      JSON.stringify({ plan }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("Error in ai-audit function:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
