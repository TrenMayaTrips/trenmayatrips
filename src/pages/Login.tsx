import { useState, useEffect } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
import PageLayout from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

function safeNext(nextRaw: string | null): string {
  if (!nextRaw) return "/";
  try {
    const decoded = decodeURIComponent(nextRaw);
    if (decoded.startsWith("/") && !decoded.startsWith("//")) return decoded;
  } catch {}
  return "/";
}

const Login = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const next = safeNext(params.get("next"));
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate(next, { replace: true });
    });
  }, [navigate, next]);

  const handleGoogle = async () => {
    setLoading(true);
    const returnTo = `${window.location.origin}/login?next=${encodeURIComponent(next)}`;
    const result = await lovable.auth.signInWithOAuth("google", { redirect_uri: returnTo });
    if (result.error) {
      toast({ title: "Error", description: result.error.message, variant: "destructive" });
      setLoading(false);
      return;
    }
    if (result.redirected) return;
    navigate(next, { replace: true });
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: `${window.location.origin}/login?next=${encodeURIComponent(next)}` },
        });
        if (error) throw error;
        toast({ title: "Cuenta creada", description: "Revisa tu correo para confirmar." });
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        navigate(next, { replace: true });
      }
    } catch (err) {
      toast({
        title: "Error",
        description: err instanceof Error ? err.message : "Algo salió mal",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-16 max-w-md">
        <h1 className="font-heading text-3xl font-bold mb-2 text-foreground">
          {mode === "signin" ? "Inicia sesión" : "Crea tu cuenta"}
        </h1>
        <p className="text-muted-foreground mb-6 text-sm">
          Accede a tus itinerarios guardados y conecta apps externas.
        </p>

        <Button
          variant="outline"
          className="w-full mb-4"
          onClick={handleGoogle}
          disabled={loading}
        >
          Continuar con Google
        </Button>

        <div className="flex items-center gap-3 my-4">
          <div className="flex-1 h-px bg-border" />
          <span className="text-xs text-muted-foreground">o</span>
          <div className="flex-1 h-px bg-border" />
        </div>

        <form onSubmit={handleEmailAuth} className="space-y-3">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div>
            <Label htmlFor="password">Contraseña</Label>
            <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={8} />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {mode === "signin" ? "Iniciar sesión" : "Registrarme"}
          </Button>
        </form>

        <button
          type="button"
          onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
          className="mt-4 text-sm text-primary hover:underline"
        >
          {mode === "signin" ? "¿No tienes cuenta? Regístrate" : "¿Ya tienes cuenta? Inicia sesión"}
        </button>
      </div>
    </PageLayout>
  );
};

export default Login;