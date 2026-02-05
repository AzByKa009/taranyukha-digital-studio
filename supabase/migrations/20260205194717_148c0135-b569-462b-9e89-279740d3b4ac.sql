-- Create table for custom floating text blocks
CREATE TABLE public.floating_texts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  page_path TEXT NOT NULL DEFAULT '/',
  content TEXT NOT NULL DEFAULT 'Новый текст',
  position_x DECIMAL NOT NULL DEFAULT 50,
  position_y DECIMAL NOT NULL DEFAULT 50,
  font_size INTEGER NOT NULL DEFAULT 16,
  font_weight TEXT NOT NULL DEFAULT 'normal',
  color TEXT NOT NULL DEFAULT '#FFFFFF',
  background_color TEXT DEFAULT NULL,
  z_index INTEGER NOT NULL DEFAULT 10,
  is_visible BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.floating_texts ENABLE ROW LEVEL SECURITY;

-- Anyone can view visible floating texts
CREATE POLICY "Anyone can view visible floating texts"
ON public.floating_texts
FOR SELECT
USING (is_visible = true);

-- Admins can manage floating texts
CREATE POLICY "Admins can manage floating texts"
ON public.floating_texts
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Enable realtime
ALTER PUBLICATION supabase_realtime ADD TABLE public.floating_texts;

-- Create trigger for updated_at
CREATE TRIGGER update_floating_texts_updated_at
BEFORE UPDATE ON public.floating_texts
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();