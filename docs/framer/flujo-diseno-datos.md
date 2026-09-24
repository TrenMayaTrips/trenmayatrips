# Flujo diseño ↔ datos

**Principio:** Framer crea la experiencia; Supabase (`tmt-production`) es el sistema propio que la alimenta. Todo dato que muestre el sitio vive primero en Supabase. Así lo pueden leer el sitio, una API, un agente o una app, sin depender de Framer.

```
Supabase (fuente de verdad) ──► contrato (scripts/framer/contrato.mjs) ──► CMS de Framer (copia) ──► páginas del sitio
      ▲                                                                                                     │
      └──────────── el diseño pide un dato nuevo ◄──────────────────────────────────────────────────────────┘
```

## Reglas

1. **El contenido no se edita en el CMS de Framer.** Si se edita ahí, la siguiente sincronización lo sobreescribe. Se edita en Supabase, desde el admin o con SQL.
2. **El diseño sí se edita en Framer:** páginas, componentes, estilos y a qué campo se conecta cada elemento.
3. **Cada campo del CMS existe en el contrato.** Un campo que solo existe en Framer no escala: no hay forma de llenarlo desde el sistema ni de leerlo desde otro canal.
4. **Los cambios de estructura en Supabase van por migración** (`supabase/migrations/`), con revisión del SQL y aprobación de Joel antes de aplicarse.
5. **Sin datos inventados.** Si el diseño necesita un dato que no existe, se marca `PENDIENTE` en el diseño hasta que esté en Supabase.

## Cuando el diseño necesita algo nuevo

| Caso | Qué se hace |
|---|---|
| **Mostrar un dato que ya está en Supabase** pero no en Framer | Se agrega el campo en `contrato.mjs` y se corre `npm run framer:sincronizar`. |
| **Mostrar un dato que no existe** (p. ej. insignias o "por qué elegir esta experiencia") | 1. Migración que crea la columna o tabla. 2. Aprobación y aplicación en Supabase. 3. Llenar los datos (admin o SQL). 4. Agregar el campo al contrato. 5. Sincronizar. 6. Conectar el campo en Framer. |
| **Relacionar dos cosas** (experiencia → destino, experiencia → subcategoría) | La relación se guarda en Supabase (columna o tabla de relación) y el contrato la convierte en un campo de referencia en Framer. |
| **Filtrar una lista por un campo de opción** | Framer no compara opciones con otros registros. Se agrega una referencia derivada en el contrato, como **Estado vinculado**, y se filtra por ella. |
| **Una foto nueva** | Se sube a Supabase Storage y su URL va en la columna de imagen (`featured_image`, `gallery`, etc.). La sincronización la sube a Framer. Las imágenes del repo solo son un respaldo temporal. |
| **Algo con lógica** (planificador, formularios, cuentas) | Vive en Supabase (tablas y funciones). Framer solo pone la interfaz: formularios que llaman a las funciones o componentes de código que leen la API. |

## Comandos

```bash
npm run framer:verificar      # compara Supabase con Framer y lista diferencias; no cambia nada
npm run framer:sincronizar    # aplica: crea campos y filas faltantes y actualiza valores
npm run framer:sincronizar -- --imagenes             # vuelve a subir imágenes
npm run framer:sincronizar -- --coleccion=Destinos   # solo una colección
npm run framer:sincronizar -- --eliminar-huerfanos   # borra filas que ya no están publicadas en Supabase
```

Requisitos: `.env` con las llaves públicas de Supabase y el proyecto de Framer autorizado en la máquina (`npx @framer/agent@latest project auth <url del proyecto>`).

## Qué hace la sincronización

- **Sentido único:** lee de Supabase y escribe en Framer.
- **Solo contenido publicado:** usa la llave pública, así que ve lo mismo que un visitante.
- **Aditiva:** crea colecciones, campos y filas que falten, y actualiza valores distintos. Si Framer renombra un campo, le regresa el nombre del contrato.
- **Conservadora:**
  - no cambia el tipo de un campo, solo lo reporta;
  - no borra filas salvo con `--eliminar-huerfanos`;
  - no reemplaza una imagen que ya existe salvo con `--imagenes`.

## Pendiente para que escale sin intervención

- **Sincronización automática.** Hoy se corre a mano desde una máquina con Framer autorizado. El siguiente paso es correrla sola cuando cambie Supabase (un disparador de la base o una tarea programada). Requiere una llave de API de Framer guardada como secreto.
- **Admin propio.** Se construye sobre la app actual, que ya tiene inicio de sesión, roles y conexión a Supabase, con los campos que el diseño P1 termine de definir.
- **Fotos en Supabase Storage.** Hoy ninguna tabla tiene fotos; todas salen del repo.
