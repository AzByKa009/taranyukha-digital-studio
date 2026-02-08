
ALTER TABLE public.cases ADD COLUMN IF NOT EXISTS social_links jsonb DEFAULT '[]'::jsonb;
ALTER TABLE public.cases ADD COLUMN IF NOT EXISTS person_description text;
