import { Bot, Clock, FileStack, AlertTriangle, CheckCircle2, XCircle, RotateCcw, Zap, User } from "lucide-react";
import { useApp } from "@/stores/AppStore";
import { useLanguage } from "@/i18n/LanguageContext";
import { useNavigate } from "react-router-dom";
import { StatusBadge } from "@/components/StatusBadge";

export default function OperationalDashboard() {
  const { locale } = useLanguage();
  const navigate = useNavigate();
  const { documents, pendingItems, exceptions, counts } = useApp();
  const t = locale === "pt-BR";

  const validating = documents.filter(d => ["validating", "received", "reprocessing"].includes(d.status));
  const urgentPending = pendingItems.filter(p => p.status === "open" && (p.priority === "critical" || p.priority === "high"));
  const recentDocs = documents.slice(0, 8);

  return (
    <div className="p-4 md:p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div><h1 className="page-header">{t ? "Painel Operacional" : "Operational Dashboard"}</h1><p className="page-subheader">{t ? "Fila de trabalho e ações pendentes" : "Work queue and pending actions"}</p></div>
        <div className="agent-badge"><Bot className="w-3 h-3" />{t ? "Agente Ativo" : "Agent Active"}</div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        <div className="metric-card cursor-pointer" onClick={() => navigate("/validations")}><p className="text-xs text-muted-foreground uppercase">{t ? "Em Validação" : "Validating"}</p><p className="text-2xl font-bold text-warning mt-1">{validating.length}</p></div>
        <div className="metric-card cursor-pointer" onClick={() => navigate("/pending")}><p className="text-xs text-muted-foreground uppercase">{t ? "Pendências" : "Pending"}</p><p className="text-2xl font-bold text-foreground mt-1">{counts.openPending}</p></div>
        <div className="metric-card cursor-pointer" onClick={() => navigate("/exceptions")}><p className="text-xs text-muted-foreground uppercase">{t ? "Exceções" : "Exceptions"}</p><p className="text-2xl font-bold text-destructive mt-1">{counts.openExceptions}</p></div>
        <div className="metric-card"><p className="text-xs text-muted-foreground uppercase">{t ? "Bloqueados" : "Blocked"}</p><p className="text-2xl font-bold text-destructive mt-1">{counts.blockedWorkers}</p></div>
        <div className="metric-card"><p className="text-xs text-muted-foreground uppercase">{t ? "Total Docs" : "Total Docs"}</p><p className="text-2xl font-bold text-foreground mt-1">{documents.length}</p></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-card rounded-lg border p-4">
          <h3 className="text-sm font-semibold text-foreground mb-3">{t ? "Validações Pendentes" : "Pending Validations"}</h3>
          <div className="space-y-2">
            {validating.slice(0, 5).map(d => (
              <div key={d.id} className="flex items-center justify-between p-2 rounded hover:bg-muted/50 cursor-pointer" onClick={() => navigate("/validations")}>
                <div><p className="text-xs font-medium text-foreground">{d.docType} - {d.worker}</p><p className="text-[10px] text-muted-foreground">{d.client}</p></div>
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-mono ${d.validationScore >= 80 ? "text-success" : d.validationScore >= 50 ? "text-warning" : "text-destructive"}`}>{d.validationScore}%</span>
                  <StatusBadge status={d.priority} />
                </div>
              </div>
            ))}
            {validating.length === 0 && <p className="text-xs text-muted-foreground italic py-4 text-center">{t ? "Nenhuma validação pendente" : "No pending validations"}</p>}
          </div>
        </div>

        <div className="bg-card rounded-lg border p-4">
          <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2"><AlertTriangle className="w-4 h-4 text-warning" />{t ? "Pendências Urgentes" : "Urgent Pending"}</h3>
          <div className="space-y-2">
            {urgentPending.slice(0, 5).map(p => (
              <div key={p.id} className="flex items-center justify-between p-2 rounded hover:bg-muted/50 cursor-pointer" onClick={() => navigate("/pending")}>
                <div><p className="text-xs font-medium text-foreground">{p.documentName}</p><p className="text-[10px] text-muted-foreground">{p.description}</p></div>
                <div className="flex items-center gap-2">
                  <StatusBadge status={p.priority} />
                  <span className="text-[10px] text-muted-foreground">{p.slaDeadline}</span>
                </div>
              </div>
            ))}
            {urgentPending.length === 0 && <p className="text-xs text-muted-foreground italic py-4 text-center">{t ? "Nenhuma pendência urgente" : "No urgent pending items"}</p>}
          </div>
        </div>
      </div>

      <div className="bg-card rounded-lg border p-4">
        <h3 className="text-sm font-semibold text-foreground mb-3">{t ? "Documentos Recentes" : "Recent Documents"}</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-xs min-w-[600px]">
            <thead><tr className="border-b bg-muted/30">
              <th className="text-left p-2 font-medium text-muted-foreground">{t ? "Documento" : "Document"}</th>
              <th className="text-left p-2 font-medium text-muted-foreground">{t ? "Colaborador" : "Worker"}</th>
              <th className="text-left p-2 font-medium text-muted-foreground">Status</th>
              <th className="text-left p-2 font-medium text-muted-foreground">{t ? "Atualizado" : "Updated"}</th>
            </tr></thead>
            <tbody>
              {recentDocs.map(d => (
                <tr key={d.id} className="border-b last:border-0 table-row-interactive" onClick={() => navigate("/documents")}>
                  <td className="p-2 font-medium text-foreground">{d.docType}</td>
                  <td className="p-2 text-muted-foreground">{d.worker}</td>
                  <td className="p-2"><StatusBadge status={d.status as any} /></td>
                  <td className="p-2 text-muted-foreground">{d.lastUpdate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
