
-- ENUM para tipo de estación
DO $$ BEGIN
  CREATE TYPE public.station_type AS ENUM (
    'principal', 'estacion', 'paradero'
  );
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- Tabla: stations
CREATE TABLE public.stations (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  slug text NOT NULL UNIQUE,
  name text NOT NULL,
  name_en text,
  full_name text,
  full_name_en text,
  subtitle text,
  subtitle_en text,
  state public.tmt_state NOT NULL,
  state_label text NOT NULL,
  km numeric NOT NULL DEFAULT 0,
  type public.station_type NOT NULL DEFAULT 'estacion',
  image text,
  schedule text,
  parking text,
  accessibility text,
  highlights text[] DEFAULT '{}',
  services jsonb DEFAULT '[]'::jsonb,
  connections jsonb DEFAULT '[]'::jsonb,
  nearby_destinations jsonb DEFAULT '[]'::jsonb,
  transport jsonb DEFAULT '[]'::jsonb,
  tips text[] DEFAULT '{}',
  seo_title text,
  seo_description text,
  has_detail_page boolean NOT NULL DEFAULT false,
  sort_order integer NOT NULL DEFAULT 0,
  status public.content_status NOT NULL DEFAULT 'published',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_stations_state ON public.stations(state);
CREATE INDEX idx_stations_type ON public.stations(type);
CREATE INDEX idx_stations_status ON public.stations(status);
CREATE INDEX idx_stations_km ON public.stations(km);

CREATE TRIGGER set_updated_at_stations
  BEFORE UPDATE ON public.stations
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

ALTER TABLE public.stations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read published stations"
  ON public.stations FOR SELECT USING (status = 'published');

CREATE POLICY "Admins can manage stations"
  ON public.stations FOR ALL TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));
