import { useApp } from "@/stores/AppStore";
import { useLanguage } from "@/i18n/LanguageContext";
import { useNavigate } from "react-router-dom";
import { Building2 } from "lucide-react";

export default function ProvidersPage() {
  const { locale } = useLanguage();
  const navigate = useNavigate();
  const { providers } = useApp();
  const t = locale === "pt-BR";
  const filtered = providers.filter(p => p.type === "provider");

  return (
    <div className="p-4 md:p-6 space-y-4">
      <div><h1 className="page-header">{t ? "Prestadores" : "Providers"}</h1><p className="page-subheader">{t ? "Empresas prestadoras de serviço" : "Service provider companies"}</p></div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {filtered.map(p => (
          <div key={p.id} className="bg-card rounded-lg border p-4 hover:shadow-sm transition-shadow">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center"><Building2 className="w-4 h-4 text-primary" /></div>
              <div><p className="text-sm font-medium text-foreground">{p.name}</p><p className="text-[10px] text-muted-foreground">{p.cnpj}</p></div>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground cursor-pointer hover:text-primary" onClick={() => navigate(`/clients/${p.clientId}`)}>{p.clientName}</span>
              <span className="text-muted-foreground">{p.workers} {t ? "colaboradores" : "workers"}</span>
              <span className={`font-bold ${p.compliance >= 90 ? "text-success" : "text-warning"}`}>{p.compliance}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
