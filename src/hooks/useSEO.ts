import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const BASE_URL = "https://taranukha.dev";

interface SEOConfig {
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
  ogType?: string;
  noIndex?: boolean;
}

interface JsonLdSchema {
  "@context": string;
  "@type": string;
  [key: string]: unknown;
}

export function useSEO(config: SEOConfig, jsonLdSchemas?: JsonLdSchema[]) {
  const location = useLocation();
  const canonicalUrl = `${BASE_URL}${location.pathname}`;

  useEffect(() => {
    // Set title
    document.title = config.title;

    // Update or create meta description
    let metaDescription = document.querySelector('meta[name="description"]') as HTMLMetaElement;
    if (metaDescription) {
      metaDescription.content = config.description;
    } else {
      metaDescription = document.createElement("meta");
      metaDescription.name = "description";
      metaDescription.content = config.description;
      document.head.appendChild(metaDescription);
    }

    // Update or create meta keywords
    if (config.keywords) {
      let metaKeywords = document.querySelector('meta[name="keywords"]') as HTMLMetaElement;
      if (metaKeywords) {
        metaKeywords.content = config.keywords;
      } else {
        metaKeywords = document.createElement("meta");
        metaKeywords.name = "keywords";
        metaKeywords.content = config.keywords;
        document.head.appendChild(metaKeywords);
      }
    }

    // Update or create robots meta
    let robotsMeta = document.querySelector('meta[name="robots"]') as HTMLMetaElement;
    if (robotsMeta) {
      robotsMeta.content = config.noIndex ? "noindex, nofollow" : "index, follow";
    } else {
      robotsMeta = document.createElement("meta");
      robotsMeta.name = "robots";
      robotsMeta.content = config.noIndex ? "noindex, nofollow" : "index, follow";
      document.head.appendChild(robotsMeta);
    }

    // Update canonical URL
    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (canonicalLink) {
      canonicalLink.href = canonicalUrl;
    } else {
      canonicalLink = document.createElement("link");
      canonicalLink.rel = "canonical";
      canonicalLink.href = canonicalUrl;
      document.head.appendChild(canonicalLink);
    }

    // Update Open Graph tags
    const ogTags: Record<string, string> = {
      "og:title": config.title,
      "og:description": config.description,
      "og:url": canonicalUrl,
      "og:type": config.ogType || "website",
      "og:image": config.ogImage || `${BASE_URL}/og-image.png`,
      "og:site_name": "Aleksey Taranukha",
      "og:locale": "ru_RU",
    };

    Object.entries(ogTags).forEach(([property, content]) => {
      let meta = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement;
      if (meta) {
        meta.content = content;
      } else {
        meta = document.createElement("meta");
        meta.setAttribute("property", property);
        meta.content = content;
        document.head.appendChild(meta);
      }
    });

    // Update Twitter Card tags
    const twitterTags: Record<string, string> = {
      "twitter:card": "summary_large_image",
      "twitter:title": config.title,
      "twitter:description": config.description,
      "twitter:image": config.ogImage || `${BASE_URL}/og-image.png`,
    };

    Object.entries(twitterTags).forEach(([name, content]) => {
      let meta = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement;
      if (meta) {
        meta.content = content;
      } else {
        meta = document.createElement("meta");
        meta.name = name;
        meta.content = content;
        document.head.appendChild(meta);
      }
    });

    // Handle JSON-LD schemas
    const schemaScripts: HTMLScriptElement[] = [];
    
    if (jsonLdSchemas && jsonLdSchemas.length > 0) {
      jsonLdSchemas.forEach((schema, index) => {
        const script = document.createElement("script");
        script.type = "application/ld+json";
        script.setAttribute("data-seo-schema", `schema-${index}`);
        script.textContent = JSON.stringify(schema);
        document.head.appendChild(script);
        schemaScripts.push(script);
      });
    }

    // Cleanup function
    return () => {
      schemaScripts.forEach((script) => {
        if (script.parentNode) {
          script.parentNode.removeChild(script);
        }
      });
    };
  }, [config.title, config.description, config.keywords, config.ogImage, config.ogType, config.noIndex, canonicalUrl, jsonLdSchemas]);
}

// Predefined JSON-LD schemas
export const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Aleksey Taranukha",
  "alternateName": "Алексей Таранюха",
  "url": BASE_URL,
  "jobTitle": "AI продюсер, вайб кодинг специалист",
  "description": "Эксперт в области AI-продуктов, вертикального контента и создания премиальных сайтов под услуги. Монтаж и продюсирование Reels.",
  "knowsAbout": [
    "AI продукты",
    "Вайб кодинг",
    "Монтаж вертикальных видео",
    "Продюсирование контента",
    "Создание AI продукта",
    "Премиальный лендинг",
    "Сайт под ключ"
  ],
  "sameAs": [
    "https://t.me/alekseytaranukha",
    "https://instagram.com/alekseytaranukha"
  ]
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Aleksey Taranukha — AI продюсер и вайб кодинг",
  "alternateName": "Taranukha.dev",
  "url": BASE_URL,
  "description": "AI-продукты, премиальные сайты, монтаж и продюсирование вертикального контента",
  "inLanguage": "ru-RU",
  "potentialAction": {
    "@type": "SearchAction",
    "target": `${BASE_URL}/search?q={search_term_string}`,
    "query-input": "required name=search_term_string"
  }
};

export const professionalServiceSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "Aleksey Taranukha — AI & Digital Production",
  "url": BASE_URL,
  "description": "Создание AI-продуктов, вайб кодинг, монтаж вертикальных видео, продюсирование контента, премиальные лендинги и сайты под ключ",
  "priceRange": "₽₽₽",
  "areaServed": {
    "@type": "Country",
    "name": "Russia"
  },
  "serviceType": [
    "Создание AI продукта",
    "Вайб кодинг",
    "Монтаж вертикальных видео",
    "Продюсирование контента",
    "Премиальный лендинг",
    "Сайт под ключ"
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Услуги",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Монтаж вертикальных видео",
          "description": "Профессиональный монтаж Reels, Shorts, TikTok"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Продюсирование контента",
          "description": "Полный цикл создания контента под ключ"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Создание AI продукта",
          "description": "Разработка AI-решений для бизнеса"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Вайб кодинг",
          "description": "Быстрое создание MVP и веб-приложений"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Премиальный лендинг",
          "description": "Создание продающих сайтов под услуги"
        }
      }
    ]
  }
};
