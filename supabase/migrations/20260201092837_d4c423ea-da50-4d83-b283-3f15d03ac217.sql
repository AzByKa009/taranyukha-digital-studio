-- Fix: Add authorization check to get_analytics_summary() function
-- This prevents any authenticated user from accessing admin-only analytics

CREATE OR REPLACE FUNCTION public.get_analytics_summary()
 RETURNS json
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  result JSON;
BEGIN
  -- Authorization check: only admins can access analytics
  IF NOT public.has_role(auth.uid(), 'admin') THEN
    RAISE EXCEPTION 'Unauthorized: admin access required'
      USING ERRCODE = 'insufficient_privilege';
  END IF;

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
$function$;