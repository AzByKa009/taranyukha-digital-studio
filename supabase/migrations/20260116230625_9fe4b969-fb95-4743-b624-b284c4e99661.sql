-- Create table for tracking rate limits by IP
CREATE TABLE public.rate_limits (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  ip_address TEXT NOT NULL,
  endpoint TEXT NOT NULL,
  request_count INTEGER NOT NULL DEFAULT 1,
  window_start TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  
  -- Unique constraint per IP + endpoint + time window
  UNIQUE (ip_address, endpoint, window_start)
);

-- Create index for fast lookups
CREATE INDEX idx_rate_limits_lookup ON public.rate_limits (ip_address, endpoint, window_start);

-- Create index for cleanup of old records
CREATE INDEX idx_rate_limits_cleanup ON public.rate_limits (window_start);

-- Enable RLS
ALTER TABLE public.rate_limits ENABLE ROW LEVEL SECURITY;

-- No public access policies - only edge functions with service role can access
-- This is intentional: rate limiting should only be managed server-side

-- Create function to check and increment rate limit
-- Returns TRUE if request is allowed, FALSE if rate limited
CREATE OR REPLACE FUNCTION public.check_rate_limit(
  _ip_address TEXT,
  _endpoint TEXT,
  _max_requests INTEGER DEFAULT 5,
  _window_minutes INTEGER DEFAULT 60
)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _window_start TIMESTAMP WITH TIME ZONE;
  _current_count INTEGER;
BEGIN
  -- Calculate the start of the current time window
  _window_start := date_trunc('hour', now());
  
  -- Try to insert or update the rate limit record
  INSERT INTO public.rate_limits (ip_address, endpoint, request_count, window_start)
  VALUES (_ip_address, _endpoint, 1, _window_start)
  ON CONFLICT (ip_address, endpoint, window_start)
  DO UPDATE SET request_count = rate_limits.request_count + 1
  RETURNING request_count INTO _current_count;
  
  -- Check if limit exceeded
  RETURN _current_count <= _max_requests;
END;
$$;

-- Create function to clean up old rate limit records (older than 24 hours)
CREATE OR REPLACE FUNCTION public.cleanup_old_rate_limits()
RETURNS INTEGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _deleted_count INTEGER;
BEGIN
  DELETE FROM public.rate_limits
  WHERE window_start < now() - INTERVAL '24 hours';
  
  GET DIAGNOSTICS _deleted_count = ROW_COUNT;
  RETURN _deleted_count;
END;
$$;