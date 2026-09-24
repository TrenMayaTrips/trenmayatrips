# Propuesta de relaciones del catálogo

**Estado:** propuesta, sin aplicar. Joel revisa las tablas, corrige lo que haga falta y aprueba. Después se corre el SQL en el SQL Editor de `tmt-production`: primero la migración `20260924130000_experiencias_subcategorias.sql` y luego el SQL de datos de abajo.

**Por qué:** hoy la base no relaciona experiencias con destinos ni con subcategorías, y los destinos solo tienen el nombre de su estación, no la relación. Sin estas relaciones, varias secciones del sitio quedan vacías:

- experiencias en el destino;
- cómo llegar en tren desde una experiencia;
- listado por subcategoría;
- experiencias cerca de una estación.

Con ellas, cualquier canal (el sitio en Framer, una API, un agente o una app) puede leer las relaciones directo de Supabase.

Las filas marcadas con **❓** son dudas: la propuesta es razonable, pero la decide Joel.

## 1. Experiencia → destino (`experiences.destination_id`)

| Experiencia | Destino propuesto | Motivo |
|---|---|---|
| `ek-balam-valladolid` | `valladolid` | El recorrido termina en Valladolid |
| `amanecer-maya-uxmal` | `merida` ❓ | Sale de Mérida. Uxmal no es destino en la base; ¿agregarlo? |
| `cenotes-homun` | `merida` ❓ | Sale de Mérida. Homún no es destino en la base |
| `snorkel-arrecife` | `playa-del-carmen` ❓ | Check-in en Puerto Aventuras, entre Playa del Carmen y Tulum |
| `palenque-agua-azul` | `palenque` | Sale de Palenque |
| `calakmul-biosfera` | `calakmul` | |
| `bacalar-laguna` | `bacalar` | |
| `temazcal-selva` | — ❓ | "Selva de Chiapas", sin lugar exacto. ¿Palenque o San Cristóbal? |
| `catamaran-isla-mujeres` | `cancun` | Sale de Marina Cancún |
| `coba-tulum-cenote` | `tulum` | |
| `cochinita-pibil-workshop` | `merida` | Mercado local de Mérida |
| `ruta-del-cacao` | `comalcalco` ❓ | Visita Comalcalco; sale de Villahermosa |

**Pregunta de modelo:** una experiencia hoy tiene un solo destino. Si alguna recorre varios (por ejemplo Cobá y Tulum), conviene una tabla de relación como la de subcategorías. Por ahora se propone un destino principal.

## 2. Experiencia → subcategorías (tabla nueva `experience_subcategory_links`)

| Experiencia | Subcategorías propuestas |
|---|---|
| `ek-balam-valladolid` | `zonas-arqueologicas` |
| `amanecer-maya-uxmal` | `zonas-arqueologicas` |
| `cenotes-homun` | `cenotes-rios-subterraneos` |
| `snorkel-arrecife` | `snorkel-buceo` |
| `palenque-agua-azul` | `senderismo-selva` ❓ |
| `calakmul-biosfera` | `senderismo-selva`, `observacion-aves` ❓ |
| `bacalar-laguna` | `deportes-acuaticos` |
| `temazcal-selva` | `spas-temazcales`, `ceremonias-sanacion` |
| `catamaran-isla-mujeres` | `deportes-acuaticos`, `snorkel-buceo` |
| `coba-tulum-cenote` | `cenotes-rios-subterraneos` |
| `cochinita-pibil-workshop` | `clases-cocina-maya` |
| `ruta-del-cacao` | `experiencias-haciendas`, `catas-bebidas` ❓ |

Solo se propone la subcategoría si pertenece a la categoría de la experiencia. `palenque-agua-azul` y `coba-tulum-cenote` visitan zonas arqueológicas, pero están en la categoría Aventura; ¿se quedan ahí?

## 3. Destino → estación más cercana (`destinations.nearest_station_id`)

11 destinos ya tienen el nombre de su estación y solo falta guardar la relación. Estos 5 necesitan decisión:

