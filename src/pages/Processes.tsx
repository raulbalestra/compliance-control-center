import { useApp } from "@/stores/AppStore";
import { useLanguage } from "@/i18n/LanguageContext";

export default function ProcessesPage() {
  const { locale } = useLanguage();
  const { processes } = useApp();
  const t = locale === "pt-BR";

  return (
    <div className="p-4 md:p-6 space-y-4">
      <div><h1 className="page-header">{t ? "Processos" : "Processes"}</h1><p className="page-subheader">{t ? "Processos documentais ativos" : "Active document processes"}</p></div>
      <div className="space-y-3">
        {processes.map(p => (
          <div key={p.id} className="bg-card rounded-lg border p-4">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="text-sm font-medium text-foreground">{p.name}</p>
                <p className="text-xs text-muted-foreground">{p.clientName} · {p.type}</p>
              </div>
              <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${p.status === "active" ? "bg-success/10 text-success" : p.status === "completed" ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`}>{p.status}</span>
            </div>
            <div className="flex items-center gap-4 text-xs text-muted-foreground mb-2">
              <span>{p.documents} {t ? "documentos" : "documents"}</span>
              <span>{t ? "Prazo" : "Deadline"}: {p.deadline}</span>
            </div>
            <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
              <div className={`h-full rounded-full transition-all ${p.progress >= 80 ? "bg-success" : p.progress >= 50 ? "bg-warning" : "bg-primary"}`} style={{ width: `${p.progress}%` }} />
            </div>
            <p className="text-[10px] text-muted-foreground mt-1">{p.progress}% {t ? "concluído" : "complete"}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
