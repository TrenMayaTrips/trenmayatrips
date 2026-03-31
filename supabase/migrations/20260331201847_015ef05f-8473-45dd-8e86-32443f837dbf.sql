
CREATE TABLE public.blog_authors (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL UNIQUE,
  name_en text,
  role text,
  role_en text,
  bio text,
  bio_en text,
  initials text,
  photo text,
  linkedin text,
  twitter text,
  website text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TRIGGER set_updated_at_blog_authors
  BEFORE UPDATE ON public.blog_authors
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

ALTER TABLE public.blog_authors ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read blog_authors"
  ON public.blog_authors FOR SELECT USING (true);

CREATE POLICY "Admins can manage blog_authors"
  ON public.blog_authors FOR ALL TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role)) WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE TABLE public.blog_categories (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  slug text NOT NULL UNIQUE,
  label text NOT NULL,
  label_en text,
  emoji text,
  description text,
  description_en text,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TRIGGER set_updated_at_blog_categories
  BEFORE UPDATE ON public.blog_categories
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

ALTER TABLE public.blog_categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read blog_categories"
  ON public.blog_categories FOR SELECT USING (true);

CREATE POLICY "Admins can manage blog_categories"
  ON public.blog_categories FOR ALL TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role)) WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE TABLE public.blog_posts (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  slug text NOT NULL UNIQUE,
  title text NOT NULL,
  title_en text,
  excerpt text,
  excerpt_en text,
  category_id uuid REFERENCES public.blog_categories(id),
  category_slug text,
  author_id uuid REFERENCES public.blog_authors(id),
  author_name text,
  author_role text,
  published_at date,
  read_time integer,
  featured boolean NOT NULL DEFAULT false,
  tags text[] DEFAULT '{}',
  content text[] DEFAULT '{}',
  content_en text[],
  featured_image text,
  content_images jsonb DEFAULT '[]'::jsonb,
  seo_title text,
  seo_description text,
  sort_order integer NOT NULL DEFAULT 0,
  status public.content_status NOT NULL DEFAULT 'published',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_blog_posts_category ON public.blog_posts(category_slug);
CREATE INDEX idx_blog_posts_category_id ON public.blog_posts(category_id);
CREATE INDEX idx_blog_posts_status ON public.blog_posts(status);
CREATE INDEX idx_blog_posts_featured ON public.blog_posts(featured);
CREATE INDEX idx_blog_posts_published ON public.blog_posts(published_at DESC);

CREATE TRIGGER set_updated_at_blog_posts
  BEFORE UPDATE ON public.blog_posts
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read published blog_posts"
  ON public.blog_posts FOR SELECT USING (status = 'published');

CREATE POLICY "Admins can manage blog_posts"
  ON public.blog_posts FOR ALL TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role)) WITH CHECK (has_role(auth.uid(), 'admin'::app_role));
