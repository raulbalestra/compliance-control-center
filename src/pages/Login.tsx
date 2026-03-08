import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/stores/AuthContext";
import { Bot, Eye, EyeOff } from "lucide-react";
import { DEMO_USERS } from "@/types";
import { useLanguage } from "@/i18n/LanguageContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const { locale } = useLanguage();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setTimeout(() => {
      const result = login(email, password);
      if (result.success) {
        const demo = DEMO_USERS.find(u => u.email === email);
        navigate(demo?.role === "provider" ? "/portal" : "/");
      } else {
        setError(locale === "pt-BR" ? "Credenciais inválidas" : "Invalid credentials");
      }
      setLoading(false);
    }, 600);
  };

  const roleLabels: Record<string, { en: string; pt: string }> = {
    admin: { en: "Administrator", pt: "Administrador" },
    coordinator: { en: "Coordinator", pt: "Coordenador" },
    analyst: { en: "Analyst", pt: "Analista" },
    provider: { en: "Provider", pt: "Fornecedor" },
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-xl bg-primary flex items-center justify-center mx-auto">
            <Bot className="w-7 h-7 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">ICA Platform</h1>
          <p className="text-sm text-muted-foreground">
            {locale === "pt-BR" ? "Agente Inteligente de Conformidade" : "Intelligent Compliance Agent"}
          </p>
        </div>

        <div className="bg-card rounded-lg border p-6 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-medium text-foreground">Email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} required
                className="w-full mt-1 px-3 py-2 text-sm border border-input rounded-md bg-background focus:ring-2 focus:ring-ring focus:outline-none"
                placeholder="email@demo.com" />
            </div>
            <div>
              <label className="text-xs font-medium text-foreground">{locale === "pt-BR" ? "Senha" : "Password"}</label>
              <div className="relative">
                <input type={showPassword ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} required
                  className="w-full mt-1 px-3 py-2 text-sm border border-input rounded-md bg-background focus:ring-2 focus:ring-ring focus:outline-none pr-10"
                  placeholder="••••••" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 mt-0.5 text-muted-foreground hover:text-foreground">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            {error && <p className="text-xs text-destructive">{error}</p>}
            <button type="submit" disabled={loading}
              className="w-full py-2.5 text-sm font-medium rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50">
              {loading ? (locale === "pt-BR" ? "Entrando..." : "Signing in...") : (locale === "pt-BR" ? "Entrar" : "Sign In")}
            </button>
          </form>
        </div>

        <div className="bg-card rounded-lg border p-4">
          <p className="text-xs font-semibold text-foreground mb-3">
            {locale === "pt-BR" ? "Usuários de demonstração" : "Demo Users"}
          </p>
          <div className="space-y-2">
            {DEMO_USERS.map(u => (
              <button key={u.email} onClick={() => { setEmail(u.email); setPassword(u.password); }}
                className="w-full flex items-center justify-between p-2.5 rounded-md bg-muted/50 hover:bg-muted transition-colors text-left">
                <div>
                  <p className="text-xs font-medium text-foreground">{roleLabels[u.role]?.[locale === "pt-BR" ? "pt" : "en"] || u.role}</p>
                  <p className="text-[10px] text-muted-foreground">{u.email}</p>
                </div>
                <span className="text-[10px] text-muted-foreground font-mono">{u.password}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
