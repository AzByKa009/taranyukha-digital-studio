-- Create analytics tables for real tracking

-- Page views tracking
CREATE TABLE public.page_views (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  page_path TEXT NOT NULL,
  page_title TEXT,
  referrer TEXT,
  user_agent TEXT,
  device_type TEXT,
  browser TEXT,
  country TEXT,
  session_id TEXT NOT NULL,
  visitor_id TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Sessions tracking
CREATE TABLE public.sessions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id TEXT NOT NULL UNIQUE,
  visitor_id TEXT NOT NULL,
  entry_page TEXT NOT NULL,
  exit_page TEXT,
  page_count INTEGER DEFAULT 1,
  duration_seconds INTEGER DEFAULT 0,
  referrer TEXT,
  utm_source TEXT,
  utm_medium TEXT,
  traffic_source TEXT,
  device_type TEXT,
  browser TEXT,
  country TEXT,
  is_active BOOLEAN DEFAULT true,
  started_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  last_activity_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  ended_at TIMESTAMP WITH TIME ZONE
);

-- Enable RLS
ALTER TABLE public.page_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sessions ENABLE ROW LEVEL SECURITY;

-- Public can insert (for tracking)
CREATE POLICY "Anyone can insert page views" ON public.page_views FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can insert sessions" ON public.sessions FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update sessions" ON public.sessions FOR UPDATE USING (true);

-- Only admins can read
CREATE POLICY "Admins can read page views" ON public.page_views FOR SELECT USING (has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can read sessions" ON public.sessions FOR SELECT USING (has_role(auth.uid(), 'admin'));

-- Create indexes for performance
CREATE INDEX idx_page_views_created_at ON public.page_views(created_at DESC);
CREATE INDEX idx_page_views_session ON public.page_views(session_id);
CREATE INDEX idx_page_views_visitor ON public.page_views(visitor_id);
CREATE INDEX idx_page_views_path ON public.page_views(page_path);
CREATE INDEX idx_sessions_started_at ON public.sessions(started_at DESC);
CREATE INDEX idx_sessions_visitor ON public.sessions(visitor_id);
CREATE INDEX idx_sessions_active ON public.sessions(is_active) WHERE is_active = true;

-- Function to get analytics summary
CREATE OR REPLACE FUNCTION public.get_analytics_summary()
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  result JSON;
BEGIN
  SELECT json_build_object(
    'total_visitors', (SELECT COUNT(DISTINCT visitor_id) FROM sessions),
    'total_page_views', (SELECT COUNT(*) FROM page_views),
    'visitors_today', (SELECT COUNT(DISTINCT visitor_id) FROM sessions WHERE started_at >= CURRENT_DATE),
    'visitors_yesterday', (SELECT COUNT(DISTINCT visitor_id) FROM sessions WHERE started_at >= CURRENT_DATE - INTERVAL '1 day' AND started_at < CURRENT_DATE),
    'page_views_today', (SELECT COUNT(*) FROM page_views WHERE created_at >= CURRENT_DATE),
    'unique_visitors_7d', (SELECT COUNT(DISTINCT visitor_id) FROM sessions WHERE started_at >= CURRENT_DATE - INTERVAL '7 days'),
    'avg_session_duration', (SELECT COALESCE(AVG(duration_seconds), 0)::INTEGER FROM sessions WHERE duration_seconds > 0),
    'online_now', (SELECT COUNT(*) FROM sessions WHERE is_active = true AND last_activity_at >= now() - INTERVAL '5 minutes'),
    'top_pages', (
      SELECT COALESCE(json_agg(row_to_json(t)), '[]'::json)
      FROM (
        SELECT page_path, COUNT(*) as views
        FROM page_views
        WHERE created_at >= CURRENT_DATE - INTERVAL '7 days'
        GROUP BY page_path
        ORDER BY views DESC
        LIMIT 10
      ) t
    ),
    'entry_pages', (
      SELECT COALESCE(json_agg(row_to_json(t)), '[]'::json)
      FROM (
        SELECT entry_page, COUNT(*) as count
        FROM sessions
        WHERE started_at >= CURRENT_DATE - INTERVAL '7 days'
        GROUP BY entry_page
        ORDER BY count DESC
        LIMIT 5
      ) t
    ),
    'exit_pages', (
      SELECT COALESCE(json_agg(row_to_json(t)), '[]'::json)
      FROM (
        SELECT exit_page, COUNT(*) as count
        FROM sessions
        WHERE exit_page IS NOT NULL AND started_at >= CURRENT_DATE - INTERVAL '7 days'
        GROUP BY exit_page
        ORDER BY count DESC
        LIMIT 5
      ) t
    ),
    'traffic_sources', (
      SELECT COALESCE(json_agg(row_to_json(t)), '[]'::json)
      FROM (
        SELECT COALESCE(traffic_source, 'direct') as source, COUNT(*) as count
        FROM sessions
        WHERE started_at >= CURRENT_DATE - INTERVAL '7 days'
        GROUP BY traffic_source
        ORDER BY count DESC
      ) t
    ),
    'devices', (
      SELECT COALESCE(json_agg(row_to_json(t)), '[]'::json)
      FROM (
        SELECT COALESCE(device_type, 'unknown') as device, COUNT(*) as count
        FROM sessions
        WHERE started_at >= CURRENT_DATE - INTERVAL '7 days'
        GROUP BY device_type
        ORDER BY count DESC
      ) t
    ),
    'browsers', (
      SELECT COALESCE(json_agg(row_to_json(t)), '[]'::json)
      FROM (
        SELECT COALESCE(browser, 'unknown') as browser, COUNT(*) as count
        FROM sessions
        WHERE started_at >= CURRENT_DATE - INTERVAL '7 days'
        GROUP BY browser
        ORDER BY count DESC
        LIMIT 5
      ) t
    ),
    'active_pages', (
      SELECT COALESCE(json_agg(row_to_json(t)), '[]'::json)
      FROM (
        SELECT pv.page_path, COUNT(DISTINCT s.session_id) as viewers
        FROM sessions s
        JOIN page_views pv ON pv.session_id = s.session_id
        WHERE s.is_active = true 
          AND s.last_activity_at >= now() - INTERVAL '5 minutes'
          AND pv.created_at >= now() - INTERVAL '5 minutes'
        GROUP BY pv.page_path
        ORDER BY viewers DESC
        LIMIT 5
      ) t
    )
  ) INTO result;
  
  RETURN result;
END;
$$;