
CREATE OR REPLACE FUNCTION public.get_analytics_summary()
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  result JSON;
  total_sessions_7d INTEGER;
  total_leads_7d INTEGER;
  total_visitors_all INTEGER;
BEGIN
  IF NOT public.has_role(auth.uid(), 'admin') THEN
    RAISE EXCEPTION 'Unauthorized: admin access required'
      USING ERRCODE = 'insufficient_privilege';
  END IF;

  SELECT COUNT(*) INTO total_sessions_7d FROM sessions WHERE started_at >= CURRENT_DATE - INTERVAL '7 days';
  SELECT COUNT(*) INTO total_leads_7d FROM leads WHERE created_at >= CURRENT_DATE - INTERVAL '7 days';
  SELECT COUNT(DISTINCT visitor_id) INTO total_visitors_all FROM sessions;

  SELECT json_build_object(
    'total_visitors', total_visitors_all,
    'total_page_views', (SELECT COUNT(*) FROM page_views),
    'visitors_today', (SELECT COUNT(DISTINCT visitor_id) FROM sessions WHERE started_at >= CURRENT_DATE),
    'visitors_yesterday', (SELECT COUNT(DISTINCT visitor_id) FROM sessions WHERE started_at >= CURRENT_DATE - INTERVAL '1 day' AND started_at < CURRENT_DATE),
    'page_views_today', (SELECT COUNT(*) FROM page_views WHERE created_at >= CURRENT_DATE),
    'unique_visitors_7d', (SELECT COUNT(DISTINCT visitor_id) FROM sessions WHERE started_at >= CURRENT_DATE - INTERVAL '7 days'),
    'avg_session_duration', (SELECT COALESCE(AVG(duration_seconds), 0)::INTEGER FROM sessions WHERE duration_seconds > 0),
    'online_now', (SELECT COUNT(*) FROM sessions WHERE is_active = true AND last_activity_at >= now() - INTERVAL '5 minutes'),

    -- NEW: Bounce rate (sessions with only 1 page view in last 7d)
    'bounce_rate', CASE WHEN total_sessions_7d > 0 THEN
      ROUND((SELECT COUNT(*)::NUMERIC FROM sessions s WHERE s.started_at >= CURRENT_DATE - INTERVAL '7 days' AND (SELECT COUNT(*) FROM page_views pv WHERE pv.session_id = s.session_id) <= 1) / total_sessions_7d * 100, 1)
    ELSE 0 END,

    -- NEW: Pages per session (7d)
    'pages_per_session', CASE WHEN total_sessions_7d > 0 THEN
      ROUND((SELECT COUNT(*)::NUMERIC FROM page_views WHERE created_at >= CURRENT_DATE - INTERVAL '7 days') / total_sessions_7d, 1)
    ELSE 0 END,

    -- NEW: Conversion rate (leads / unique visitors, 7d)
    'conversion_rate', CASE WHEN (SELECT COUNT(DISTINCT visitor_id) FROM sessions WHERE started_at >= CURRENT_DATE - INTERVAL '7 days') > 0 THEN
      ROUND(total_leads_7d::NUMERIC / (SELECT COUNT(DISTINCT visitor_id) FROM sessions WHERE started_at >= CURRENT_DATE - INTERVAL '7 days') * 100, 2)
    ELSE 0 END,

    -- NEW: Total leads 7d
    'leads_7d', total_leads_7d,

    -- NEW: Daily visitors trend (last 14 days)
    'daily_visitors', (
      SELECT COALESCE(json_agg(row_to_json(t) ORDER BY t.date), '[]'::json)
      FROM (
        SELECT d::date as date, COUNT(DISTINCT s.visitor_id) as visitors, COUNT(DISTINCT pv.id) as page_views
        FROM generate_series(CURRENT_DATE - INTERVAL '13 days', CURRENT_DATE, '1 day') d
        LEFT JOIN sessions s ON s.started_at::date = d::date
        LEFT JOIN page_views pv ON pv.created_at::date = d::date
        GROUP BY d::date
        ORDER BY d::date
      ) t
    ),

    -- NEW: Avg pages per session (7d) by page — shows which pages people visit most per session
    'top_pages', (
      SELECT COALESCE(json_agg(row_to_json(t)), '[]'::json)
      FROM (
        SELECT page_path, COUNT(*) as views, COUNT(DISTINCT session_id) as unique_sessions
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
