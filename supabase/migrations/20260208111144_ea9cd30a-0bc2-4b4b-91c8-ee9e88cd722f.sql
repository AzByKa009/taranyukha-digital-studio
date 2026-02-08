-- Create storage bucket for case thumbnails
INSERT INTO storage.buckets (id, name, public) 
VALUES ('case-thumbnails', 'case-thumbnails', true)
ON CONFLICT (id) DO NOTHING;

-- Allow public read access
CREATE POLICY "Public read access for case thumbnails"
ON storage.objects FOR SELECT
USING (bucket_id = 'case-thumbnails');

-- Allow authenticated users to upload
CREATE POLICY "Authenticated users can upload case thumbnails"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'case-thumbnails' AND auth.role() = 'authenticated');

-- Allow authenticated users to update
CREATE POLICY "Authenticated users can update case thumbnails"
ON storage.objects FOR UPDATE
USING (bucket_id = 'case-thumbnails' AND auth.role() = 'authenticated');

-- Allow authenticated users to delete
CREATE POLICY "Authenticated users can delete case thumbnails"
ON storage.objects FOR DELETE
USING (bucket_id = 'case-thumbnails' AND auth.role() = 'authenticated');
