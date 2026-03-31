DO $$ BEGIN
  CREATE TYPE public.package_type AS ENUM (
    'cultural', 'aventura', 'gastronomico', 'mixto'
  );
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE public.difficulty_level AS ENUM (
    'fácil', 'moderado', 'desafiante'
  );
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

CREATE TABLE public.packages (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  slug text NOT NULL UNIQUE,
  title text NOT NULL,
  title_en text,
  description text NOT NULL,
  description_en text,
  duration_days integer NOT NULL,
  price numeric NOT NULL,
  net_price numeric,
  currency text NOT NULL DEFAULT 'MXN',
  type public.package_type NOT NULL,
  difficulty public.difficulty_level NOT NULL DEFAULT 'fácil',
  group_size text,
  best_for text,
  best_for_en text,
  max_altitude integer,
  states text[] DEFAULT '{}',
  highlights text[] DEFAULT '{}',
  includes text[] DEFAULT '{}',
  excludes text[] DEFAULT '{}',
  itinerary jsonb DEFAULT '[]'::jsonb,
  seasonal_rating jsonb,
  rating numeric DEFAULT 0,
  reviews_count integer DEFAULT 0,
  featured_image text,
  gallery jsonb DEFAULT '[]'::jsonb,
  video_url text,
  wellet_code text,
  seo_title text,
  seo_description text,
  is_featured boolean NOT NULL DEFAULT false,
  sort_order integer NOT NULL DEFAULT 0,
  status public.content_status NOT NULL DEFAULT 'published',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_packages_type ON public.packages(type);
CREATE INDEX idx_packages_status ON public.packages(status);
CREATE INDEX idx_packages_price ON public.packages(price);
CREATE INDEX idx_packages_duration ON public.packages(duration_days);

CREATE TRIGGER set_updated_at_packages
  BEFORE UPDATE ON public.packages
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

ALTER TABLE public.packages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read published packages"
  ON public.packages FOR SELECT USING (status = 'published');

CREATE POLICY "Admins can manage packages"
  ON public.packages FOR ALL TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));