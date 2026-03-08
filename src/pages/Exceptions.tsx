import { useState } from "react";
import { useApp } from "@/stores/AppStore";
import { StatusBadge } from "@/components/StatusBadge";
import { ConfirmDialog } from "@/components/ConfirmDialog";
import { useLanguage } from "@/i18n/LanguageContext";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Search, AlertTriangle, Send, ShieldOff, Users, ArrowUpRight, CheckCircle2 } from "lucide-react";

export default function Exceptions() {
  const { locale } = useLanguage();
  const navigate = useNavigate();
  const { exceptions, resolveException, escalateException, assignException, counts } = useApp();
  const [search, setSearch] = useState("");
  const [riskFilter, setRiskFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [dialog, setDialog] = useState<{ type: string; id: number } | null>(null);
  const t = locale === "pt-BR";

  const filtered = exceptions.filter(e => {
    if (riskFilter !== "All" && e.risk !== riskFilter) return false;
    if (statusFilter !== "All" && e.status !== statusFilter) return false;
    if (search && !e.worker.toLowerCase().includes(search.toLowerCase()) && !e.document.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="p-4 md:p-6 space-y-4">
      <div>
        <h1 className="page-header">{t ? "Fila de Exceções" : "Exceptions Queue"}</h1>
        <p className="page-subheader">{t ? "Casos que requerem intervenção humana" : "Cases requiring human intervention"}</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="metric-card"><p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{t ? "Abertas" : "Open"}</p><p className="text-2xl font-bold text-foreground mt-1">{counts.openExceptions}</p></div>
        <div className="metric-card"><p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{t ? "Críticas" : "Critical"}</p><p className="text-2xl font-bold text-destructive mt-1">{counts.criticalExceptions}</p></div>
        <div className="metric-card"><p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{t ? "Em Progresso" : "In Progress"}</p><p className="text-2xl font-bold text-warning mt-1">{exceptions.filter(e => e.status === "in_progress").length}</p></div>
        <div className="metric-card"><p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{t ? "Resolvidas" : "Resolved"}</p><p className="text-2xl font-bold text-success mt-1">{exceptions.filter(e => e.status === "resolved").length}</p></div>
      </div>
      <div className="filter-bar flex-col sm:flex-row">
        <div className="relative w-full sm:flex-1 sm:max-w-xs">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
          <input type="text" className="w-full pl-8 pr-3 py-1.5 text-xs bg-background border border-input rounded-md focus:outline-none focus:ring-1 focus:ring-ring" placeholder={t ? "Buscar..." : "Search..."} value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <select className="text-xs border border-input rounded-md px-2 py-1.5 bg-background" value={riskFilter} onChange={e => setRiskFilter(e.target.value)}>
          <option value="All">{t ? "Todos os Riscos" : "All Risks"}</option>
          <option value="critical">{t ? "Crítico" : "Critical"}</option>
          <option value="high">{t ? "Alto" : "High"}</option>
          <option value="medium">{t ? "Médio" : "Medium"}</option>
        </select>
        <select className="text-xs border border-input rounded-md px-2 py-1.5 bg-background" value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
          <option value="All">{t ? "Todos os Status" : "All Statuses"}</option>
          <option value="open">{t ? "Aberta" : "Open"}</option>
          <option value="in_progress">{t ? "Em progresso" : "In Progress"}</option>
          <option value="resolved">{t ? "Resolvida" : "Resolved"}</option>
          <option value="escalated">{t ? "Escalada" : "Escalated"}</option>
        </select>
      </div>
      <div className="bg-card rounded-lg border overflow-x-auto">
        <table className="w-full text-xs min-w-[800px]">
          <thead><tr className="border-b bg-muted/30">
            <th className="text-left p-3 font-medium text-muted-foreground">{t ? "Colaborador" : "Worker"}</th>
            <th className="text-left p-3 font-medium text-muted-foreground">{t ? "Documento" : "Document"}</th>
            <th className="text-left p-3 font-medium text-muted-foreground">{t ? "Erro" : "Error"}</th>
            <th className="text-left p-3 font-medium text-muted-foreground">{t ? "Risco" : "Risk"}</th>
            <th className="text-left p-3 font-medium text-muted-foreground">Status</th>
            <th className="text-left p-3 font-medium text-muted-foreground">{t ? "Responsável" : "Assigned"}</th>
            <th className="text-left p-3 font-medium text-muted-foreground">{t ? "Prazo" : "Deadline"}</th>
            <th className="text-left p-3 font-medium text-muted-foreground">{t ? "Ações" : "Actions"}</th>
          </tr></thead>
          <tbody>
            {filtered.map(exc => (
              <tr key={exc.id} className="border-b last:border-0 table-row-interactive">
                <td className="p-3 font-medium text-foreground whitespace-nowrap cursor-pointer hover:text-primary" onClick={() => navigate(`/workers/${exc.workerId}`)}>{exc.worker}</td>
                <td className="p-3 text-foreground whitespace-nowrap">{exc.document}</td>
                <td className="p-3"><span className="text-destructive flex items-center gap-1"><AlertTriangle className="w-3 h-3 shrink-0" />{exc.error}</span></td>
                <td className="p-3"><StatusBadge status={exc.risk} /></td>
                <td className="p-3"><span className={`text-xs font-medium px-2 py-0.5 rounded-full ${exc.status === "resolved" ? "bg-success/10 text-success" : exc.status === "escalated" ? "bg-destructive/10 text-destructive" : exc.status === "in_progress" ? "bg-warning/10 text-warning" : "bg-muted text-muted-foreground"}`}>{exc.status}</span></td>
                <td className="p-3 text-muted-foreground">{exc.assignedTo || "—"}</td>
                <td className="p-3 text-muted-foreground whitespace-nowrap">{exc.deadline}</td>
                <td className="p-3">
                  <div className="flex items-center gap-1">
                    {exc.status !== "resolved" && <>
                      <button onClick={() => { resolveException(exc.id); toast.success(t ? "Exceção resolvida" : "Exception resolved"); }} className="p-1.5 rounded hover:bg-muted" title={t ? "Resolver" : "Resolve"}><CheckCircle2 className="w-3 h-3 text-success" /></button>
                      <button onClick={() => { escalateException(exc.id); toast.info(t ? "Exceção escalada" : "Exception escalated"); }} className="p-1.5 rounded hover:bg-muted" title={t ? "Escalar" : "Escalate"}><ArrowUpRight className="w-3 h-3 text-muted-foreground" /></button>
                      <button onClick={() => { assignException(exc.id, "João Analista"); toast.info(t ? "Atribuída" : "Assigned"); }} className="p-1.5 rounded hover:bg-muted" title={t ? "Atribuir" : "Assign"}><Users className="w-3 h-3 text-muted-foreground" /></button>
                    </>}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && <div className="p-12 text-center text-sm text-muted-foreground">{t ? "Nenhuma exceção encontrada" : "No exceptions found"}</div>}
      </div>
    </div>
  );
}
