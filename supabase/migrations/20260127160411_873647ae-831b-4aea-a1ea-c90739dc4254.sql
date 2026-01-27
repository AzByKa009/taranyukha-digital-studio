-- Site settings table for global configuration
CREATE TABLE public.site_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key text UNIQUE NOT NULL,
  value jsonb NOT NULL DEFAULT '{}',
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view site settings"
ON public.site_settings FOR SELECT
USING (true);

CREATE POLICY "Admins can manage site settings"
ON public.site_settings FOR ALL
TO authenticated
USING (has_role(auth.uid(), 'admin'))
WITH CHECK (has_role(auth.uid(), 'admin'));

-- Page content table for editable text blocks
CREATE TABLE public.page_content (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  page_key text NOT NULL,
  section_key text NOT NULL,
  content jsonb NOT NULL DEFAULT '{}',
  is_visible boolean DEFAULT true,
  sort_order integer DEFAULT 0,
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  UNIQUE(page_key, section_key)
);

ALTER TABLE public.page_content ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view visible page content"
ON public.page_content FOR SELECT
USING (is_visible = true);

CREATE POLICY "Admins can manage page content"
ON public.page_content FOR ALL
TO authenticated
USING (has_role(auth.uid(), 'admin'))
WITH CHECK (has_role(auth.uid(), 'admin'));

-- SEO settings per page
CREATE TABLE public.seo_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  page_key text UNIQUE NOT NULL,
  title text,
  description text,
  keywords text,
  og_title text,
  og_description text,
  og_image text,
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.seo_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view SEO settings"
ON public.seo_settings FOR SELECT
USING (true);

CREATE POLICY "Admins can manage SEO settings"
ON public.seo_settings FOR ALL
TO authenticated
USING (has_role(auth.uid(), 'admin'))
WITH CHECK (has_role(auth.uid(), 'admin'));

-- Portfolio videos table
CREATE TABLE public.portfolio_videos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  full_description text,
  video_url text NOT NULL,
  thumbnail_url text,
  stats text,
  review text,
  category text NOT NULL,
  category_label text NOT NULL,
  sort_order integer DEFAULT 0,
  is_published boolean DEFAULT true,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.portfolio_videos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view published videos"
ON public.portfolio_videos FOR SELECT
USING (is_published = true);

CREATE POLICY "Admins can manage videos"
ON public.portfolio_videos FOR ALL
TO authenticated
USING (has_role(auth.uid(), 'admin'))
WITH CHECK (has_role(auth.uid(), 'admin'));

-- Insert default site settings
INSERT INTO public.site_settings (key, value) VALUES
('contact', '{"email": "hello@taranyukha.com", "telegram": "https://t.me/taranyukha", "instagram": "https://instagram.com/taranyukha", "youtube": ""}'),
('hero', '{"title": "AI продюсер", "subtitle": "Aleksey Taranukha", "description": "Создаю AI-продукты, монтирую вертикальные видео, продюсирую контент и разрабатываю премиальные лендинги", "cta_text": "Обсудить проект", "cta_link": "/contacts"}'),
('footer', '{"copyright": "© 2024 Aleksey Taranukha. Все права защищены.", "tagline": "AI продюсер • Вайб кодинг • Монтаж"}');

-- Insert default SEO settings
INSERT INTO public.seo_settings (page_key, title, description, keywords) VALUES
('home', 'Aleksey Taranukha — AI продюсер, вайб кодинг, монтаж Reels', 'AI продюсер и специалист по вайб кодингу. Создание AI продуктов, монтаж вертикальных видео, продюсирование контента.', 'AI продюсер, монтаж, вайб кодинг'),
('services', 'Услуги — Aleksey Taranukha', 'Полный спектр услуг: AI-продукты, монтаж видео, продюсирование, разработка сайтов.', 'услуги, AI, монтаж, разработка'),
('cases', 'Кейсы — Aleksey Taranukha', 'Портфолио работ: AI-проекты, видеопродакшн, веб-разработка.', 'кейсы, портфолио, работы'),
('ai-products', 'AI-продукты — Aleksey Taranukha', 'Готовые AI-решения для бизнеса: чат-боты, автоматизация, аналитика.', 'AI продукты, автоматизация, боты'),
('about', 'Обо мне — Aleksey Taranukha', 'AI продюсер с опытом в создании цифровых продуктов.', 'обо мне, AI продюсер'),
('contacts', 'Контакты — Aleksey Taranukha', 'Свяжитесь со мной для обсуждения проекта.', 'контакты, связь'),
('blog', 'Блог — Aleksey Taranukha', 'Статьи об AI, продюсировании и разработке.', 'блог, статьи, AI');

-- Insert portfolio videos from existing data
INSERT INTO public.portfolio_videos (title, description, full_description, video_url, stats, category, category_label, sort_order) VALUES
('Артём Бриус', 'Монтаж Reels для блогера с аудиторией 1.1 млн подписчиков', 'Создание динамичных Reels для топового блогера. Работа включала разработку визуального стиля, динамичный монтаж с акцентом на удержание внимания, цветокоррекцию и добавление графических элементов.', '/videos/artem-brius.mp4', '1.1M подписчиков • Instagram', 'montage', 'Reels • Instagram', 1),
('Михаил Гребенюк', 'Монтаж Reels для эксперта с аудиторией 700 тысяч', 'Серия экспертных Reels для бизнес-блогера. Фокус на подаче сложного контента в простой и вовлекающей форме.', '/videos/mikhail-grebenyuk.mp4', '700K подписчиков • Instagram', 'montage', 'Reels • Instagram', 2),
('LEADS', 'Монтаж YouTube Shorts для образовательного проекта', 'Образовательный контент в формате Shorts. Задача — сделать обучающие видео максимально понятными и вовлекающими.', '/videos/leads.mp4', '2K+ подписчиков • YouTube', 'montage', 'Shorts • YouTube', 3),
('SIMON', 'Монтаж TikTok для личного бренда', 'Контент для личного бренда в TikTok. Стилистика под платформу — быстрый темп, трендовые эффекты.', '/videos/simon.mp4', '12K в Telegram • TikTok', 'montage', 'TikTok', 4);

-- Triggers for updated_at
CREATE TRIGGER update_site_settings_updated_at
BEFORE UPDATE ON public.site_settings
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_page_content_updated_at
BEFORE UPDATE ON public.page_content
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_seo_settings_updated_at
BEFORE UPDATE ON public.seo_settings
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_portfolio_videos_updated_at
BEFORE UPDATE ON public.portfolio_videos
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();