import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

// Valid destination slugs
const VALID_DESTINATIONS = new Set([
  "cancun", "tulum", "bacalar", "playa-del-carmen",
  "merida", "valladolid", "chichen-itza", "izamal",
  "campeche-ciudad", "calakmul", "edzna",
  "villahermosa", "comalcalco",
  "palenque", "san-cristobal", "cascadas-agua-azul",
]);

const VALID_TRIP_TYPES = new Set([
  "cultural", "aventura", "playa", "gastronomia", "romantico",
]);

// Rate limiter
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;
const RATE_LIMIT_MAX = 10;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }
  entry.count++;
  return entry.count > RATE_LIMIT_MAX;
}

function jsonRes(body: Record<string, unknown>, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    if (isRateLimited(ip)) {
      return jsonRes({ error: "Demasiadas solicitudes. Intenta más tarde." }, 429);
    }

    const body = await req.json();
    const { trip_type, duration, destinations, lodging, total_cost } = body;

    // Validate trip_type
    if (!trip_type || typeof trip_type !== "string" || !VALID_TRIP_TYPES.has(trip_type)) {
      return jsonRes({ error: "Tipo de viaje no válido" }, 400);
    }

    // Validate duration
    if (typeof duration !== "number" || !Number.isInteger(duration) || duration < 1 || duration > 30) {
      return jsonRes({ error: "Duración no válida (1-30 días)" }, 400);
    }

    // Validate destinations is array of valid slugs
    if (!Array.isArray(destinations) || destinations.length < 2 || destinations.length > 10) {
      return jsonRes({ error: "Se requieren entre 2 y 10 destinos" }, 400);
    }
    for (const d of destinations) {
      if (typeof d !== "string" || !VALID_DESTINATIONS.has(d)) {
        return jsonRes({ error: `Destino no válido: ${String(d).slice(0, 50)}` }, 400);
      }
    }

    // Validate lodging is object with string values for known destinations
    if (!lodging || typeof lodging !== "object" || Array.isArray(lodging)) {
      return jsonRes({ error: "Formato de alojamiento no válido" }, 400);
    }
    const lodgingEntries = Object.entries(lodging as Record<string, unknown>);
    if (lodgingEntries.length > 10) {
      return jsonRes({ error: "Demasiadas entradas de alojamiento" }, 400);
    }
    for (const [key, val] of lodgingEntries) {
      if (typeof key !== "string" || key.length > 100 || typeof val !== "string" || (val as string).length > 100) {
        return jsonRes({ error: "Datos de alojamiento no válidos" }, 400);
      }
    }

    // Validate total_cost
    if (typeof total_cost !== "number" || total_cost < 0 || total_cost > 1_000_000) {
      return jsonRes({ error: "Costo total no válido" }, 400);
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const { data, error } = await supabase
      .from("saved_itineraries")
      .insert({
        trip_type,
        duration,
        destinations,
        lodging,
        total_cost,
      })
      .select("short_code")
      .single();

    if (error) {
      console.error("DB error code:", error.code || "unknown");
      return jsonRes({ error: "Error al guardar el itinerario" }, 500);
    }

    return jsonRes({ success: true, short_code: data.short_code });
  } catch {
    return jsonRes({ error: "Error interno del servidor" }, 500);
  }
});
