import { useApp } from "@/stores/AppStore";
import { useLanguage } from "@/i18n/LanguageContext";
import { Zap, Play, Pause } from "lucide-react";

export default function AutomationsPage() {
  const { locale } = useLanguage();
  const { automations } = useApp();
  const t = locale === "pt-BR";

  return (
    <div className="p-4 md:p-6 space-y-4">
      <div><h1 className="page-header">{t ? "Automações" : "Automations"}</h1><p className="page-subheader">{t ? "Regras e processos automatizados" : "Automated rules and processes"}</p></div>
      <div className="space-y-3">
        {automations.map(a => (
          <div key={a.id} className="bg-card rounded-lg border p-4">
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                <Zap className={`w-4 h-4 ${a.status === "active" ? "text-success" : "text-muted-foreground"}`} />
                <div>
                  <p className="text-sm font-medium text-foreground">{a.name}</p>
                  <p className="text-xs text-muted-foreground">{a.description}</p>
                </div>
              </div>
              <span className={`text-xs px-2 py-0.5 rounded-full flex items-center gap-1 ${a.status === "active" ? "bg-success/10 text-success" : "bg-muted text-muted-foreground"}`}>
                {a.status === "active" ? <Play className="w-3 h-3" /> : <Pause className="w-3 h-3" />}{a.status}
              </span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-3 text-xs text-muted-foreground">
              <div><span className="font-medium text-foreground">Trigger:</span> {a.trigger}</div>
              <div><span className="font-medium text-foreground">{t ? "Ação" : "Action"}:</span> {a.action}</div>
              <div><span className="font-medium text-foreground">{t ? "Execuções" : "Executions"}:</span> {a.executions}</div>
              <div><span className="font-medium text-foreground">{t ? "Sucesso" : "Success"}:</span> <span className={a.successRate >= 95 ? "text-success" : "text-warning"}>{a.successRate}%</span></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
