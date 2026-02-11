
-- Fix case-thumbnails bucket policies: restrict to admin role only
DROP POLICY IF EXISTS "Authenticated users can upload case thumbnails" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update case thumbnails" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete case thumbnails" ON storage.objects;

CREATE POLICY "Admins can upload case thumbnails"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'case-thumbnails' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update case thumbnails"
ON storage.objects FOR UPDATE
USING (bucket_id = 'case-thumbnails' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete case thumbnails"
ON storage.objects FOR DELETE
USING (bucket_id = 'case-thumbnails' AND public.has_role(auth.uid(), 'admin'));
