import { Bot, Workflow, Sparkles, Rocket, LineChart } from "lucide-react";
import { LucideIcon } from "lucide-react";

// Category images
import aiChatbot from "@/assets/ai-chatbot.jpg";
import aiAutomation from "@/assets/ai-automation.jpg";
import aiContent from "@/assets/ai-content.jpg";
import aiMinisaas from "@/assets/ai-minisaas.jpg";
import aiAnalytics from "@/assets/ai-analytics.jpg";

export interface AIProductCategory {
  id: string;
  slug: string;
  title: string;
  icon: LucideIcon;
  image: string;
  description: string;
  useCases: string[];
}

export interface AIProduct {
  id: string;
  title: string;
  categoryId: string;
  description: string;
  features: string[];
  status: "available" | "beta" | "coming";
}

export const aiCategories: AIProductCategory[] = [
  {
    id: "chatbots",
    slug: "chatbots",
    title: "Чат-боты и ассистенты",
    icon: Bot,
    image: aiChatbot,
    description: "Интеллектуальные ассистенты для автоматизации коммуникаций с клиентами, поддержки и продаж",
    useCases: [
      "Автоматизация клиентской поддержки 24/7",
      "Квалификация лидов и первичная консультация",
      "Внутренние корпоративные ассистенты",
      "Бот для записи и бронирования",
      "FAQ-боты для сайтов и мессенджеров"
    ]
  },
  {
    id: "automation",
    slug: "automation",
    title: "Автоматизация процессов",
    icon: Workflow,
    image: aiAutomation,
    description: "Интеграции с Make, Zapier, n8n для автоматизации рутинных задач и связывания разных систем",
    useCases: [
      "Автоматическая обработка заявок из форм",
      "Синхронизация данных между CRM и таблицами",
      "Автопостинг в социальные сети",
      "Автоматические отчёты и уведомления",
      "Интеграция платёжных систем с учётом"
    ]
  },
  {
    id: "content",
    slug: "content-generation",
    title: "Генерация контента",
    icon: Sparkles,
    image: aiContent,
    description: "AI-системы для создания текстов, изображений и видео для маркетинга и продаж",
    useCases: [
      "Генерация статей и блог-постов",
      "Создание описаний товаров для e-commerce",
      "Генерация рекламных креативов",
      "Автоматизация email-маркетинга",
      "Создание контент-планов"
    ]
  },
  {
    id: "minisaas",
    slug: "mini-saas",
    title: "Mini-SaaS решения",
    icon: Rocket,
    image: aiMinisaas,
    description: "Быстрые MVP и внутренние инструменты, решающие конкретные бизнес-задачи",
    useCases: [
      "Внутренние CRM и трекеры задач",
      "Калькуляторы и конфигураторы",
      "Личные кабинеты для клиентов",
      "Системы бронирования и записи",
      "Дашборды для аналитики"
    ]
  },
  {
    id: "analytics",
    slug: "analytics",
    title: "Аналитика и отчёты",
    icon: LineChart,
    image: aiAnalytics,
    description: "AI-powered аналитика данных с автоматическими insights и визуализациями",
    useCases: [
      "Автоматические бизнес-отчёты",
      "Анализ клиентских отзывов и NPS",
      "Мониторинг конкурентов",
      "Предиктивная аналитика продаж",
      "Дашборды с AI-рекомендациями"
    ]
  }
];

export const aiProducts: AIProduct[] = [
  // Chatbots
  {
    id: "support-bot",
    title: "AI Поддержка",
    categoryId: "chatbots",
    description: "Бот для автоматизации первой линии поддержки с интеграцией в CRM",
    features: ["GPT-4 / Claude", "Интеграция с HelpDesk", "Мультиканальность", "Эскалация операторам"],
    status: "available"
  },
  {
    id: "sales-bot",
    title: "AI Продажник",
    categoryId: "chatbots",
    description: "Бот для квалификации лидов и первичной консультации по продуктам",
    features: ["Квалификация лидов", "Интеграция с CRM", "Скрипты продаж", "Аналитика конверсий"],
    status: "available"
  },
  {
    id: "booking-bot",
    title: "AI Запись",
    categoryId: "chatbots",
    description: "Бот для автоматической записи клиентов через мессенджеры",
    features: ["Синхронизация с календарём", "Напоминания", "Перенос записей", "Telegram / WhatsApp"],
    status: "available"
  },
  
  // Automation
  {
    id: "lead-automation",
    title: "Авто-обработка лидов",
    categoryId: "automation",
    description: "Автоматический сбор лидов из форм, обогащение данных и передача в CRM",
    features: ["Make / Zapier / n8n", "Обогащение данных", "Дедупликация", "Скоринг лидов"],
    status: "available"
  },
  {
    id: "report-automation",
    title: "Авто-отчёты",
    categoryId: "automation",
    description: "Автоматическое формирование отчётов из разных источников данных",
    features: ["Google Sheets", "Email-рассылка", "Telegram-уведомления", "Настраиваемый формат"],
    status: "available"
  },
  
  // Content
  {
    id: "content-generator",
    title: "AI Копирайтер",
    categoryId: "content",
    description: "Генерация текстов для сайта, соцсетей и рекламы в вашем tone of voice",
    features: ["Тон бренда", "SEO-оптимизация", "A/B варианты", "Мультиязычность"],
    status: "available"
  },
  {
    id: "image-generator",
    title: "AI Дизайнер",
    categoryId: "content",
    description: "Генерация изображений и креативов для маркетинга",
    features: ["Midjourney / DALL-E", "Брендовые шаблоны", "Адаптация размеров", "Пакетная генерация"],
    status: "beta"
  },
  
  // Mini-SaaS
  {
    id: "client-portal",
    title: "Клиентский портал",
    categoryId: "minisaas",
    description: "Личный кабинет для клиентов с доступом к документам и истории",
    features: ["Авторизация", "Документы", "История заказов", "Чат с поддержкой"],
    status: "available"
  },
  {
    id: "calculator",
    title: "AI Калькулятор",
    categoryId: "minisaas",
    description: "Интерактивный калькулятор стоимости с AI-рекомендациями",
    features: ["Динамический расчёт", "AI-рекомендации", "Интеграция с CRM", "Виджет для сайта"],
    status: "available"
  },
  
  // Analytics
  {
    id: "review-analyzer",
    title: "Анализ отзывов",
    categoryId: "analytics",
    description: "AI-анализ отзывов клиентов с выявлением трендов и проблем",
    features: ["Sentiment analysis", "Категоризация", "Тренды", "Алерты"],
    status: "available"
  },
  {
    id: "competitor-monitor",
    title: "Мониторинг конкурентов",
    categoryId: "analytics",
    description: "Отслеживание активности конкурентов и автоматические отчёты",
    features: ["Мониторинг цен", "Соцсети", "Новости", "Еженедельные отчёты"],
    status: "beta"
  }
];

export function getProductsByCategory(categoryId: string): AIProduct[] {
  return aiProducts.filter(p => p.categoryId === categoryId);
}

export function getCategoryBySlug(slug: string): AIProductCategory | undefined {
  return aiCategories.find(c => c.slug === slug);
}
