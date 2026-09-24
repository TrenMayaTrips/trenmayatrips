-- Relación experiencia ↔ destinos (muchos a muchos).
-- El destino es el lugar donde ocurre la experiencia; una experiencia puede ocurrir en varios
-- (p. ej. Cobá y Tulum). `experiences.destination_id` se conserva como destino principal
-- por compatibilidad; esta tabla es la relación completa.

CREATE TABLE IF NOT EXISTS public.experience_destination_links (
  experience_id uuid NOT NULL REFERENCES public.experiences(id) ON DELETE CASCADE,
  destination_id uuid NOT NULL REFERENCES public.destinations(id) ON DELETE CASCADE,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (experience_id, destination_id)
);

CREATE INDEX IF NOT EXISTS experience_destination_links_destination_idx
  ON public.experience_destination_links (destination_id);

ALTER TABLE public.experience_destination_links ENABLE ROW LEVEL SECURITY;

-- Lectura pública solo cuando la experiencia y el destino están publicados.
DROP POLICY IF EXISTS "Public can read published experience destination links" ON public.experience_destination_links;
CREATE POLICY "Public can read published experience destination links"
  ON public.experience_destination_links
  FOR SELECT
  USING (
    EXISTS (SELECT 1 FROM public.experiences e WHERE e.id = experience_id AND e.status = 'published')
    AND EXISTS (SELECT 1 FROM public.destinations d WHERE d.id = destination_id AND d.status = 'published')
  );

DROP POLICY IF EXISTS "Admins can manage experience destination links" ON public.experience_destination_links;
CREATE POLICY "Admins can manage experience destination links"
  ON public.experience_destination_links
  FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));
