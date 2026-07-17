# Plan: Migrar de Lovable Cloud a Supabase externo

Objetivo: mover el backend actual (Lovable Cloud, ref `vvbpzfygfebkjfeeylos`) a tu proyecto Supabase externo, con todos los datos, RLS, edge functions, secretos y auth, para que administres todo desde el dashboard de supabase.com.

## 1. Exportar desde Lovable Cloud

1. En el panel actual: **Cloud → Advanced settings → Export data**. Lovable prepara un dump completo (esquema + datos + policies + roles) y te avisa cuando esté listo.
2. Descargar el archivo `.sql` / `.dump` resultante.
3. En paralelo, listar todo lo que hay que replicar manualmente fuera del dump:
   - Edge Functions: `mcp`, y cualquier otra bajo `supabase/functions/*`.
   - Secretos runtime (los que aparecen en `fetch_secrets`): `LOVABLE_API_KEY`, keys de Stripe si aplica, etc.
   - Buckets de Storage y sus políticas.
   - Providers de Auth activos (Email, Google) y sus redirect URLs.
   - Cron jobs / triggers si existen.

## 2. Preparar el Supabase externo

En tu proyecto de supabase.com:

1. Confirmar región y plan.
2. En **SQL editor**, restaurar el dump (o vía `psql`/`pg_restore` desde tu máquina).
3. Verificar que se recrearon: tablas `public.*` (blog_*, routes, wagon_classes, experiences, destinations, packages, user_roles, profiles, etc.), tipos enum (`app_role`), funciones (`has_role`, triggers `updated_at`), y policies RLS.
4. Verificar GRANTs a `anon`, `authenticated`, `service_role` para cada tabla (Supabase externo también requiere grants explícitos).
5. Recrear buckets de Storage y subir/copiar los archivos existentes.
6. **Auth**: en Authentication → Providers, activar Email + Google con las mismas credenciales OAuth. Configurar Site URL y redirect URLs (`http://localhost:8080`, preview, producción).
7. **Users**: si quieres conservar cuentas existentes, exportar `auth.users` desde Cloud e importar (requiere script server-side con service_role — te guío cuando lleguemos aquí).

## 3. Cambiar el proyecto de Lovable a "Supabase externo"

Aquí hay una decisión importante: **Lovable Cloud y "Supabase conectado externamente" son mutuamente excluyentes en un mismo proyecto**. Para pasar de uno al otro hay dos caminos:

- **A. Desactivar Lovable Cloud y conectar tu Supabase externo** en este mismo proyecto Lovable. Es el flujo esperado; se hace desde el panel Cloud. Esto reemplaza `.env` (`VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY`, `VITE_SUPABASE_PROJECT_ID`) por los de tu proyecto externo, y a partir de ese momento el editor pierde las vistas gestionadas de Cloud (tablas/logs se ven en supabase.com).
- **B. Remix del proyecto** y conectar el Supabase externo en el remix, dejando el actual con Lovable Cloud intacto como backup. Recomendado hasta validar que todo funciona.

Recomiendo **B** como paso intermedio: hacemos el switch en un remix, validamos, y solo entonces apagamos Cloud en el original (o lo dejamos como fallback).

## 4. Reconfigurar el código del proyecto

Una vez conectado el Supabase externo:

1. Confirmar que `src/integrations/supabase/client.ts` toma las nuevas envs (no hardcodear nada del ref viejo).
2. Regenerar `src/integrations/supabase/types.ts` contra el nuevo proyecto.
3. Redeployar edge functions al nuevo proyecto (`supabase functions deploy mcp ...`). El endpoint MCP cambiará a `https://<nuevo-ref>.supabase.co/functions/v1/mcp` — hay que actualizar cualquier cliente externo (ChatGPT/Claude) que ya lo hubiera registrado.
4. Volver a cargar secretos runtime en el nuevo proyecto (Supabase dashboard → Edge Functions → Secrets).
5. Reconfigurar el OAuth server MCP en el nuevo proyecto si quieres seguir usando integraciones MCP con OAuth.
6. Actualizar redirect URLs de Google OAuth en Google Cloud Console para incluir el callback del nuevo Supabase.

## 5. Validación

- `useRoutes`, `useWagonClasses`, `useBlog`, `useExperiences`, `useDestinations` devuelven datos idénticos.
- Login Email + Google funciona; sesión persiste; RLS filtra correctamente (`user_roles`, `has_role`).
- Contacto / formularios que escriben datos siguen funcionando.
- Edge function `mcp` responde en el nuevo endpoint.
- Storage sirve las imágenes correctamente.

## 6. Corte y limpieza

- Cuando la versión con Supabase externo esté validada y publicada, decidir si desactivar Lovable Cloud en el proyecto original.
- Rotar cualquier secreto expuesto durante la migración.

---

## Detalles técnicos y riesgos

- **Passwords de usuarios**: Supabase almacena hashes bcrypt; migrar `auth.users` conserva contraseñas si copias correctamente `encrypted_password`. Se hace con un script one-shot usando la service_role key del proyecto destino.
- **IDs**: los `auth.users.id` (UUIDs) se preservan, por lo que las FKs a `user_id` en `public.*` siguen siendo válidas si migras ambos en orden (users → tablas públicas).
- **Extensiones**: verificar que el nuevo proyecto tiene habilitadas las mismas extensiones (`pgcrypto`, `uuid-ossp`, `pgmq` si se usa, etc.) antes de restaurar.
- **Endpoint MCP**: cambia. Cualquier cliente MCP ya conectado deberá re-registrarse.
- **URL de Supabase**: pasa de `*.lovable.cloud`/`*.supabase.co` gestionado a tu propio `*.supabase.co`. Actualizar CORS, allowed origins y redirect URLs.
- **Costos**: dejas de consumir crédito Lovable Cloud; empiezas a pagar tu plan de Supabase directamente.

## Qué necesito de ti para arrancar

1. Confirmar si prefieres **A** (in-place) o **B** (remix como staging). Recomiendo B.
2. El **project ref** de tu Supabase externo (empieza con letras/números tipo `abcdefghij...`).
3. Confirmar si quieres migrar también `auth.users` (usuarios existentes) o si arrancas con base de usuarios vacía.

Con eso guío el export, el import, el switch de conexión y la revalidación paso a paso.
