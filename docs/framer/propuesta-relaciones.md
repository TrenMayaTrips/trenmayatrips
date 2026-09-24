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

**Regla:** el destino es el lugar donde ocurre la experiencia, no la ciudad de salida ni la más cercana. Si el lugar no existe en la base, se crea como destino propio de su estado.

| Experiencia | Destino propuesto | Motivo |
|---|---|---|
| `ek-balam-valladolid` | `valladolid` | El recorrido termina en Valladolid |
| `amanecer-maya-uxmal` | `uxmal` (destino nuevo) | Uxmal es un lugar propio de Yucatán, no parte de Mérida |
| `cenotes-homun` | `homun` (destino nuevo) | Homún es un lugar propio de Yucatán, no parte de Mérida |
| `snorkel-arrecife` | ❓ | Ocurre en Puerto Aventuras (Quintana Roo), que no es destino en la base. ¿Destino nuevo `puerto-aventuras`? |
| `palenque-agua-azul` | `palenque` | Sale de Palenque |
| `calakmul-biosfera` | `calakmul` | |
| `bacalar-laguna` | `bacalar` | |
| `temazcal-selva` | — ❓ | "Selva de Chiapas", sin lugar exacto. ¿Palenque o San Cristóbal? |
| `catamaran-isla-mujeres` | ❓ | Ocurre en Isla Mujeres (Quintana Roo); Cancún es solo la salida. ¿Destino nuevo `isla-mujeres`? |
| `coba-tulum-cenote` | `tulum` | |
| `cochinita-pibil-workshop` | `merida` | Mercado local de Mérida |
| `ruta-del-cacao` | `comalcalco` ❓ | Visita Comalcalco; sale de Villahermosa |

**Destinos nuevos.** Se crean `uxmal` y `homun` en Yucatán, en estado `draft`. Mientras estén en borrador no aparecen en el sitio ni en Framer, y las dos experiencias se muestran sin destino. Para publicarlos faltan datos que no se inventan:

| Destino | Tipo propuesto | Falta |
|---|---|---|
| `uxmal` | `arqueologia` | Frase, descripción, imperdibles, mejores meses, estación más cercana ❓, tiempo de traslado y fotos |
| `homun` | `pueblo` ❓ (¿o `naturaleza`, por sus cenotes?) | Lo mismo |

**Pregunta de modelo:** una experiencia hoy tiene un solo destino, pero varias ocurren en más de un lugar: `coba-tulum-cenote` (Cobá y Tulum), `palenque-agua-azul` (Palenque y Cascadas de Agua Azul) y `ek-balam-valladolid` (Ek Balam y Valladolid). Para que escale, se recomienda una tabla de relación experiencia ↔ destinos, como la de subcategorías, en lugar de un solo `destination_id`. Mientras se decide, se propone un destino principal.

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

-- 0. Destinos nuevos (en borrador hasta completar su contenido)
INSERT INTO public.destinations (slug, name, state, state_label, type, status, sort_order)
VALUES
  ('uxmal', 'Uxmal', 'yucatan', 'Yucatán', 'arqueologia', 'draft', 17),
  ('homun', 'Homún', 'yucatan', 'Yucatán', 'pueblo', 'draft', 18)   -- ❓ tipo
ON CONFLICT (slug) DO NOTHING;

-- 1. Experiencia → destino
UPDATE public.experiences e SET destination_id = d.id
FROM (VALUES
  ('ek-balam-valladolid', 'valladolid'),
  ('amanecer-maya-uxmal', 'uxmal'),
  ('cenotes-homun', 'homun'),
  -- ('snorkel-arrecife', 'puerto-aventuras'), -- ❓ destino nuevo pendiente
  ('palenque-agua-azul', 'palenque'),
  ('calakmul-biosfera', 'calakmul'),
  ('bacalar-laguna', 'bacalar'),
  -- ('catamaran-isla-mujeres', 'isla-mujeres'), -- ❓ destino nuevo pendiente
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
