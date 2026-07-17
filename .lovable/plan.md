## Estado real del nuevo Supabase (tmt-production, `wgijpnnkjychxbnduqox`)

Verifiqué el proyecto conectado con `supabase--read_query`. Las 14 migraciones del folder `supabase/migrations/` ya corrieron automáticamente al conectar el proyecto, y el seed también está presente.

Tablas y filas confirmadas:

```text
routes                    5
wagon_classes             3
blog_authors              7
blog_categories           4
blog_posts                9
destinations             16
experiences              12
experience_categories     4
experience_subcategories 19
packages                  5
stations                 34
states_info               5
+ contact_messages, newsletter_subscribers, saved_itineraries, user_roles
```

**Conclusión:** no hay migraciones pendientes que aplicar. La opción "Aplicar todas las migraciones" que elegiste ya está cumplida por el pipeline de Lovable al conectar el proyecto externo.

## Qué falta realmente para completar el switch

Estas piezas NO se migran con SQL — requieren reconfiguración en dashboards / código:

### 1. Verificar Data-API GRANTs y RLS con el linter
Correr `supabase--linter` contra el nuevo proyecto para detectar tablas sin RLS, policies permisivas, o GRANTs faltantes que hubieran quedado fuera del replay de migraciones.

### 2. Smoke test end-to-end
Con Playwright headless contra `http://localhost:8080` (el `.env` ya apunta al nuevo proyecto):
- `/tren-maya` → hook `useWagonClasses` + `useRoutes` cargan las 3 clases y 5 rutas.
- `/blog` → `useBlog` lista los 9 posts.
- `/destinos`, `/experiencias`, `/paquetes` cargan sus catálogos.
- `/contacto` → edge function `send-contact` inserta en `contact_messages`.
- Newsletter form → edge function `subscribe-newsletter`.

### 3. Reconfigurar Google OAuth en el nuevo proyecto
En el dashboard de tmt-production → Authentication → Providers → Google:
- Pegar Client ID + Secret de Google Cloud.
- En Google Cloud console, agregar la nueva Authorized redirect URL: `https://wgijpnnkjychxbnduqox.supabase.co/auth/v1/callback`.
- Site URL y Redirect URLs en Auth → URL Configuration: agregar `https://trenmayatrips.lovable.app` y el preview URL.

### 4. Reapuntar el servidor MCP
El endpoint MCP cambia a `https://wgijpnnkjychxbnduqox.supabase.co/functions/v1/mcp`. Ya está codificado dinámicamente vía `VITE_SUPABASE_PROJECT_ID` en `src/lib/mcp/index.ts` y `supabase/functions/mcp/index.ts` se regenera al hacer build, así que solo hay que:
- Confirmar que la edge function `mcp` fue desplegada al nuevo proyecto (revisar dashboard → Edge Functions).
- Re-registrar cualquier cliente MCP externo (ChatGPT/Claude/Cursor) con el nuevo endpoint.

### 5. Secrets de edge functions
Verificar en el nuevo proyecto (Settings → Edge Functions Secrets) que existen los secrets que usan `send-contact`, `subscribe-newsletter`, `save-itinerary`, y `mcp`. Si falta alguno lo agrego con `add_secret`.

## Orden de ejecución que propongo

1. `supabase--linter` para detectar issues de RLS/GRANTs.
2. Playwright smoke test de los flujos públicos.
3. Reportar hallazgos y pedirte que hagas OAuth (paso 3) y verifiques secrets (paso 5) desde el dashboard — no puedo hacerlo yo.
4. Fix de cualquier issue del linter o del smoke test vía migraciones incrementales.

## Detalles técnicos

- El `.env` local ya tiene `VITE_SUPABASE_PROJECT_ID=wgijpnnkjychxbnduqox` (confirmado en la config).
- `supabase/config.toml` sigue con el project_id antiguo (`vvbpzfygfebkjfeeylos`). Lovable lo ignora al estar conectado a un Supabase externo, pero puedo actualizarlo para coherencia.
- `blog_posts` tiene 9 filas (los 15 slugs del brief original nunca existieron en `src/data/blog.ts` — ya se validó en una iteración anterior).

¿Apruebo este plan y arranco por el linter + smoke test?
