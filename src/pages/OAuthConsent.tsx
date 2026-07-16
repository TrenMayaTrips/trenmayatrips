import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";

// Beta auth.oauth namespace typing shim
type OAuthClient = { name?: string; redirect_uri?: string };
type AuthorizationDetails = {
  client?: OAuthClient;
  scope?: string;
  redirect_url?: string;
  redirect_to?: string;
};
type OAuthAuth = {
  getAuthorizationDetails: (id: string) => Promise<{ data: AuthorizationDetails | null; error: { message: string } | null }>;
  approveAuthorization: (id: string) => Promise<{ data: { redirect_url?: string; redirect_to?: string } | null; error: { message: string } | null }>;
  denyAuthorization: (id: string) => Promise<{ data: { redirect_url?: string; redirect_to?: string } | null; error: { message: string } | null }>;
};

const OAuthConsent = () => {
  const [params] = useSearchParams();
  const authorizationId = params.get("authorization_id") ?? "";
  const [details, setDetails] = useState<AuthorizationDetails | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    let active = true;
    (async () => {
      if (!authorizationId) {
        setError("Falta authorization_id en la URL.");
        return;
      }
      const { data: sess } = await supabase.auth.getSession();
      if (!sess.session) {
        const next = window.location.pathname + window.location.search;
        window.location.href = "/login?next=" + encodeURIComponent(next);
        return;
      }
      const oauth = (supabase.auth as unknown as { oauth: OAuthAuth }).oauth;
      const { data, error } = await oauth.getAuthorizationDetails(authorizationId);
      if (!active) return;
      if (error) {
        setError(error.message);
        return;
      }
      const immediate = data?.redirect_url ?? data?.redirect_to;
      if (immediate && !data?.client) {
        window.location.href = immediate;
        return;
      }
      setDetails(data);
    })();
    return () => {
      active = false;
    };
  }, [authorizationId]);

  const decide = async (approve: boolean) => {
    setBusy(true);
    const oauth = (supabase.auth as unknown as { oauth: OAuthAuth }).oauth;
    const { data, error } = approve
      ? await oauth.approveAuthorization(authorizationId)
      : await oauth.denyAuthorization(authorizationId);
    if (error) {
      setBusy(false);
      setError(error.message);
      return;
    }
    const target = data?.redirect_url ?? data?.redirect_to;
    if (!target) {
      setBusy(false);
      setError("El servidor de autorización no devolvió una URL de retorno.");
      return;
    }
    window.location.href = target;
  };

  if (error) {
    return (
      <main className="min-h-screen flex items-center justify-center p-6 bg-secondary">
        <div className="max-w-md w-full bg-card border border-border rounded-xl p-6">
          <h1 className="font-heading text-xl font-bold text-foreground mb-2">No se pudo cargar la autorización</h1>
          <p className="text-sm text-muted-foreground">{error}</p>
        </div>
      </main>
    );
  }

  if (!details) {
    return (
      <main className="min-h-screen flex items-center justify-center p-6 bg-secondary">
        <p className="text-muted-foreground">Cargando…</p>
      </main>
    );
  }

  const clientName = details.client?.name ?? "una app";

  return (
    <main className="min-h-screen flex items-center justify-center p-6 bg-secondary">
      <div className="max-w-md w-full bg-card border border-border rounded-xl p-6 shadow-sm">
        <h1 className="font-heading text-2xl font-bold text-foreground mb-2">
          Conectar {clientName} a tu cuenta
        </h1>
        <p className="text-sm text-muted-foreground mb-4">
          {clientName} podrá usar las herramientas de Tren Maya Trips mientras estés autenticado.
        </p>
        {details.scope && (
          <p className="text-xs text-muted-foreground mb-4">
            Permisos solicitados: <span className="font-mono">{details.scope}</span>
          </p>
        )}
        <p className="text-xs text-muted-foreground mb-6">
          Esto no anula las políticas de acceso a datos de la app.
        </p>
        <div className="flex gap-3">
          <Button onClick={() => decide(true)} disabled={busy} className="flex-1">
            Autorizar
          </Button>
          <Button onClick={() => decide(false)} disabled={busy} variant="outline" className="flex-1">
            Cancelar
          </Button>
        </div>
      </div>
    </main>
  );
};

export default OAuthConsent;