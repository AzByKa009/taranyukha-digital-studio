import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";

interface AnalyticsData {
  total_visitors: number;
  total_page_views: number;
  visitors_today: number;
  visitors_yesterday: number;
  page_views_today: number;
  unique_visitors_7d: number;
  avg_session_duration: number;
  online_now: number;
  top_pages: Array<{ page_path: string; views: number }>;
  entry_pages: Array<{ entry_page: string; count: number }>;
  exit_pages: Array<{ exit_page: string; count: number }>;
  traffic_sources: Array<{ source: string; count: number }>;
  devices: Array<{ device: string; count: number }>;
  browsers: Array<{ browser: string; count: number }>;
  active_pages: Array<{ page_path: string; viewers: number }>;
}

const defaultData: AnalyticsData = {
  total_visitors: 0,
  total_page_views: 0,
  visitors_today: 0,
  visitors_yesterday: 0,
  page_views_today: 0,
  unique_visitors_7d: 0,
  avg_session_duration: 0,
  online_now: 0,
  top_pages: [],
  entry_pages: [],
  exit_pages: [],
  traffic_sources: [],
  devices: [],
  browsers: [],
  active_pages: [],
};

export function useAnalytics() {
  const [data, setData] = useState<AnalyticsData>(defaultData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAnalytics = useCallback(async () => {
    try {
      const { data: result, error: rpcError } = await supabase.rpc("get_analytics_summary");

      if (rpcError) {
        throw rpcError;
      }

      if (result) {
        setData(result as unknown as AnalyticsData);
      }
    } catch (err) {
      console.error("Failed to fetch analytics:", err);
      setError("Не удалось загрузить аналитику");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAnalytics();
    const interval = setInterval(fetchAnalytics, 30000);
    return () => clearInterval(interval);
  }, [fetchAnalytics]);

  return { data, loading, error, refetch: fetchAnalytics };
}
