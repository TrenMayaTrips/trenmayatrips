
DO $$ BEGIN
  CREATE TYPE public.destination_type AS ENUM (
    'ciudad', 'arqueologia', 'naturaleza', 'playa', 'pueblo'
  );
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

CREATE TABLE public.states_info (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  slug text NOT NULL UNIQUE,
  name text NOT NULL,
  name_en text,
  emoji text,
  color text,
  capital text,
  tagline text,
  tagline_en text,
  featured_image text,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TRIGGER set_updated_at_states_info
  BEFORE UPDATE ON public.states_info
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

ALTER TABLE public.states_info ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read states_info"
  ON public.states_info FOR SELECT USING (true);

CREATE POLICY "Admins can manage states_info"
  ON public.states_info FOR ALL TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role)) WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE TABLE public.destinations (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  slug text NOT NULL UNIQUE,
  name text NOT NULL,
  name_en text,
  state public.tmt_state NOT NULL,
  state_label text NOT NULL,
  type public.destination_type NOT NULL,
  tagline text,
  tagline_en text,
  description text,
  description_en text,
  highlights text[] DEFAULT '{}',
  nearest_station_id uuid REFERENCES public.stations(id),
  nearest_station_name text,
  travel_time text,
  best_months text,
  emoji text,
  featured_image text,
  gallery jsonb DEFAULT '[]'::jsonb,
  video_url text,
  seo_title text,
  seo_description text,
  sort_order integer NOT NULL DEFAULT 0,
  status public.content_status NOT NULL DEFAULT 'published',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_destinations_state ON public.destinations(state);
CREATE INDEX idx_destinations_type ON public.destinations(type);
CREATE INDEX idx_destinations_status ON public.destinations(status);

CREATE TRIGGER set_updated_at_destinations
  BEFORE UPDATE ON public.destinations
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

ALTER TABLE public.destinations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read published destinations"
  ON public.destinations FOR SELECT USING (status = 'published');

CREATE POLICY "Admins can manage destinations"
  ON public.destinations FOR ALL TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role)) WITH CHECK (has_role(auth.uid(), 'admin'::app_role));
