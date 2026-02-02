-- Enable realtime for services, ai_products, ai_product_categories tables
ALTER PUBLICATION supabase_realtime ADD TABLE public.services;
ALTER PUBLICATION supabase_realtime ADD TABLE public.ai_products;
ALTER PUBLICATION supabase_realtime ADD TABLE public.ai_product_categories;