import { useApp } from "@/stores/AppStore";
import { useLanguage } from "@/i18n/LanguageContext";
import { Wifi, WifiOff, AlertTriangle } from "lucide-react";

export default function IntegrationsPage() {
  const { locale } = useLanguage();
  const { integrations } = useApp();
  const t = locale === "pt-BR";

  return (
    <div className="p-4 md:p-6 space-y-4">
      <div><h1 className="page-header">{t ? "Integrações" : "Integrations"}</h1><p className="page-subheader">{t ? "Conectores e plataformas externas" : "Connectors and external platforms"}</p></div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {integrations.map(i => (
          <div key={i.id} className="bg-card rounded-lg border p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                {i.status === "active" ? <Wifi className="w-4 h-4 text-success" /> : i.status === "error" ? <AlertTriangle className="w-4 h-4 text-destructive" /> : <WifiOff className="w-4 h-4 text-muted-foreground" />}
                <p className="text-sm font-medium text-foreground">{i.name}</p>
              </div>
              <span className={`text-xs px-2 py-0.5 rounded-full ${i.status === "active" ? "bg-success/10 text-success" : i.status === "error" ? "bg-destructive/10 text-destructive" : "bg-muted text-muted-foreground"}`}>{i.status}</span>
            </div>
            <div className="space-y-1 text-xs text-muted-foreground">
              <p>{t ? "Tipo" : "Type"}: {i.type}</p>
              <p>{t ? "Última sinc" : "Last sync"}: {i.lastSync}</p>
              <p>{t ? "Docs processados" : "Docs processed"}: {i.documentsProcessed.toLocaleString()}</p>
              <p>{t ? "Taxa de erro" : "Error rate"}: <span className={i.errorRate > 3 ? "text-destructive" : "text-success"}>{i.errorRate}%</span></p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
