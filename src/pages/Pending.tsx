import { useState } from "react";
import { useApp } from "@/stores/AppStore";
import { StatusBadge } from "@/components/StatusBadge";
import { useLanguage } from "@/i18n/LanguageContext";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Search, MessageSquare, Send, CheckCircle2, ArrowUpRight, UserCheck, Clock } from "lucide-react";

export default function PendingPage() {
  const { locale } = useLanguage();
  const navigate = useNavigate();
  const { pendingItems, resolvePending, changePendingPriority, changePendingStatus, assignPending, addPendingComment } = useApp();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [comment, setComment] = useState("");
  const t = locale === "pt-BR";

  const filtered = pendingItems.filter(p => {
    if (statusFilter !== "All" && p.status !== statusFilter) return false;
    if (search && !p.workerName.toLowerCase().includes(search.toLowerCase()) && !p.documentName.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const selected = pendingItems.find(p => p.id === selectedId);

  return (
    <div className="flex flex-col md:flex-row h-[calc(100vh-3rem)] md:h-screen">
      <div className={`flex-1 flex flex-col overflow-hidden ${selectedId ? "hidden md:flex md:border-r md:border-border" : ""}`}>
        <div className="p-4 md:p-6 pb-0">
          <h1 className="page-header">{t ? "Pendências" : "Pending Items"}</h1>
          <p className="page-subheader">{t ? "Itens que requerem ação" : "Items requiring action"}</p>
        </div>
        <div className="p-4 md:p-6 pb-3">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
            <div className="metric-card"><p className="text-xs font-medium text-muted-foreground uppercase">{t ? "Abertas" : "Open"}</p><p className="text-2xl font-bold text-foreground mt-1">{pendingItems.filter(p => p.status === "open").length}</p></div>
            <div className="metric-card"><p className="text-xs font-medium text-muted-foreground uppercase">{t ? "Em progresso" : "In Progress"}</p><p className="text-2xl font-bold text-warning mt-1">{pendingItems.filter(p => p.status === "in_progress").length}</p></div>
            <div className="metric-card"><p className="text-xs font-medium text-muted-foreground uppercase">{t ? "Resolvidas" : "Resolved"}</p><p className="text-2xl font-bold text-success mt-1">{pendingItems.filter(p => p.status === "resolved").length}</p></div>
            <div className="metric-card"><p className="text-xs font-medium text-muted-foreground uppercase">{t ? "Críticas" : "Critical"}</p><p className="text-2xl font-bold text-destructive mt-1">{pendingItems.filter(p => p.priority === "critical").length}</p></div>
          </div>
          <div className="filter-bar flex-col sm:flex-row">
            <div className="relative w-full sm:flex-1 sm:max-w-xs">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
              <input className="w-full pl-8 pr-3 py-1.5 text-xs bg-background border border-input rounded-md focus:outline-none focus:ring-1 focus:ring-ring" placeholder={t ? "Buscar..." : "Search..."} value={search} onChange={e => setSearch(e.target.value)} />
            </div>
            <select className="text-xs border border-input rounded-md px-2 py-1.5 bg-background" value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
              <option value="All">{t ? "Todos" : "All"}</option>
              <option value="open">{t ? "Aberta" : "Open"}</option>
              <option value="in_progress">{t ? "Em progresso" : "In Progress"}</option>
              <option value="resolved">{t ? "Resolvida" : "Resolved"}</option>
            </select>
          </div>
        </div>
        <div className="flex-1 overflow-auto px-4 md:px-6 pb-4">
          <div className="space-y-2">
            {filtered.map(p => (
              <div key={p.id} className={`bg-card rounded-lg border p-4 cursor-pointer hover:shadow-sm transition-shadow ${selectedId === p.id ? "ring-1 ring-primary" : ""}`} onClick={() => setSelectedId(p.id)}>
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-foreground">{p.documentName}</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">{p.workerName} · {p.clientName} · {p.contractName}</p>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <StatusBadge status={p.priority} />
                    <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${p.status === "resolved" ? "bg-success/10 text-success" : p.status === "in_progress" ? "bg-warning/10 text-warning" : "bg-muted text-muted-foreground"}`}>{p.status}</span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-2">{p.description}</p>
                <div className="flex items-center gap-3 mt-2 text-[10px] text-muted-foreground">
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" />SLA: {p.slaDeadline}</span>
                  {p.assignedTo && <span className="flex items-center gap-1"><UserCheck className="w-3 h-3" />{p.assignedTo}</span>}
                </div>
              </div>
            ))}
            {filtered.length === 0 && <div className="p-12 text-center text-sm text-muted-foreground">{t ? "Nenhuma pendência" : "No pending items"}</div>}
          </div>
        </div>
      </div>

      {selected && (
        <div className="w-full md:w-[480px] h-[calc(100vh-3rem)] md:h-screen overflow-y-auto bg-card border-l border-border">
          <div className="sticky top-0 bg-card z-10 p-4 border-b border-border">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-foreground">{selected.documentName}</h2>
              <button onClick={() => setSelectedId(null)} className="p-1 hover:bg-muted rounded text-muted-foreground">✕</button>
            </div>
            <p className="text-xs text-muted-foreground">{selected.workerName} · {selected.clientName}</p>
          </div>
          <div className="p-4 space-y-4">
            <div className="flex gap-2 flex-wrap">
              <StatusBadge status={selected.priority} />
              <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${selected.status === "resolved" ? "bg-success/10 text-success" : selected.status === "in_progress" ? "bg-warning/10 text-warning" : "bg-muted text-muted-foreground"}`}>{selected.status}</span>
              <span className="text-xs text-muted-foreground">SLA: {selected.slaDeadline}</span>
            </div>
            <div className="p-3 bg-muted/50 rounded-lg">
              <p className="text-xs text-foreground">{selected.description}</p>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {selected.status !== "resolved" && (
                <>
                  <button onClick={() => { resolvePending(selected.id); toast.success(t ? "Resolvida" : "Resolved"); }} className="px-3 py-2 text-xs font-medium rounded-md bg-success text-success-foreground hover:bg-success/90 flex items-center justify-center gap-1"><CheckCircle2 className="w-3.5 h-3.5" />{t ? "Resolver" : "Resolve"}</button>
                  <button onClick={() => { changePendingStatus(selected.id, "escalated"); toast.info(t ? "Escalada" : "Escalated"); }} className="px-3 py-2 text-xs font-medium rounded-md border border-input bg-background hover:bg-muted flex items-center justify-center gap-1"><ArrowUpRight className="w-3.5 h-3.5" />{t ? "Escalar" : "Escalate"}</button>
                  <button onClick={() => { assignPending(selected.id, "João Analista"); toast.info(t ? "Atribuída" : "Assigned"); }} className="px-3 py-2 text-xs font-medium rounded-md border border-input bg-background hover:bg-muted flex items-center justify-center gap-1"><UserCheck className="w-3.5 h-3.5" />{t ? "Atribuir" : "Assign"}</button>
                  <select className="px-3 py-2 text-xs border border-input rounded-md bg-background" value={selected.priority} onChange={e => changePendingPriority(selected.id, e.target.value as any)}>
                    <option value="critical">{t ? "Crítica" : "Critical"}</option>
                    <option value="high">{t ? "Alta" : "High"}</option>
                    <option value="medium">{t ? "Média" : "Medium"}</option>
                    <option value="low">{t ? "Baixa" : "Low"}</option>
                  </select>
                </>
              )}
            </div>
            {selected.documentId && (
              <button onClick={() => navigate(`/documents`)} className="w-full px-3 py-2 text-xs font-medium rounded-md border border-input bg-background hover:bg-muted flex items-center justify-center gap-1">
                {t ? "Abrir Documento Relacionado" : "Open Related Document"}
              </button>
            )}
            <div>
              <h3 className="text-xs font-semibold text-foreground mb-2"><MessageSquare className="w-3.5 h-3.5 inline mr-1" />{t ? "Comentários" : "Comments"}</h3>
              <div className="space-y-2 mb-3">
                {selected.comments.length === 0 && <p className="text-xs text-muted-foreground italic">{t ? "Nenhum comentário" : "No comments"}</p>}
                {selected.comments.map(c => (
                  <div key={c.id} className="p-2 bg-muted/50 rounded">
                    <div className="flex justify-between"><span className="text-xs font-medium">{c.author}</span><span className="text-[10px] text-muted-foreground">{c.timestamp}</span></div>
                    <p className="text-xs mt-1">{c.text}</p>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <input className="flex-1 px-2 py-1.5 text-xs border border-input rounded-md bg-background" placeholder={t ? "Comentar..." : "Comment..."} value={comment} onChange={e => setComment(e.target.value)} onKeyDown={e => { if (e.key === "Enter" && comment.trim()) { addPendingComment(selected.id, "Current User", comment.trim()); setComment(""); toast.success(t ? "Comentário adicionado" : "Comment added"); }}} />
                <button onClick={() => { if (comment.trim()) { addPendingComment(selected.id, "Current User", comment.trim()); setComment(""); } }} className="px-3 py-1.5 text-xs font-medium rounded-md bg-primary text-primary-foreground"><Send className="w-3 h-3" /></button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
