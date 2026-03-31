CREATE TABLE public.wagon_classes (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  slug text NOT NULL UNIQUE,
  name text NOT NULL,
  name_en text,
  meaning text,
  meaning_full text,
  meaning_full_en text,
  type text NOT NULL,
  type_short text,
  price_base numeric NOT NULL,
  seats integer,
  config text,
  seat_width text,
  color_token text,
  description text,
  description_en text,
  hero_image text,
  gallery_images jsonb DEFAULT '[]'::jsonb,
  video_url text,
  is_featured boolean NOT NULL DEFAULT false,
  badge text,
  amenities jsonb DEFAULT '[]'::jsonb,
  comparison jsonb,
  faqs jsonb DEFAULT '[]'::jsonb,
  sort_order integer NOT NULL DEFAULT 0,
  status public.content_status NOT NULL DEFAULT 'published',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_wagon_classes_status ON public.wagon_classes(status);

CREATE TRIGGER set_updated_at_wagon_classes
  BEFORE UPDATE ON public.wagon_classes
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

ALTER TABLE public.wagon_classes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read published wagon_classes"
  ON public.wagon_classes FOR SELECT USING (status = 'published');

CREATE POLICY "Admins can manage wagon_classes"
  ON public.wagon_classes FOR ALL TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role)) WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE TABLE public.routes (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  slug text NOT NULL UNIQUE,
  origin text NOT NULL,
  origin_en text,
  destination text NOT NULL,
  destination_en text,
  duration text NOT NULL,
  duration_minutes integer NOT NULL,
  stops integer NOT NULL DEFAULT 0,
  daily_departures integer NOT NULL DEFAULT 0,
  badge text,
  badge_emoji text,
  prices jsonb NOT NULL,
  schedules text[] DEFAULT '{}',
  description text,
  description_en text,
  timeline jsonb DEFAULT '[]'::jsonb,
  hero_image text,
  states_traversed text[] DEFAULT '{}',
  scenic_highlights text,
  scenic_highlights_en text,
  tips jsonb DEFAULT '[]'::jsonb,
  sort_order integer NOT NULL DEFAULT 0,
  status public.content_status NOT NULL DEFAULT 'published',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_routes_status ON public.routes(status);

CREATE TRIGGER set_updated_at_routes
  BEFORE UPDATE ON public.routes
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

ALTER TABLE public.routes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read published routes"
  ON public.routes FOR SELECT USING (status = 'published');

CREATE POLICY "Admins can manage routes"
  ON public.routes FOR ALL TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role)) WITH CHECK (has_role(auth.uid(), 'admin'::app_role));