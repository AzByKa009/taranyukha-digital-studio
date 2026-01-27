import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Json } from "@/integrations/supabase/types";

export interface ContactSettings {
  email: string;
  telegram: string;
  instagram: string;
  youtube: string;
}

export interface HeroSettings {
  title: string;
  subtitle: string;
  description: string;
  cta_text: string;
  cta_link: string;
}

export interface FooterSettings {
  copyright: string;
  tagline: string;
}

export function useSiteSettings<T>(key: string) {
  return useQuery({
    queryKey: ["site_settings", key],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("site_settings")
        .select("value")
        .eq("key", key)
        .maybeSingle();

      if (error) throw error;
      return (data?.value as T) ?? null;
    },
  });
}

export function useUpdateSiteSettings() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ key, value }: { key: string; value: unknown }) => {
      const { data: existing } = await supabase
        .from("site_settings")
        .select("id")
        .eq("key", key)
        .maybeSingle();

      if (existing) {
        const { error } = await supabase
          .from("site_settings")
          .update({ value: value as Json })
          .eq("key", key);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("site_settings")
          .insert([{ key, value: value as Json }]);
        if (error) throw error;
      }
    },
    onSuccess: (_, { key }) => {
      queryClient.invalidateQueries({ queryKey: ["site_settings", key] });
    },
  });
}

export function useSEOSettings(pageKey: string) {
  return useQuery({
    queryKey: ["seo_settings", pageKey],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("seo_settings")
        .select("*")
        .eq("page_key", pageKey)
        .maybeSingle();

      if (error) throw error;
      return data;
    },
  });
}

export function useAllSEOSettings() {
  return useQuery({
    queryKey: ["seo_settings"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("seo_settings")
        .select("*")
        .order("page_key");

      if (error) throw error;
      return data;
    },
  });
}

export function useUpdateSEOSettings() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (settings: {
      page_key: string;
      title?: string;
      description?: string;
      keywords?: string;
      og_title?: string;
      og_description?: string;
      og_image?: string;
    }) => {
      const { error } = await supabase
        .from("seo_settings")
        .upsert(settings, { onConflict: "page_key" });

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["seo_settings"] });
    },
  });
}

export function usePortfolioVideos() {
  return useQuery({
    queryKey: ["portfolio_videos"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("portfolio_videos")
        .select("*")
        .order("sort_order");

      if (error) throw error;
      return data;
    },
  });
}
