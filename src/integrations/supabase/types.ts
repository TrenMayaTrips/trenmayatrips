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
      blog_authors: {
        Row: {
          bio: string | null
          bio_en: string | null
          created_at: string
          id: string
          initials: string | null
          linkedin: string | null
          name: string
          name_en: string | null
          photo: string | null
          role: string | null
          role_en: string | null
          twitter: string | null
          updated_at: string
          website: string | null
        }
        Insert: {
          bio?: string | null
          bio_en?: string | null
          created_at?: string
          id?: string
          initials?: string | null
          linkedin?: string | null
          name: string
          name_en?: string | null
          photo?: string | null
          role?: string | null
          role_en?: string | null
          twitter?: string | null
          updated_at?: string
          website?: string | null
        }
        Update: {
          bio?: string | null
          bio_en?: string | null
          created_at?: string
          id?: string
          initials?: string | null
          linkedin?: string | null
          name?: string
          name_en?: string | null
          photo?: string | null
          role?: string | null
          role_en?: string | null
          twitter?: string | null
          updated_at?: string
          website?: string | null
        }
        Relationships: []
      }
      blog_categories: {
        Row: {
          created_at: string
          description: string | null
          description_en: string | null
          emoji: string | null
          id: string
          label: string
          label_en: string | null
          slug: string
          sort_order: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          description_en?: string | null
          emoji?: string | null
          id?: string
          label: string
          label_en?: string | null
          slug: string
          sort_order?: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          description_en?: string | null
          emoji?: string | null
          id?: string
          label?: string
          label_en?: string | null
          slug?: string
          sort_order?: number
          updated_at?: string
        }
        Relationships: []
      }
      blog_posts: {
        Row: {
          author_id: string | null
          author_name: string | null
          author_role: string | null
          category_id: string | null
          category_slug: string | null
          content: string[] | null
          content_en: string[] | null
          content_images: Json | null
          created_at: string
          excerpt: string | null
          excerpt_en: string | null
          featured: boolean
          featured_image: string | null
          id: string
          published_at: string | null
          read_time: number | null
          seo_description: string | null
          seo_title: string | null
          slug: string
          sort_order: number
          status: Database["public"]["Enums"]["content_status"]
          tags: string[] | null
          title: string
          title_en: string | null
          updated_at: string
        }
        Insert: {
          author_id?: string | null
          author_name?: string | null
          author_role?: string | null
          category_id?: string | null
          category_slug?: string | null
          content?: string[] | null
          content_en?: string[] | null
          content_images?: Json | null
          created_at?: string
          excerpt?: string | null
          excerpt_en?: string | null
          featured?: boolean
          featured_image?: string | null
          id?: string
          published_at?: string | null
          read_time?: number | null
          seo_description?: string | null
          seo_title?: string | null
          slug: string
          sort_order?: number
          status?: Database["public"]["Enums"]["content_status"]
          tags?: string[] | null
          title: string
          title_en?: string | null
          updated_at?: string
        }
        Update: {
          author_id?: string | null
          author_name?: string | null
          author_role?: string | null
          category_id?: string | null
          category_slug?: string | null
          content?: string[] | null
          content_en?: string[] | null
          content_images?: Json | null
          created_at?: string
          excerpt?: string | null
          excerpt_en?: string | null
          featured?: boolean
          featured_image?: string | null
          id?: string
          published_at?: string | null
          read_time?: number | null
          seo_description?: string | null
          seo_title?: string | null
          slug?: string
          sort_order?: number
          status?: Database["public"]["Enums"]["content_status"]
          tags?: string[] | null
          title?: string
          title_en?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "blog_posts_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "blog_authors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "blog_posts_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "blog_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      contact_messages: {
        Row: {
          created_at: string
          email: string
          id: string
          message: string
          name: string
          subject: string
          topic: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          message: string
          name: string
          subject: string
          topic: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          message?: string
          name?: string
          subject?: string
          topic?: string
        }
        Relationships: []
      }
      destinations: {
        Row: {
          best_months: string | null
          created_at: string
          description: string | null
          description_en: string | null
          emoji: string | null
          featured_image: string | null
          gallery: Json | null
          highlights: string[] | null
          id: string
          name: string
          name_en: string | null
          nearest_station_id: string | null
          nearest_station_name: string | null
          seo_description: string | null
          seo_title: string | null
          slug: string
          sort_order: number
          state: Database["public"]["Enums"]["tmt_state"]
          state_label: string
          status: Database["public"]["Enums"]["content_status"]
          tagline: string | null
          tagline_en: string | null
          travel_time: string | null
          type: Database["public"]["Enums"]["destination_type"]
          updated_at: string
          video_url: string | null
        }
        Insert: {
          best_months?: string | null
          created_at?: string
          description?: string | null
          description_en?: string | null
          emoji?: string | null
          featured_image?: string | null
          gallery?: Json | null
          highlights?: string[] | null
          id?: string
          name: string
          name_en?: string | null
          nearest_station_id?: string | null
          nearest_station_name?: string | null
          seo_description?: string | null
          seo_title?: string | null
          slug: string
          sort_order?: number
          state: Database["public"]["Enums"]["tmt_state"]
          state_label: string
          status?: Database["public"]["Enums"]["content_status"]
          tagline?: string | null
          tagline_en?: string | null
          travel_time?: string | null
          type: Database["public"]["Enums"]["destination_type"]
          updated_at?: string
          video_url?: string | null
        }
        Update: {
          best_months?: string | null
          created_at?: string
          description?: string | null
          description_en?: string | null
          emoji?: string | null
          featured_image?: string | null
          gallery?: Json | null
          highlights?: string[] | null
          id?: string
          name?: string
          name_en?: string | null
          nearest_station_id?: string | null
          nearest_station_name?: string | null
          seo_description?: string | null
          seo_title?: string | null
          slug?: string
          sort_order?: number
          state?: Database["public"]["Enums"]["tmt_state"]
          state_label?: string
          status?: Database["public"]["Enums"]["content_status"]
          tagline?: string | null
          tagline_en?: string | null
          travel_time?: string | null
          type?: Database["public"]["Enums"]["destination_type"]
          updated_at?: string
          video_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "destinations_nearest_station_id_fkey"
            columns: ["nearest_station_id"]
            isOneToOne: false
            referencedRelation: "stations"
            referencedColumns: ["id"]
          },
        ]
      }
      experience_categories: {
        Row: {
          created_at: string
          description: string | null
          description_en: string | null
          experience_category_key: string
          faq_cultural: Json | null
          faq_tips: Json | null
          featured_image: string | null
          hero_description: string | null
          hero_description_en: string | null
          hero_headline: string | null
          hero_headline_en: string | null
          icon: string | null
          id: string
          name: string
          name_en: string | null
          slug: string
          sort_order: number
          status: Database["public"]["Enums"]["content_status"]
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          description_en?: string | null
          experience_category_key: string
          faq_cultural?: Json | null
          faq_tips?: Json | null
          featured_image?: string | null
          hero_description?: string | null
          hero_description_en?: string | null
          hero_headline?: string | null
          hero_headline_en?: string | null
          icon?: string | null
          id?: string
          name: string
          name_en?: string | null
          slug: string
          sort_order?: number
          status?: Database["public"]["Enums"]["content_status"]
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          description_en?: string | null
          experience_category_key?: string
          faq_cultural?: Json | null
          faq_tips?: Json | null
          featured_image?: string | null
          hero_description?: string | null
          hero_description_en?: string | null
          hero_headline?: string | null
          hero_headline_en?: string | null
          icon?: string | null
          id?: string
          name?: string
          name_en?: string | null
          slug?: string
          sort_order?: number
          status?: Database["public"]["Enums"]["content_status"]
          updated_at?: string
        }
        Relationships: []
      }
      experience_subcategories: {
        Row: {
          category_id: string
          created_at: string
          description: string | null
          description_en: string | null
          featured_image: string | null
          hero_description: string | null
          hero_description_en: string | null
          icon: string | null
          id: string
          name: string
          name_en: string | null
          slug: string
          sort_order: number
          status: Database["public"]["Enums"]["content_status"]
          updated_at: string
        }
        Insert: {
          category_id: string
          created_at?: string
          description?: string | null
          description_en?: string | null
          featured_image?: string | null
          hero_description?: string | null
          hero_description_en?: string | null
          icon?: string | null
          id?: string
          name: string
          name_en?: string | null
          slug: string
          sort_order?: number
          status?: Database["public"]["Enums"]["content_status"]
          updated_at?: string
        }
        Update: {
          category_id?: string
          created_at?: string
          description?: string | null
          description_en?: string | null
          featured_image?: string | null
          hero_description?: string | null
          hero_description_en?: string | null
          icon?: string | null
          id?: string
          name?: string
          name_en?: string | null
          slug?: string
          sort_order?: number
          status?: Database["public"]["Enums"]["content_status"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "experience_subcategories_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "experience_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      experiences: {
        Row: {
          category_id: string | null
          category_key: string
          created_at: string
          currency: string
          description: string
          description_en: string | null
          destination_id: string | null
          duration: string
          featured_image: string | null
          gallery: Json | null
          group_size: string | null
          id: string
          includes: string[] | null
          is_featured: boolean
          itinerary: Json | null
          languages: string[] | null
          long_description: string | null
          long_description_en: string | null
          net_price: number | null
          not_includes: string[] | null
          price: number
          provider_id: string | null
          rating: number | null
          rating_breakdown: Json | null
          rating_distribution: Json | null
          recommendations: string[] | null
          related_slugs: string[] | null
          reviews_count: number | null
          reviews_data: Json | null
          seo_description: string | null
          seo_title: string | null
          slug: string
          sort_order: number
          state: Database["public"]["Enums"]["tmt_state"]
          state_label: string
          status: Database["public"]["Enums"]["content_status"]
          title: string
          title_en: string | null
          updated_at: string
          video_url: string | null
          wellet_code: string | null
        }
        Insert: {
          category_id?: string | null
          category_key: string
          created_at?: string
          currency?: string
          description: string
          description_en?: string | null
          destination_id?: string | null
          duration: string
          featured_image?: string | null
          gallery?: Json | null
          group_size?: string | null
          id?: string
          includes?: string[] | null
          is_featured?: boolean
          itinerary?: Json | null
          languages?: string[] | null
          long_description?: string | null
          long_description_en?: string | null
          net_price?: number | null
          not_includes?: string[] | null
          price: number
          provider_id?: string | null
          rating?: number | null
          rating_breakdown?: Json | null
          rating_distribution?: Json | null
          recommendations?: string[] | null
          related_slugs?: string[] | null
          reviews_count?: number | null
          reviews_data?: Json | null
          seo_description?: string | null
          seo_title?: string | null
          slug: string
          sort_order?: number
          state: Database["public"]["Enums"]["tmt_state"]
          state_label: string
          status?: Database["public"]["Enums"]["content_status"]
          title: string
          title_en?: string | null
          updated_at?: string
          video_url?: string | null
          wellet_code?: string | null
        }
        Update: {
          category_id?: string | null
          category_key?: string
          created_at?: string
          currency?: string
          description?: string
          description_en?: string | null
          destination_id?: string | null
          duration?: string
          featured_image?: string | null
          gallery?: Json | null
          group_size?: string | null
          id?: string
          includes?: string[] | null
          is_featured?: boolean
          itinerary?: Json | null
          languages?: string[] | null
          long_description?: string | null
          long_description_en?: string | null
          net_price?: number | null
          not_includes?: string[] | null
          price?: number
          provider_id?: string | null
          rating?: number | null
          rating_breakdown?: Json | null
          rating_distribution?: Json | null
          recommendations?: string[] | null
          related_slugs?: string[] | null
          reviews_count?: number | null
          reviews_data?: Json | null
          seo_description?: string | null
          seo_title?: string | null
          slug?: string
          sort_order?: number
          state?: Database["public"]["Enums"]["tmt_state"]
          state_label?: string
          status?: Database["public"]["Enums"]["content_status"]
          title?: string
          title_en?: string | null
          updated_at?: string
          video_url?: string | null
          wellet_code?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "experiences_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "experience_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "experiences_destination_id_fkey"
            columns: ["destination_id"]
            isOneToOne: false
            referencedRelation: "destinations"
            referencedColumns: ["id"]
          },
        ]
      }
      newsletter_subscribers: {
        Row: {
          created_at: string
          email: string
          id: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
        }
        Relationships: []
      }
      packages: {
        Row: {
          best_for: string | null
          best_for_en: string | null
          created_at: string
          currency: string
          description: string
          description_en: string | null
          difficulty: Database["public"]["Enums"]["difficulty_level"]
          duration_days: number
          excludes: string[] | null
          featured_image: string | null
          gallery: Json | null
          group_size: string | null
          highlights: string[] | null
          id: string
          includes: string[] | null
          is_featured: boolean
          itinerary: Json | null
          max_altitude: number | null
          net_price: number | null
          price: number
          rating: number | null
          reviews_count: number | null
          seasonal_rating: Json | null
          seo_description: string | null
          seo_title: string | null
          slug: string
          sort_order: number
          states: string[] | null
          status: Database["public"]["Enums"]["content_status"]
          title: string
          title_en: string | null
          type: Database["public"]["Enums"]["package_type"]
          updated_at: string
          video_url: string | null
          wellet_code: string | null
        }
        Insert: {
          best_for?: string | null
          best_for_en?: string | null
          created_at?: string
          currency?: string
          description: string
          description_en?: string | null
          difficulty?: Database["public"]["Enums"]["difficulty_level"]
          duration_days: number
          excludes?: string[] | null
          featured_image?: string | null
          gallery?: Json | null
          group_size?: string | null
          highlights?: string[] | null
          id?: string
          includes?: string[] | null
          is_featured?: boolean
          itinerary?: Json | null
          max_altitude?: number | null
          net_price?: number | null
          price: number
          rating?: number | null
          reviews_count?: number | null
          seasonal_rating?: Json | null
          seo_description?: string | null
          seo_title?: string | null
          slug: string
          sort_order?: number
          states?: string[] | null
          status?: Database["public"]["Enums"]["content_status"]
          title: string
          title_en?: string | null
          type: Database["public"]["Enums"]["package_type"]
          updated_at?: string
          video_url?: string | null
          wellet_code?: string | null
        }
        Update: {
          best_for?: string | null
          best_for_en?: string | null
          created_at?: string
          currency?: string
          description?: string
          description_en?: string | null
          difficulty?: Database["public"]["Enums"]["difficulty_level"]
          duration_days?: number
          excludes?: string[] | null
          featured_image?: string | null
          gallery?: Json | null
          group_size?: string | null
          highlights?: string[] | null
          id?: string
          includes?: string[] | null
          is_featured?: boolean
          itinerary?: Json | null
          max_altitude?: number | null
          net_price?: number | null
          price?: number
          rating?: number | null
          reviews_count?: number | null
          seasonal_rating?: Json | null
          seo_description?: string | null
          seo_title?: string | null
          slug?: string
          sort_order?: number
          states?: string[] | null
          status?: Database["public"]["Enums"]["content_status"]
          title?: string
          title_en?: string | null
          type?: Database["public"]["Enums"]["package_type"]
          updated_at?: string
          video_url?: string | null
          wellet_code?: string | null
        }
        Relationships: []
      }
      routes: {
        Row: {
          badge: string | null
          badge_emoji: string | null
          created_at: string
          daily_departures: number
          description: string | null
          description_en: string | null
          destination: string
          destination_en: string | null
          duration: string
          duration_minutes: number
          hero_image: string | null
          id: string
          origin: string
          origin_en: string | null
          prices: Json
          scenic_highlights: string | null
          scenic_highlights_en: string | null
          schedules: string[] | null
          slug: string
          sort_order: number
          states_traversed: string[] | null
          status: Database["public"]["Enums"]["content_status"]
          stops: number
          timeline: Json | null
          tips: Json | null
          updated_at: string
        }
        Insert: {
          badge?: string | null
          badge_emoji?: string | null
          created_at?: string
          daily_departures?: number
          description?: string | null
          description_en?: string | null
          destination: string
          destination_en?: string | null
          duration: string
          duration_minutes: number
          hero_image?: string | null
          id?: string
          origin: string
          origin_en?: string | null
          prices: Json
          scenic_highlights?: string | null
          scenic_highlights_en?: string | null
          schedules?: string[] | null
          slug: string
          sort_order?: number
          states_traversed?: string[] | null
          status?: Database["public"]["Enums"]["content_status"]
          stops?: number
          timeline?: Json | null
          tips?: Json | null
          updated_at?: string
        }
        Update: {
          badge?: string | null
          badge_emoji?: string | null
          created_at?: string
          daily_departures?: number
          description?: string | null
          description_en?: string | null
          destination?: string
          destination_en?: string | null
          duration?: string
          duration_minutes?: number
          hero_image?: string | null
          id?: string
          origin?: string
          origin_en?: string | null
          prices?: Json
          scenic_highlights?: string | null
          scenic_highlights_en?: string | null
          schedules?: string[] | null
          slug?: string
          sort_order?: number
          states_traversed?: string[] | null
          status?: Database["public"]["Enums"]["content_status"]
          stops?: number
          timeline?: Json | null
          tips?: Json | null
          updated_at?: string
        }
        Relationships: []
      }
      saved_itineraries: {
        Row: {
          created_at: string
          destinations: Json
          duration: number
          id: string
          lodging: Json
          short_code: string
          total_cost: number
          trip_type: string
        }
        Insert: {
          created_at?: string
          destinations: Json
          duration: number
          id?: string
          lodging: Json
          short_code?: string
          total_cost?: number
          trip_type: string
        }
        Update: {
          created_at?: string
          destinations?: Json
          duration?: number
          id?: string
          lodging?: Json
          short_code?: string
          total_cost?: number
          trip_type?: string
        }
        Relationships: []
      }
      states_info: {
        Row: {
          capital: string | null
          color: string | null
          created_at: string
          emoji: string | null
          featured_image: string | null
          id: string
          name: string
          name_en: string | null
          slug: string
          sort_order: number
          tagline: string | null
          tagline_en: string | null
          updated_at: string
        }
        Insert: {
          capital?: string | null
          color?: string | null
          created_at?: string
          emoji?: string | null
          featured_image?: string | null
          id?: string
          name: string
          name_en?: string | null
          slug: string
          sort_order?: number
          tagline?: string | null
          tagline_en?: string | null
          updated_at?: string
        }
        Update: {
          capital?: string | null
          color?: string | null
          created_at?: string
          emoji?: string | null
          featured_image?: string | null
          id?: string
          name?: string
          name_en?: string | null
          slug?: string
          sort_order?: number
          tagline?: string | null
          tagline_en?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      stations: {
        Row: {
          accessibility: string | null
          connections: Json | null
          created_at: string
          full_name: string | null
          full_name_en: string | null
          has_detail_page: boolean
          highlights: string[] | null
          id: string
          image: string | null
          km: number
          name: string
          name_en: string | null
          nearby_destinations: Json | null
          parking: string | null
          schedule: string | null
          seo_description: string | null
          seo_title: string | null
          services: Json | null
          slug: string
          sort_order: number
          state: Database["public"]["Enums"]["tmt_state"]
          state_label: string
          status: Database["public"]["Enums"]["content_status"]
          subtitle: string | null
          subtitle_en: string | null
          tips: string[] | null
          transport: Json | null
          type: Database["public"]["Enums"]["station_type"]
          updated_at: string
        }
        Insert: {
          accessibility?: string | null
          connections?: Json | null
          created_at?: string
          full_name?: string | null
          full_name_en?: string | null
          has_detail_page?: boolean
          highlights?: string[] | null
          id?: string
          image?: string | null
          km?: number
          name: string
          name_en?: string | null
          nearby_destinations?: Json | null
          parking?: string | null
          schedule?: string | null
          seo_description?: string | null
          seo_title?: string | null
          services?: Json | null
          slug: string
          sort_order?: number
          state: Database["public"]["Enums"]["tmt_state"]
          state_label: string
          status?: Database["public"]["Enums"]["content_status"]
          subtitle?: string | null
          subtitle_en?: string | null
          tips?: string[] | null
          transport?: Json | null
          type?: Database["public"]["Enums"]["station_type"]
          updated_at?: string
        }
        Update: {
          accessibility?: string | null
          connections?: Json | null
          created_at?: string
          full_name?: string | null
          full_name_en?: string | null
          has_detail_page?: boolean
          highlights?: string[] | null
          id?: string
          image?: string | null
          km?: number
          name?: string
          name_en?: string | null
          nearby_destinations?: Json | null
          parking?: string | null
          schedule?: string | null
          seo_description?: string | null
          seo_title?: string | null
          services?: Json | null
          slug?: string
          sort_order?: number
          state?: Database["public"]["Enums"]["tmt_state"]
          state_label?: string
          status?: Database["public"]["Enums"]["content_status"]
          subtitle?: string | null
          subtitle_en?: string | null
          tips?: string[] | null
          transport?: Json | null
          type?: Database["public"]["Enums"]["station_type"]
          updated_at?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      wagon_classes: {
        Row: {
          amenities: Json | null
          badge: string | null
          color_token: string | null
          comparison: Json | null
          config: string | null
          created_at: string
          description: string | null
          description_en: string | null
          faqs: Json | null
          gallery_images: Json | null
          hero_image: string | null
          id: string
          is_featured: boolean
          meaning: string | null
          meaning_full: string | null
          meaning_full_en: string | null
          name: string
          name_en: string | null
          price_base: number
          seat_width: string | null
          seats: number | null
          slug: string
          sort_order: number
          status: Database["public"]["Enums"]["content_status"]
          type: string
          type_short: string | null
          updated_at: string
          video_url: string | null
        }
        Insert: {
          amenities?: Json | null
          badge?: string | null
          color_token?: string | null
          comparison?: Json | null
          config?: string | null
          created_at?: string
          description?: string | null
          description_en?: string | null
          faqs?: Json | null
          gallery_images?: Json | null
          hero_image?: string | null
          id?: string
          is_featured?: boolean
          meaning?: string | null
          meaning_full?: string | null
          meaning_full_en?: string | null
          name: string
          name_en?: string | null
          price_base: number
          seat_width?: string | null
          seats?: number | null
          slug: string
          sort_order?: number
          status?: Database["public"]["Enums"]["content_status"]
          type: string
          type_short?: string | null
          updated_at?: string
          video_url?: string | null
        }
        Update: {
          amenities?: Json | null
          badge?: string | null
          color_token?: string | null
          comparison?: Json | null
          config?: string | null
          created_at?: string
          description?: string | null
          description_en?: string | null
          faqs?: Json | null
          gallery_images?: Json | null
          hero_image?: string | null
          id?: string
          is_featured?: boolean
          meaning?: string | null
          meaning_full?: string | null
          meaning_full_en?: string | null
          name?: string
          name_en?: string | null
          price_base?: number
          seat_width?: string | null
          seats?: number | null
          slug?: string
          sort_order?: number
          status?: Database["public"]["Enums"]["content_status"]
          type?: string
          type_short?: string | null
          updated_at?: string
          video_url?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
      content_status: "draft" | "published" | "paused"
      destination_type:
        | "ciudad"
        | "arqueologia"
        | "naturaleza"
        | "playa"
        | "pueblo"
      difficulty_level: "fácil" | "moderado" | "desafiante"
      package_type: "cultural" | "aventura" | "gastronomico" | "mixto"
      station_type: "principal" | "estacion" | "paradero"
      tmt_state: "quintana_roo" | "yucatan" | "campeche" | "tabasco" | "chiapas"
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
      app_role: ["admin", "moderator", "user"],
      content_status: ["draft", "published", "paused"],
      destination_type: [
        "ciudad",
        "arqueologia",
        "naturaleza",
        "playa",
        "pueblo",
      ],
      difficulty_level: ["fácil", "moderado", "desafiante"],
      package_type: ["cultural", "aventura", "gastronomico", "mixto"],
      station_type: ["principal", "estacion", "paradero"],
      tmt_state: ["quintana_roo", "yucatan", "campeche", "tabasco", "chiapas"],
    },
  },
} as const
