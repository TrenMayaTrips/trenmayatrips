# CLAUDE.md — Tren Maya Trips (TMT)

## Qué es este proyecto
Tren Maya Trips es un **operador turístico digital**: compra inventario (tours, hoteles) a operadores locales a tarifa neta, vende a precio público y retiene el margen (20–30%). No es un negocio de generación de leads. Dos flujos de conversión: reserva directa de tours individuales vía **Wellet** (motor de pagos sobre Stripe) y cotización personalizada de circuitos/paquetes (visitante → lead → seguimiento de agente).

Sitio público en español (es-MX), enfocado 100% en la ruta del Tren Maya.

## Regla de oro del contenido
- **Todo el contenido se limita a los 5 estados de la ruta**: Quintana Roo, Yucatán, Campeche, Tabasco y Chiapas (ENUM `tmt_state`). Contenido de otros estados queda explícitamente excluido.
- **Separación estricta**: contenido dinámico vive en Supabase y se gestiona vía admin (sin tocar código); cambios estructurales/diseño viven en este repo. Nunca hardcodear contenido de catálogo en componentes.
- El sistema Tren Maya: 34 paradas (20 estaciones principales, 14 secundarias), 7 tramos, 3 clases de servicio: **Xiinbal, Janal y P'atal**.

## Stack
- **Frontend**: React + Vite + TypeScript + Tailwind (origen Lovable; hosting en Vercel; deploy automático por push a `main`, previews por rama).
- **Backend**: Supabase propio — proyecto `tmt-production` (ref `wgijpnnkjychxbnduqox`, org TrenMayaTrips). Única fuente de verdad del contenido.
- **Cliente Supabase**: `src/integrations/supabase/client.ts` (autogenerado — NO editar). Config vía variables `VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY`, `VITE_SUPABASE_PROJECT_ID` (`.env` local / env vars en Vercel; las de Vercel tienen prioridad).
- **Edge functions** (Supabase): `send-contact`, `subscribe-newsletter`, `save-itinerary`, `mcp`. Solo usan secrets automáticos de Supabase. Si se integra email real (Resend/SendGrid) habrá que añadir su API key como secret.
- **Pagos**: Wellet — widgets por producto y links de pago para circuitos, del lado cliente.
- **CRM**: HubSpot Starter (leads). **Ads**: Google AdSense en el blog (3 posiciones, componente `AdPlaceholder`).
- **Admin/back-office**: Softr Professional (planeado) conectado a la misma base.

## Base de datos — 16 tablas en `public`
Catálogo: `experiences`, `experience_categories`, `experience_subcategories`, `destinations`, `packages`, `routes`, `stations` (34), `states_info` (5), `wagon_classes` (3).
Blog: `blog_posts`, `blog_authors`, `blog_categories`.
Captación: `contact_messages`, `newsletter_subscribers`, `saved_itineraries`.
Roles: `user_roles`.

- **ENUMs reutilizables**: `tmt_state`, `content_status`, `app_role`, `destination_type`, `difficulty_level`, `package_type`, `station_type`.
- **Seguridad**: RLS en todas las tablas (30 políticas). Lectura pública (`anon`) para catálogo y blog publicado; escrituras de formularios pasan por edge functions con service role; roles vía función `has_role()` con `SECURITY DEFINER` (nunca `USING (true)`).
- Los warnings del linter `pg_graphql_anon_table_exposed` en tablas de catálogo son **esperados** (sitio público).

## Convenciones y aprendizajes (respetar siempre)
1. **Migraciones**: archivos en `supabase/migrations/`; se ejecutan en el SQL Editor de tmt-production o vía Supabase MCP **con aprobación explícita por cada escritura**. Nunca contra producción sin revisión previa del SQL.
2. **ENUMs nuevos**: patrón idempotente `DO $$ BEGIN ... EXCEPTION WHEN duplicate_object THEN NULL; END $$;`.
3. **React hooks**: todos los hooks antes de cualquier `return` condicional (bug histórico resuelto en `RutaDetalle.tsx`: "Rendered more hooks than during the previous render").
4. **SEO es crítico**: hay tráfico orgánico real. No cambiar URLs/slugs existentes sin redirect 301. El routing SPA depende del rewrite a `index.html` en `vercel.json` — no eliminarlo.
5. **`.env` solo lleva claves públicas** (publishable/anon). Jamás comitear service role keys ni secrets.
6. **Identidad visual**: elementos mayas auténticos (greca escalonada, estera Pop, estelas, códices) y litografías de Catherwood como texturas sutiles. Briefs de diseño inspiracionales, no prescriptivos.
7. Ante discrepancias de datos, los archivos fuente y la base verificada son autoritativos; no confiar en conteos indirectos.

## Flujo de trabajo
- Rama → cambios → push → preview deploy en Vercel → revisión visual → merge a `main` → producción.
- Cambios de **datos/contenido** → Supabase (admin/SQL), sin commits. Cambios de **estructura/diseño** → este repo.
- Historia: el proyecto nació en Lovable (que sigue sincronizado con este repo); la migración de Lovable Cloud a Supabase propio se completó el 17-jul-2026 con verificación tabla por tabla (132 filas).

## Comandos
```bash
npm install      # dependencias
npm run dev      # desarrollo local
npm run build    # build de producción (dist/)
```