| Destino | Nombre guardado hoy | Estación propuesta |
|---|---|---|
| `cancun` | Cancún Aeropuerto | `cancun` (su nombre completo es "Estación Cancún Aeropuerto") |
| `campeche-ciudad` | Campeche | `campeche` (San Francisco de Campeche) |
| `edzna` | Campeche | `campeche` ❓ Existe la estación `edzna`; ¿se usa esa? |
| `villahermosa` | Villahermosa | — ❓ No hay estación en Villahermosa. ¿Se deja vacío o se usa la más cercana de la ruta? |
| `comalcalco` | Villahermosa | — ❓ Igual que Villahermosa |

Nota: `chichen-itza` tiene guardado "Valladolid", pero existe la estación `chichen-itza`. ¿Se cambia?

## 4. SQL de datos (no aplicado)

Idempotente: se puede correr varias veces. Usa slugs, no ids internos. Las líneas con ❓ van comentadas hasta que Joel decida.

```sql
BEGIN;

-- 1. Experiencia → destino
UPDATE public.experiences e SET destination_id = d.id
FROM (VALUES
  ('ek-balam-valladolid', 'valladolid'),
  ('amanecer-maya-uxmal', 'merida'),        -- ❓
  ('cenotes-homun', 'merida'),              -- ❓
  ('snorkel-arrecife', 'playa-del-carmen'), -- ❓
  ('palenque-agua-azul', 'palenque'),
  ('calakmul-biosfera', 'calakmul'),
  ('bacalar-laguna', 'bacalar'),
  ('catamaran-isla-mujeres', 'cancun'),
  ('coba-tulum-cenote', 'tulum'),
  ('cochinita-pibil-workshop', 'merida'),
  ('ruta-del-cacao', 'comalcalco')          -- ❓
  -- ('temazcal-selva', '?')                -- ❓ pendiente
) AS m(experiencia, destino)
JOIN public.destinations d ON d.slug = m.destino
WHERE e.slug = m.experiencia;

-- 2. Experiencia → subcategorías
INSERT INTO public.experience_subcategory_links (experience_id, subcategory_id)
SELECT e.id, s.id
FROM (VALUES
  ('ek-balam-valladolid', 'zonas-arqueologicas'),
  ('amanecer-maya-uxmal', 'zonas-arqueologicas'),
  ('cenotes-homun', 'cenotes-rios-subterraneos'),
  ('snorkel-arrecife', 'snorkel-buceo'),
  ('palenque-agua-azul', 'senderismo-selva'),   -- ❓
  ('calakmul-biosfera', 'senderismo-selva'),
  ('calakmul-biosfera', 'observacion-aves'),    -- ❓
  ('bacalar-laguna', 'deportes-acuaticos'),
  ('temazcal-selva', 'spas-temazcales'),
  ('temazcal-selva', 'ceremonias-sanacion'),
  ('catamaran-isla-mujeres', 'deportes-acuaticos'),
  ('catamaran-isla-mujeres', 'snorkel-buceo'),
  ('coba-tulum-cenote', 'cenotes-rios-subterraneos'),
  ('cochinita-pibil-workshop', 'clases-cocina-maya'),
  ('ruta-del-cacao', 'experiencias-haciendas'),
  ('ruta-del-cacao', 'catas-bebidas')           -- ❓
) AS m(experiencia, subcategoria)
JOIN public.experiences e ON e.slug = m.experiencia
JOIN public.experience_subcategories s ON s.slug = m.subcategoria
ON CONFLICT DO NOTHING;

-- 3. Destino → estación: los 11 que ya tienen el nombre exacto de la estación
UPDATE public.destinations d SET nearest_station_id = s.id
FROM public.stations s
WHERE s.name = d.nearest_station_name AND d.nearest_station_id IS NULL;

-- 3b. Los que necesitan decisión
UPDATE public.destinations d SET nearest_station_id = s.id
FROM (VALUES
  ('cancun', 'cancun'),
  ('campeche-ciudad', 'campeche'),
  ('edzna', 'campeche')                     -- ❓ o 'edzna'
  -- ('villahermosa', '?'), ('comalcalco', '?')  -- ❓ pendiente
) AS m(destino, estacion)
JOIN public.stations s ON s.slug = m.estacion
WHERE d.slug = m.destino;

COMMIT;
```

**Después de aplicarlo:** corre `npm run framer:verificar`. Debe listar como diferencias los destinos de las experiencias y las subcategorías. Luego corre `npm run framer:sincronizar` para llevarlas a Framer.
