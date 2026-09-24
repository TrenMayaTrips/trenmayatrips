-- Datos de MUESTRA para el mockup en Framer (24-sep-2026).
-- El contenido del catálogo es simulado y se reemplazará desde el admin. Este archivo solo llena
-- las relaciones para que las secciones del diseño se vean completas. Idempotente.
-- Requiere las migraciones 20260924130000_experiencias_subcategorias y 20260924140000_experiencias_destinos.

BEGIN;

-- 0. Lugares donde ocurren experiencias y que no existían como destino (en borrador: sin contenido).
INSERT INTO public.destinations (slug, name, state, state_label, type, status, sort_order) VALUES
  ('uxmal', 'Uxmal', 'yucatan', 'Yucatán', 'arqueologia', 'draft', 17),
  ('homun', 'Homún', 'yucatan', 'Yucatán', 'pueblo', 'draft', 18),
  ('isla-mujeres', 'Isla Mujeres', 'quintana_roo', 'Quintana Roo', 'playa', 'draft', 19),
  ('puerto-aventuras', 'Puerto Aventuras', 'quintana_roo', 'Quintana Roo', 'playa', 'draft', 20)
ON CONFLICT (slug) DO NOTHING;

-- 1. Experiencia ↔ destinos (el primero de cada experiencia es el principal)
INSERT INTO public.experience_destination_links (experience_id, destination_id, sort_order)
SELECT e.id, d.id, m.orden
FROM (VALUES
  ('ek-balam-valladolid', 'valladolid', 0),
  ('amanecer-maya-uxmal', 'uxmal', 0),
  ('cenotes-homun', 'homun', 0),
  ('snorkel-arrecife', 'puerto-aventuras', 0),
  ('palenque-agua-azul', 'palenque', 0),
  ('palenque-agua-azul', 'cascadas-agua-azul', 1),
  ('calakmul-biosfera', 'calakmul', 0),
  ('bacalar-laguna', 'bacalar', 0),
  ('catamaran-isla-mujeres', 'isla-mujeres', 0),
  ('coba-tulum-cenote', 'tulum', 0),
  ('cochinita-pibil-workshop', 'merida', 0),
  ('ruta-del-cacao', 'comalcalco', 0)
) AS m(experiencia, destino, orden)
JOIN public.experiences e ON e.slug = m.experiencia
JOIN public.destinations d ON d.slug = m.destino
ON CONFLICT (experience_id, destination_id) DO UPDATE SET sort_order = EXCLUDED.sort_order;

-- Destino principal = el de menor orden
UPDATE public.experiences e SET destination_id = l.destination_id
FROM (
  SELECT DISTINCT ON (experience_id) experience_id, destination_id
  FROM public.experience_destination_links ORDER BY experience_id, sort_order
) l
WHERE e.id = l.experience_id;

-- 2. Experiencia ↔ subcategorías
INSERT INTO public.experience_subcategory_links (experience_id, subcategory_id)
SELECT e.id, s.id
FROM (VALUES
  ('ek-balam-valladolid', 'zonas-arqueologicas'),
  ('amanecer-maya-uxmal', 'zonas-arqueologicas'),
  ('cenotes-homun', 'cenotes-rios-subterraneos'),
  ('snorkel-arrecife', 'snorkel-buceo'),
  ('palenque-agua-azul', 'senderismo-selva'),
  ('calakmul-biosfera', 'senderismo-selva'),
  ('calakmul-biosfera', 'observacion-aves'),
  ('bacalar-laguna', 'deportes-acuaticos'),
  ('temazcal-selva', 'spas-temazcales'),
  ('temazcal-selva', 'ceremonias-sanacion'),
  ('catamaran-isla-mujeres', 'deportes-acuaticos'),
  ('catamaran-isla-mujeres', 'snorkel-buceo'),
  ('coba-tulum-cenote', 'cenotes-rios-subterraneos'),
  ('cochinita-pibil-workshop', 'clases-cocina-maya'),
  ('ruta-del-cacao', 'experiencias-haciendas'),
  ('ruta-del-cacao', 'catas-bebidas')
) AS m(experiencia, subcategoria)
JOIN public.experiences e ON e.slug = m.experiencia
JOIN public.experience_subcategories s ON s.slug = m.subcategoria
ON CONFLICT DO NOTHING;

-- 3. Destino → estación más cercana
UPDATE public.destinations d SET nearest_station_id = s.id
FROM public.stations s
WHERE s.name = d.nearest_station_name AND d.nearest_station_id IS NULL;

UPDATE public.destinations d SET nearest_station_id = s.id
FROM (VALUES
  ('cancun', 'cancun'),
  ('campeche-ciudad', 'campeche'),
  ('edzna', 'edzna')
) AS m(destino, estacion)
JOIN public.stations s ON s.slug = m.estacion
WHERE d.slug = m.destino;

COMMIT;

-- Comprobación (no cambia nada)
SELECT
  (SELECT count(*) FROM public.experience_destination_links) AS enlaces_destino,
  (SELECT count(*) FROM public.experience_subcategory_links) AS enlaces_subcategoria,
  (SELECT count(*) FROM public.experiences WHERE destination_id IS NOT NULL) AS experiencias_con_destino,
  (SELECT count(*) FROM public.destinations WHERE nearest_station_id IS NOT NULL) AS destinos_con_estacion;
