-- Drop the permissive INSERT/UPDATE policies on analytics tables
-- Analytics is now handled via the track-analytics edge function with service_role

-- Drop existing permissive policies on page_views
DROP POLICY IF EXISTS "Anyone can insert page views" ON public.page_views;

-- Drop existing permissive policies on sessions
DROP POLICY IF EXISTS "Anyone can insert sessions" ON public.sessions;
DROP POLICY IF EXISTS "Anyone can update sessions" ON public.sessions;

-- Create restrictive policies that only allow service_role to write
-- (service_role already bypasses RLS, but we add explicit policies for documentation)

-- page_views: Block all public INSERT/UPDATE/DELETE
CREATE POLICY "Block public insert on page_views"
ON public.page_views FOR INSERT
TO anon, authenticated
WITH CHECK (false);

CREATE POLICY "Block public update on page_views"
ON public.page_views FOR UPDATE
TO anon, authenticated
USING (false);

CREATE POLICY "Block public delete on page_views"
ON public.page_views FOR DELETE
TO anon, authenticated
USING (false);

-- sessions: Block all public INSERT/UPDATE/DELETE
CREATE POLICY "Block public insert on sessions"
ON public.sessions FOR INSERT
TO anon, authenticated
WITH CHECK (false);

CREATE POLICY "Block public update on sessions"
ON public.sessions FOR UPDATE
TO anon, authenticated
USING (false);

CREATE POLICY "Block public delete on sessions"
ON public.sessions FOR DELETE
TO anon, authenticated
USING (false);