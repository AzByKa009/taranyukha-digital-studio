import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface Service {
  id: string;
  slug: string;
  title: string;
  short_description: string;
  full_description: string | null;
  price_from: number | null;
  price_label: string | null;
  thumbnail: string | null;
  icon: string | null;
  features: string[] | null;
  sort_order: number | null;
  is_published: boolean | null;
}

export function useRealtimeServices(options?: { 
  limit?: number; 
  publishedOnly?: boolean;
}) {
  const { limit, publishedOnly = true } = options || {};
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchServices = async () => {
    let query = supabase
      .from("services")
      .select("id, slug, title, short_description, full_description, price_from, price_label, thumbnail, icon, features, sort_order, is_published")
      .order("sort_order", { ascending: true });

    if (publishedOnly) {
      query = query.eq("is_published", true);
    }

    if (limit) {
      query = query.limit(limit);
    }

    const { data, error } = await query;

    if (!error && data) {
      setServices(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchServices();
  }, [limit, publishedOnly]);

  // Subscribe to real-time updates
  useEffect(() => {
    const channel = supabase
      .channel('services-realtime-hook')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'services'
        },
        () => {
          fetchServices();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [limit, publishedOnly]);

  return { services, loading, refetch: fetchServices };
}
