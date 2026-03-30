
-- 1. Create ENUM for states
DO $$ BEGIN
  CREATE TYPE public.tmt_state AS ENUM (
    'quintana_roo', 'yucatan', 'campeche', 'tabasco', 'chiapas'
  );
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- 2. Create ENUM for content status
DO $$ BEGIN
  CREATE TYPE public.content_status AS ENUM (
    'draft', 'published', 'paused'
  );
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- 3. experience_categories
CREATE TABLE public.experience_categories (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  slug text NOT NULL UNIQUE,
  name text NOT NULL,
  name_en text,
  icon text,
  description text,
  description_en text,
  hero_headline text,
  hero_headline_en text,
  hero_description text,
  hero_description_en text,
  experience_category_key text NOT NULL,
  featured_image text,
  faq_cultural jsonb DEFAULT '[]'::jsonb,
  faq_tips jsonb DEFAULT '[]'::jsonb,
  sort_order integer NOT NULL DEFAULT 0,
  status public.content_status NOT NULL DEFAULT 'published',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_categories_status ON public.experience_categories(status);
CREATE INDEX idx_categories_sort ON public.experience_categories(sort_order);

-- 4. experience_subcategories
CREATE TABLE public.experience_subcategories (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  slug text NOT NULL,
  category_id uuid NOT NULL REFERENCES public.experience_categories(id) ON DELETE CASCADE,
  name text NOT NULL,
  name_en text,
  icon text,
  description text,
  description_en text,
  hero_description text,
  hero_description_en text,
  featured_image text,
  sort_order integer NOT NULL DEFAULT 0,
  status public.content_status NOT NULL DEFAULT 'published',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(category_id, slug)
);

CREATE INDEX idx_subcategories_category ON public.experience_subcategories(category_id);
CREATE INDEX idx_subcategories_status ON public.experience_subcategories(status);

-- 5. Auto-update updated_at trigger
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_updated_at_categories
  BEFORE UPDATE ON public.experience_categories
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER set_updated_at_subcategories
  BEFORE UPDATE ON public.experience_subcategories
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- 6. Row Level Security
ALTER TABLE public.experience_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.experience_subcategories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read published categories"
  ON public.experience_categories
  FOR SELECT
  USING (status = 'published');

CREATE POLICY "Public can read published subcategories"
  ON public.experience_subcategories
  FOR SELECT
  USING (status = 'published');

CREATE POLICY "Admins can manage categories"
  ON public.experience_categories
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Admins can manage subcategories"
  ON public.experience_subcategories
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);
