-- Add admin SELECT policy for rate_limits table
-- This allows admins to view rate limiting data for security monitoring
-- while maintaining public access restrictions

CREATE POLICY "Admins can view rate limits"
ON public.rate_limits
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));