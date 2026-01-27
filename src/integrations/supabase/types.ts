export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      ai_product_categories: {
        Row: {
          created_at: string
          description: string | null
          icon: string | null
          id: string
          is_published: boolean | null
          slug: string
          sort_order: number | null
          title: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          icon?: string | null
          id?: string
          is_published?: boolean | null
          slug: string
          sort_order?: number | null
          title: string
        }
        Update: {
          created_at?: string
          description?: string | null
          icon?: string | null
          id?: string
          is_published?: boolean | null
          slug?: string
          sort_order?: number | null
          title?: string
        }
        Relationships: []
      }
      ai_products: {
        Row: {
          category_id: string | null
          created_at: string
          description: string
          features: string[] | null
          id: string
          is_published: boolean | null
          price_from: number | null
          slug: string
          sort_order: number | null
          thumbnail: string | null
          timeline: string | null
          title: string
          updated_at: string
        }
        Insert: {
          category_id?: string | null
          created_at?: string
          description: string
          features?: string[] | null
          id?: string
          is_published?: boolean | null
          price_from?: number | null
          slug: string
          sort_order?: number | null
          thumbnail?: string | null
          timeline?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          category_id?: string | null
          created_at?: string
          description?: string
          features?: string[] | null
          id?: string
          is_published?: boolean | null
          price_from?: number | null
          slug?: string
          sort_order?: number | null
          thumbnail?: string | null
          timeline?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "ai_products_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "ai_product_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      blog_posts: {
        Row: {
          category: string | null
          content: string | null
          created_at: string
          excerpt: string | null
          id: string
          is_published: boolean | null
          published_at: string | null
          read_time: number | null
          slug: string
          tags: string[] | null
          thumbnail: string | null
          title: string
          updated_at: string
        }
        Insert: {
          category?: string | null
          content?: string | null
          created_at?: string
          excerpt?: string | null
          id?: string
          is_published?: boolean | null
          published_at?: string | null
          read_time?: number | null
          slug: string
          tags?: string[] | null
          thumbnail?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          category?: string | null
          content?: string | null
          created_at?: string
          excerpt?: string | null
          id?: string
          is_published?: boolean | null
          published_at?: string | null
          read_time?: number | null
          slug?: string
          tags?: string[] | null
          thumbnail?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      cases: {
        Row: {
          category: string
          category_label: string
          challenge: string | null
          created_at: string
          deliverables: string[] | null
          gallery: string[] | null
          id: string
          is_published: boolean | null
          result: string | null
          short_description: string
          slug: string
          solution: string | null
          sort_order: number | null
          tags: string[] | null
          thumbnail: string | null
          title: string
          updated_at: string
          video_preview: string | null
          year: string
        }
        Insert: {
          category: string
          category_label: string
          challenge?: string | null
          created_at?: string
          deliverables?: string[] | null
          gallery?: string[] | null
          id?: string
          is_published?: boolean | null
          result?: string | null
          short_description: string
          slug: string
          solution?: string | null
          sort_order?: number | null
          tags?: string[] | null
          thumbnail?: string | null
          title: string
          updated_at?: string
          video_preview?: string | null
          year: string
        }
        Update: {
          category?: string
          category_label?: string
          challenge?: string | null
          created_at?: string
          deliverables?: string[] | null
          gallery?: string[] | null
          id?: string
          is_published?: boolean | null
          result?: string | null
          short_description?: string
          slug?: string
          solution?: string | null
          sort_order?: number | null
          tags?: string[] | null
          thumbnail?: string | null
          title?: string
          updated_at?: string
          video_preview?: string | null
          year?: string
        }
        Relationships: []
      }
      page_content: {
        Row: {
          content: Json
          id: string
          is_visible: boolean | null
          page_key: string
          section_key: string
          sort_order: number | null
          updated_at: string
        }
        Insert: {
          content?: Json
          id?: string
          is_visible?: boolean | null
          page_key: string
          section_key: string
          sort_order?: number | null
          updated_at?: string
        }
        Update: {
          content?: Json
          id?: string
          is_visible?: boolean | null
          page_key?: string
          section_key?: string
          sort_order?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      page_views: {
        Row: {
          browser: string | null
          country: string | null
          created_at: string
          device_type: string | null
          id: string
          page_path: string
          page_title: string | null
          referrer: string | null
          session_id: string
          user_agent: string | null
          visitor_id: string
        }
        Insert: {
          browser?: string | null
          country?: string | null
          created_at?: string
          device_type?: string | null
          id?: string
          page_path: string
          page_title?: string | null
          referrer?: string | null
          session_id: string
          user_agent?: string | null
          visitor_id: string
        }
        Update: {
          browser?: string | null
          country?: string | null
          created_at?: string
          device_type?: string | null
          id?: string
          page_path?: string
          page_title?: string | null
          referrer?: string | null
          session_id?: string
          user_agent?: string | null
          visitor_id?: string
        }
        Relationships: []
      }
      portfolio_videos: {
        Row: {
          category: string
          category_label: string
          created_at: string
          description: string | null
          full_description: string | null
          id: string
          is_published: boolean | null
          review: string | null
          sort_order: number | null
          stats: string | null
          thumbnail_url: string | null
          title: string
          updated_at: string
          video_url: string
        }
        Insert: {
          category: string
          category_label: string
          created_at?: string
          description?: string | null
          full_description?: string | null
          id?: string
          is_published?: boolean | null
          review?: string | null
          sort_order?: number | null
          stats?: string | null
          thumbnail_url?: string | null
          title: string
          updated_at?: string
          video_url: string
        }
        Update: {
          category?: string
          category_label?: string
          created_at?: string
          description?: string | null
          full_description?: string | null
          id?: string
          is_published?: boolean | null
          review?: string | null
          sort_order?: number | null
          stats?: string | null
          thumbnail_url?: string | null
          title?: string
          updated_at?: string
          video_url?: string
        }
        Relationships: []
      }
      rate_limits: {
        Row: {
          created_at: string
          endpoint: string
          id: string
          ip_address: string
          request_count: number
          window_start: string
        }
        Insert: {
          created_at?: string
          endpoint: string
          id?: string
          ip_address: string
          request_count?: number
          window_start?: string
        }
        Update: {
          created_at?: string
          endpoint?: string
          id?: string
          ip_address?: string
          request_count?: number
          window_start?: string
        }
        Relationships: []
      }
      seo_settings: {
        Row: {
          description: string | null
          id: string
          keywords: string | null
          og_description: string | null
          og_image: string | null
          og_title: string | null
          page_key: string
          title: string | null
          updated_at: string
        }
        Insert: {
          description?: string | null
          id?: string
          keywords?: string | null
          og_description?: string | null
          og_image?: string | null
          og_title?: string | null
          page_key: string
          title?: string | null
          updated_at?: string
        }
        Update: {
          description?: string | null
          id?: string
          keywords?: string | null
          og_description?: string | null
          og_image?: string | null
          og_title?: string | null
          page_key?: string
          title?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      services: {
        Row: {
          created_at: string
          faq: Json | null
          features: string[] | null
          full_description: string | null
          icon: string | null
          id: string
          is_published: boolean | null
          price_from: number | null
          price_label: string | null
          process_steps: Json | null
          short_description: string
          slug: string
          sort_order: number | null
          thumbnail: string | null
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          faq?: Json | null
          features?: string[] | null
          full_description?: string | null
          icon?: string | null
          id?: string
          is_published?: boolean | null
          price_from?: number | null
          price_label?: string | null
          process_steps?: Json | null
          short_description: string
          slug: string
          sort_order?: number | null
          thumbnail?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          faq?: Json | null
          features?: string[] | null
          full_description?: string | null
          icon?: string | null
          id?: string
          is_published?: boolean | null
          price_from?: number | null
          price_label?: string | null
          process_steps?: Json | null
          short_description?: string
          slug?: string
          sort_order?: number | null
          thumbnail?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      sessions: {
        Row: {
          browser: string | null
          country: string | null
          device_type: string | null
          duration_seconds: number | null
          ended_at: string | null
          entry_page: string
          exit_page: string | null
          id: string
          is_active: boolean | null
          last_activity_at: string
          page_count: number | null
          referrer: string | null
          session_id: string
          started_at: string
          traffic_source: string | null
          utm_medium: string | null
          utm_source: string | null
          visitor_id: string
        }
        Insert: {
          browser?: string | null
          country?: string | null
          device_type?: string | null
          duration_seconds?: number | null
          ended_at?: string | null
          entry_page: string
          exit_page?: string | null
          id?: string
          is_active?: boolean | null
          last_activity_at?: string
          page_count?: number | null
          referrer?: string | null
          session_id: string
          started_at?: string
          traffic_source?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          visitor_id: string
        }
        Update: {
          browser?: string | null
          country?: string | null
          device_type?: string | null
          duration_seconds?: number | null
          ended_at?: string | null
          entry_page?: string
          exit_page?: string | null
          id?: string
          is_active?: boolean | null
          last_activity_at?: string
          page_count?: number | null
          referrer?: string | null
          session_id?: string
          started_at?: string
          traffic_source?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          visitor_id?: string
        }
        Relationships: []
      }
      site_settings: {
        Row: {
          id: string
          key: string
          updated_at: string
          value: Json
        }
        Insert: {
          id?: string
          key: string
          updated_at?: string
          value?: Json
        }
        Update: {
          id?: string
          key?: string
          updated_at?: string
          value?: Json
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      check_rate_limit: {
        Args: {
          _endpoint: string
          _ip_address: string
          _max_requests?: number
          _window_minutes?: number
        }
        Returns: boolean
      }
      cleanup_old_rate_limits: { Args: never; Returns: number }
      get_analytics_summary: { Args: never; Returns: Json }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "user"],
    },
  },
} as const
