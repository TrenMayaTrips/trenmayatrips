CREATE TABLE public.experiences (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  slug text NOT NULL UNIQUE,
  title text NOT NULL,
  title_en text,
  description text NOT NULL,
  description_en text,
  long_description text,
  long_description_en text,
  category_id uuid REFERENCES public.experience_categories(id),
  category_key text NOT NULL,
  destination_id uuid REFERENCES public.destinations(id),
  state public.tmt_state NOT NULL,
  state_label text NOT NULL,
  duration text NOT NULL,
  price numeric NOT NULL,
  net_price numeric,
  currency text NOT NULL DEFAULT 'MXN',
  group_size text,
  languages text[] DEFAULT '{}',
  rating numeric DEFAULT 0,
  reviews_count integer DEFAULT 0,
  includes text[] DEFAULT '{}',
  not_includes text[] DEFAULT '{}',
  recommendations text[] DEFAULT '{}',
  itinerary jsonb DEFAULT '[]'::jsonb,
  related_slugs text[] DEFAULT '{}',
  reviews_data jsonb DEFAULT '[]'::jsonb,
  rating_breakdown jsonb,
  rating_distribution jsonb,
  featured_image text,
  gallery jsonb DEFAULT '[]'::jsonb,
  video_url text,
  wellet_code text,
  provider_id uuid,
  seo_title text,
  seo_description text,
  is_featured boolean NOT NULL DEFAULT false,
  sort_order integer NOT NULL DEFAULT 0,
  status public.content_status NOT NULL DEFAULT 'published',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_experiences_category ON public.experiences(category_key);
CREATE INDEX idx_experiences_category_id ON public.experiences(category_id);
CREATE INDEX idx_experiences_state ON public.experiences(state);
CREATE INDEX idx_experiences_status ON public.experiences(status);
CREATE INDEX idx_experiences_price ON public.experiences(price);
CREATE INDEX idx_experiences_rating ON public.experiences(rating);

CREATE TRIGGER set_updated_at_experiences
  BEFORE UPDATE ON public.experiences
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

ALTER TABLE public.experiences ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read published experiences"
  ON public.experiences FOR SELECT USING (status = 'published');

CREATE POLICY "Admins can manage experiences"
  ON public.experiences FOR ALL TO authenticated
  USING (true) WITH CHECK (true);