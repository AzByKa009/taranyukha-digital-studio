-- Add explicit deny policies for anon and authenticated roles on rate_limits table
-- This prevents any public access to rate limiting data (IP addresses, endpoints, etc.)

-- Deny SELECT for anon and authenticated users
CREATE POLICY "Block public read access to rate limits"
ON public.rate_limits
FOR SELECT
TO anon, authenticated
USING (false);

-- Deny INSERT for anon and authenticated users  
CREATE POLICY "Block public insert access to rate limits"
ON public.rate_limits
FOR INSERT
TO anon, authenticated
WITH CHECK (false);

-- Deny UPDATE for anon and authenticated users
CREATE POLICY "Block public update access to rate limits"
ON public.rate_limits
FOR UPDATE
TO anon, authenticated
USING (false)
WITH CHECK (false);

-- Deny DELETE for anon and authenticated users
CREATE POLICY "Block public delete access to rate limits"
ON public.rate_limits
FOR DELETE
TO anon, authenticated
USING (false);