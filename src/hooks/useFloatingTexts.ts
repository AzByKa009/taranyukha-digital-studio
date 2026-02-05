import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useEffect } from "react";

export interface FloatingText {
  id: string;
  page_path: string;
  content: string;
  position_x: number;
  position_y: number;
  font_size: number;
  font_weight: string;
  color: string;
  background_color: string | null;
  z_index: number;
  is_visible: boolean;
  created_at: string;
  updated_at: string;
}

export function useFloatingTexts(pagePath?: string) {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["floating-texts", pagePath],
    queryFn: async () => {
      let q = supabase
        .from("floating_texts")
        .select("*")
        .order("created_at", { ascending: true });
      
      if (pagePath) {
        q = q.eq("page_path", pagePath);
      }

      const { data, error } = await q;
      if (error) throw error;
      return data as FloatingText[];
    },
  });

  // Realtime subscription
  useEffect(() => {
    const channel = supabase
      .channel("floating_texts_changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "floating_texts" },
        () => {
          queryClient.invalidateQueries({ queryKey: ["floating-texts"] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryClient]);

  return query;
}

export function useCreateFloatingText() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: Partial<FloatingText>) => {
      const { data: result, error } = await supabase
        .from("floating_texts")
        .insert(data)
        .select()
        .single();
      if (error) throw error;
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["floating-texts"] });
    },
  });
}

export function useUpdateFloatingText() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...data }: Partial<FloatingText> & { id: string }) => {
      const { data: result, error } = await supabase
        .from("floating_texts")
        .update(data)
        .eq("id", id)
        .select()
        .single();
      if (error) throw error;
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["floating-texts"] });
    },
  });
}

export function useDeleteFloatingText() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("floating_texts")
        .delete()
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["floating-texts"] });
    },
  });
}
