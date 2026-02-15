export interface ServiceConfig {
  slug: string;
  url: string;
  problem: string;
  result: string;
  relatedSlugs: string[];
}

export const SERVICE_CONFIGS: Record<string, ServiceConfig> = {
  'upakovka-biznesa': {
    slug: 'upakovka-biznesa',
    url: '/upakovka-biznesa',
    problem: 'Клиенты не понимают, чем вы лучше конкурентов. Без чёткого позиционирования реклама, сайт и соцсети работают вхолостую.',
    result: 'Клиент понимает вашу ценность за 5 секунд. Конверсия растёт на каждом этапе воронки — от первого касания до закрытия сделки.',
    relatedSlugs: ['razrabotka-sayta', 'vedenie-socsety'],
  },
  'razrabotka-sayta': {
    slug: 'razrabotka-sayta',
    url: '/razrabotka-sayta',
    problem: 'Сайт есть, но заявок с него нет. Посетители приходят — и уходят. Нет продающей структуры, нет конверсионных элементов.',
    result: 'Сайт работает как менеджер по продажам 24/7. Каждая страница ведёт посетителя к целевому действию — заявке или звонку.',
    relatedSlugs: ['upakovka-biznesa', 'prodvizhenie'],
  },
  'vedenie-socsety': {
    slug: 'vedenie-socsety',
    url: '/vedenie-socsety',
    problem: 'Ведёте соцсети, но они не приносят клиентов. Посты ради постов — без стратегии, без аналитики, без результата.',
    result: 'Соцсети системно формируют доверие к бренду и генерируют поток заявок. Каждая публикация работает на бизнес-цель.',
    relatedSlugs: ['upakovka-biznesa', 'prodvizhenie'],
  },
  'prodvizhenie': {
    slug: 'prodvizhenie',
    url: '/prodvizhenie',
    problem: 'Нет стабильного потока новых клиентов. Органика — слишком долго, реклама — сливает бюджет без понятного результата.',
    result: 'Предсказуемый поток заявок каждый месяц. Стоимость привлечения клиента снижается, а окупаемость растёт.',
    relatedSlugs: ['razrabotka-sayta', 'avtomatizaciya'],
  },
  'avtomatizaciya': {
    slug: 'avtomatizaciya',
    url: '/avtomatizaciya',
    problem: 'Команда тонет в рутине. Заявки теряются, ответы задерживаются, масштабирование невозможно без увеличения штата.',
    result: 'Рутина на автопилоте. Заявки обрабатываются мгновенно 24/7, команда занята стратегическими задачами.',
    relatedSlugs: ['razrabotka-sayta', 'prodvizhenie'],
  },
};

// Legacy slug mapping for backward compatibility
const LEGACY_SLUG_MAP: Record<string, string> = {
  'upakovka': 'upakovka-biznesa',
  'sajty': 'razrabotka-sayta',
  'soccseti': 'vedenie-socsety',
};

export const resolveSlug = (slug: string): string => {
  return LEGACY_SLUG_MAP[slug] || slug;
};

export const getServiceUrl = (slug: string): string => {
  const resolved = resolveSlug(slug);
  return SERVICE_CONFIGS[resolved]?.url || `/${resolved}`;
};

export const getServiceConfig = (slug: string): ServiceConfig | undefined => {
  const resolved = resolveSlug(slug);
  return SERVICE_CONFIGS[resolved];
};

export const ALL_SERVICE_SLUGS = Object.keys(SERVICE_CONFIGS);
