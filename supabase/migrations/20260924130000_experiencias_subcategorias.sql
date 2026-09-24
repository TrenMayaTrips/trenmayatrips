-- Relación experiencia ↔ subcategoría (muchos a muchos).
-- Una experiencia puede pertenecer a varias subcategorías (p. ej. catamarán: snorkel y deportes acuáticos).
-- La alimentan el admin o el SQL de datos; la leen el sitio, la sincronización con Framer y cualquier API o agente.
-- Propuesta de datos para llenarla: docs/framer/propuesta-relaciones.md (se aplica aparte, con aprobación).

CREATE TABLE IF NOT EXISTS public.experience_subcategory_links (
  experience_id uuid NOT NULL REFERENCES public.experiences(id) ON DELETE CASCADE,
  subcategory_id uuid NOT NULL REFERENCES public.experience_subcategories(id) ON DELETE CASCADE,
  created_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (experience_id, subcategory_id)
);

CREATE INDEX IF NOT EXISTS experience_subcategory_links_subcategory_idx
  ON public.experience_subcategory_links (subcategory_id);

ALTER TABLE public.experience_subcategory_links ENABLE ROW LEVEL SECURITY;

-- Lectura pública solo cuando la experiencia y la subcategoría están publicadas.
DROP POLICY IF EXISTS "Public can read published experience subcategory links" ON public.experience_subcategory_links;
CREATE POLICY "Public can read published experience subcategory links"
  ON public.experience_subcategory_links
  FOR SELECT
  USING (
    EXISTS (SELECT 1 FROM public.experiences e WHERE e.id = experience_id AND e.status = 'published')
    AND EXISTS (SELECT 1 FROM public.experience_subcategories s WHERE s.id = subcategory_id AND s.status = 'published')
  );

DROP POLICY IF EXISTS "Admins can manage experience subcategory links" ON public.experience_subcategory_links;
CREATE POLICY "Admins can manage experience subcategory links"
  ON public.experience_subcategory_links
  FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));
