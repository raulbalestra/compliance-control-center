import { useState } from "react";
import { useApp } from "@/stores/AppStore";
import { StatusBadge } from "@/components/StatusBadge";
import { ConfirmDialog } from "@/components/ConfirmDialog";
import { Search, Filter, X, ArrowLeft, Bot, FileText, Clock, MessageSquare, Send, CheckCircle2, XCircle, RotateCcw, AlertTriangle, UserCheck } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import type { Document } from "@/types";

const statusOptions = ["All", "waiting", "received", "uploaded", "processing", "processed", "validating", "validation_failed", "approved", "ready", "submitted", "rejected", "correction_requested", "needs_correction", "reprocessing", "exception"];
const priorityOptions = ["All", "critical", "high", "medium", "low"];

export default function DocumentQueue() {
  const { t, locale } = useLanguage();
  const navigate = useNavigate();
  const { documents, approveDocument, rejectDocument, requestCorrection, reprocessDocument, markException, addDocumentComment, assignDocument } = useApp();

  // Build dynamic client list from actual documents
  const clientOptions = ["All", ...Array.from(new Set(documents.map(d => d.client))).sort()];
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [statusFilter, setStatusFilter] = useState("All");
  const [clientFilter, setClientFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [dialog, setDialog] = useState<{ type: string; docId: number } | null>(null);
  const [comment, setComment] = useState("");

  const filtered = documents.filter((doc) => {
    if (statusFilter !== "All" && doc.status !== statusFilter) return false;
    if (clientFilter !== "All" && doc.client !== clientFilter) return false;
    if (priorityFilter !== "All" && doc.priority !== priorityFilter) return false;
    if (search && !doc.worker.toLowerCase().includes(search.toLowerCase()) && !doc.docType.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const selectedDoc = documents.find(d => d.id === selectedId);

  const handleApprove = (id: number) => {
    approveDocument(id);
    toast.success(locale === "pt-BR" ? "Documento aprovado com sucesso" : "Document approved successfully");
  };
  const handleReject = (reason: string) => {
    if (dialog) { rejectDocument(dialog.docId, reason); setDialog(null); toast.error(locale === "pt-BR" ? "Documento rejeitado" : "Document rejected"); }
  };
  const handleCorrection = (note: string) => {
    if (dialog) { requestCorrection(dialog.docId, note); setDialog(null); toast.info(locale === "pt-BR" ? "Correção solicitada" : "Correction requested"); }
  };
  const handleReprocess = (id: number) => {
    reprocessDocument(id);
    toast.info(locale === "pt-BR" ? "Reprocessamento iniciado" : "Reprocessing started");
  };
  const handleMarkException = (reason: string) => {
    if (dialog) { markException(dialog.docId, reason); setDialog(null); toast.warning(locale === "pt-BR" ? "Marcado como exceção" : "Marked as exception"); }
  };
  const handleComment = (id: number) => {
    if (comment.trim()) {
      addDocumentComment(id, "Current User", comment.trim());
      setComment("");
      toast.success(locale === "pt-BR" ? "Comentário adicionado" : "Comment added");
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-[calc(100vh-3rem)] md:h-screen">
      <div className={`flex-1 flex flex-col overflow-hidden ${selectedId ? "hidden md:flex md:border-r md:border-border" : ""}`}>
        <div className="p-4 md:p-6 pb-0">
          <h1 className="page-header">{t.docQueue.title}</h1>
          <p className="page-subheader">{t.docQueue.subtitle}</p>
        </div>
        <div className="p-4 md:p-6 pb-3">
          <div className="filter-bar flex-col sm:flex-row">
            <div className="relative w-full sm:flex-1 sm:max-w-xs">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
              <input type="text" placeholder={t.docQueue.searchPlaceholder} className="w-full pl-8 pr-3 py-1.5 text-xs bg-background border border-input rounded-md focus:outline-none focus:ring-1 focus:ring-ring" value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Filter className="w-3.5 h-3.5 text-muted-foreground hidden sm:block" />
              <select className="text-xs border border-input rounded-md px-2 py-1.5 bg-background" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                {statusOptions.map(s => <option key={s} value={s}>{s === "All" ? t.docQueue.allStatuses : s.replace(/_/g, " ")}</option>)}
              </select>
              <select className="text-xs border border-input rounded-md px-2 py-1.5 bg-background" value={clientFilter} onChange={(e) => setClientFilter(e.target.value)}>
                {clientOptions.map(c => <option key={c} value={c}>{c === "All" ? t.docQueue.allClients : c}</option>)}
              </select>
              <select className="text-xs border border-input rounded-md px-2 py-1.5 bg-background" value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value)}>
                {priorityOptions.map(p => <option key={p} value={p}>{p === "All" ? t.docQueue.allPriorities : p}</option>)}
              </select>
              {(statusFilter !== "All" || clientFilter !== "All" || priorityFilter !== "All" || search) && (
                <button className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1" onClick={() => { setStatusFilter("All"); setClientFilter("All"); setPriorityFilter("All"); setSearch(""); }}>
                  <X className="w-3 h-3" /> {t.docQueue.clear}
                </button>
              )}
            </div>
          </div>
          <div className="mt-2 text-xs text-muted-foreground">{filtered.length} {locale === "pt-BR" ? "documentos" : "documents"}</div>
        </div>
        <div className="flex-1 overflow-auto px-4 md:px-6 pb-4 bg-background">
          <div className="bg-card rounded-lg border overflow-x-auto">
            <table className="w-full text-xs min-w-[800px]">
              <thead>
                <tr className="border-b bg-muted/30">
                  <th className="text-left p-3 font-medium text-muted-foreground">{t.docQueue.worker}</th>
                  <th className="text-left p-3 font-medium text-muted-foreground">{t.docQueue.contract}</th>
                  <th className="text-left p-3 font-medium text-muted-foreground">{t.docQueue.client}</th>
                  <th className="text-left p-3 font-medium text-muted-foreground">{t.docQueue.documentType}</th>
                  <th className="text-left p-3 font-medium text-muted-foreground">{t.docQueue.status}</th>
                  <th className="text-left p-3 font-medium text-muted-foreground">{t.docQueue.priority}</th>
                  <th className="text-left p-3 font-medium text-muted-foreground">Score</th>
                  <th className="text-left p-3 font-medium text-muted-foreground">V.</th>
                  <th className="text-left p-3 font-medium text-muted-foreground">{t.docQueue.updated}</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((doc) => (
                  <tr key={doc.id} className={`table-row-interactive border-b last:border-0 ${selectedId === doc.id ? "bg-primary/5" : ""}`} onClick={() => setSelectedId(doc.id)}>
                    <td className="p-3 font-medium text-foreground whitespace-nowrap">{doc.worker}</td>
                    <td className="p-3 text-muted-foreground whitespace-nowrap">{doc.contract}</td>
                    <td className="p-3 text-muted-foreground whitespace-nowrap">{doc.client}</td>
                    <td className="p-3 text-foreground whitespace-nowrap">{doc.docType}</td>
                    <td className="p-3"><StatusBadge status={doc.status} /></td>
                    <td className="p-3"><StatusBadge status={doc.priority} /></td>
                    <td className="p-3"><span className={`text-xs font-mono ${doc.validationScore >= 80 ? "text-success" : doc.validationScore >= 50 ? "text-warning" : "text-destructive"}`}>{doc.validationScore}%</span></td>
                    <td className="p-3 text-muted-foreground">v{doc.version}</td>
                    <td className="p-3 text-muted-foreground whitespace-nowrap">{doc.lastUpdate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filtered.length === 0 && <div className="p-12 text-center text-sm text-muted-foreground">{t.docQueue.noResults}</div>}
          </div>
        </div>
      </div>

      {selectedDoc && (
        <div className="w-full md:w-[520px] h-[calc(100vh-3rem)] md:h-screen overflow-y-auto bg-card border-l border-border flex flex-col">
          <div className="sticky top-0 bg-card z-10 p-4 border-b border-border flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <button onClick={() => setSelectedId(null)} className="p-1 hover:bg-muted rounded shrink-0"><ArrowLeft className="w-4 h-4 text-muted-foreground" /></button>
              <div className="min-w-0">
                <h2 className="text-sm font-semibold text-foreground truncate">{selectedDoc.docType}</h2>
                <p className="text-xs text-muted-foreground truncate">{selectedDoc.worker} — {selectedDoc.client}</p>
              </div>
            </div>
            <button onClick={() => setSelectedId(null)} className="p-1 hover:bg-muted rounded shrink-0 hidden md:block"><X className="w-4 h-4 text-muted-foreground" /></button>
          </div>

          <div className="p-4 space-y-5 flex-1 bg-card">
            <div className="bg-muted rounded-lg border-2 border-dashed border-border h-40 flex items-center justify-center">
              <div className="text-center"><FileText className="w-8 h-8 text-muted-foreground mx-auto mb-2" /><p className="text-xs text-muted-foreground">{t.docDetail.pdfViewer}</p></div>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <StatusBadge status={selectedDoc.status} />
              <StatusBadge status={selectedDoc.priority} />
              <span className="text-xs text-muted-foreground">v{selectedDoc.version}</span>
              <span className={`text-xs font-mono px-2 py-0.5 rounded ${selectedDoc.validationScore >= 80 ? "bg-success/10 text-success" : selectedDoc.validationScore >= 50 ? "bg-warning/10 text-warning" : "bg-destructive/10 text-destructive"}`}>Score: {selectedDoc.validationScore}%</span>
            </div>

            <div>
              <h3 className="text-xs font-semibold text-foreground uppercase tracking-wider mb-3">{t.docDetail.extractedMetadata}</h3>
              <div className="grid grid-cols-2 gap-2">
                {[
                  [t.docDetail.name, selectedDoc.worker],
                  [t.docDetail.cpfId, "***.***.***-42"],
                  [t.docDetail.contract, selectedDoc.contract],
                  [t.docDetail.documentType, selectedDoc.docType],
                  [t.docDetail.expiration, selectedDoc.expiration],
                  [locale === "pt-BR" ? "Origem" : "Origin", selectedDoc.origin],
                  [locale === "pt-BR" ? "Responsável" : "Assigned", selectedDoc.assignedTo || "—"],
                  [locale === "pt-BR" ? "Versão" : "Version", `v${selectedDoc.version}`],
                ].map(([label, value]) => (
                  <div key={label} className="p-2 bg-muted/50 rounded text-xs">
                    <span className="text-muted-foreground">{label}</span>
                    <p className="font-medium text-foreground mt-0.5 truncate">{value}</p>
                  </div>
                ))}
              </div>
            </div>

            {selectedDoc.rejectionReason && (
              <div className="p-3 rounded-lg border border-destructive/20 bg-destructive/5">
                <p className="text-xs font-medium text-destructive">{locale === "pt-BR" ? "Motivo da rejeição" : "Rejection Reason"}</p>
                <p className="text-xs text-foreground mt-1">{selectedDoc.rejectionReason}</p>
              </div>
            )}

            <div className="p-3 rounded-lg border border-primary/20 bg-primary/5">
              <div className="flex items-center gap-2 mb-2">
                <Bot className="w-4 h-4 text-primary" />
                <span className="text-xs font-semibold text-primary">{t.docDetail.agentRecommendation}</span>
              </div>
              <p className="text-xs text-foreground whitespace-pre-line">{(locale === "pt-BR" ? selectedDoc.agentRecommendationPt : selectedDoc.agentRecommendation) || t.docDetail.agentRecommendationText}</p>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button onClick={() => handleApprove(selectedDoc.id)} className="px-3 py-2 text-xs font-medium rounded-md bg-success text-success-foreground hover:bg-success/90 transition-colors flex items-center justify-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />{t.docDetail.approveDocument}
              </button>
              <button onClick={() => setDialog({ type: "reject", docId: selectedDoc.id })} className="px-3 py-2 text-xs font-medium rounded-md bg-destructive text-destructive-foreground hover:bg-destructive/90 transition-colors flex items-center justify-center gap-1">
                <XCircle className="w-3.5 h-3.5" />{locale === "pt-BR" ? "Rejeitar" : "Reject"}
              </button>
              <button onClick={() => setDialog({ type: "correction", docId: selectedDoc.id })} className="px-3 py-2 text-xs font-medium rounded-md bg-warning text-warning-foreground hover:bg-warning/90 transition-colors flex items-center justify-center gap-1">
                <Send className="w-3.5 h-3.5" />{t.docDetail.requestCorrection}
              </button>
              <button onClick={() => handleReprocess(selectedDoc.id)} className="px-3 py-2 text-xs font-medium rounded-md border border-input bg-background hover:bg-muted transition-colors text-foreground flex items-center justify-center gap-1">
                <RotateCcw className="w-3.5 h-3.5" />{locale === "pt-BR" ? "Reprocessar" : "Reprocess"}
              </button>
              <button onClick={() => setDialog({ type: "exception", docId: selectedDoc.id })} className="px-3 py-2 text-xs font-medium rounded-md border border-input bg-background hover:bg-muted transition-colors text-foreground flex items-center justify-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5" />{t.docDetail.markException}
              </button>
              <button onClick={() => navigate(`/workers/${selectedDoc.workerId}`)} className="px-3 py-2 text-xs font-medium rounded-md border border-input bg-background hover:bg-muted transition-colors text-foreground flex items-center justify-center gap-1">
                <UserCheck className="w-3.5 h-3.5" />{locale === "pt-BR" ? "Ver Colaborador" : "View Worker"}
              </button>
            </div>

            <div>
              <h3 className="text-xs font-semibold text-foreground uppercase tracking-wider mb-3">
                <MessageSquare className="w-3.5 h-3.5 inline mr-1" />{locale === "pt-BR" ? "Comentários" : "Comments"}
              </h3>
              <div className="space-y-2 mb-3">
                {selectedDoc.comments.length === 0 && <p className="text-xs text-muted-foreground italic">{locale === "pt-BR" ? "Nenhum comentário" : "No comments"}</p>}
                {selectedDoc.comments.map(c => (
                  <div key={c.id} className="p-2 bg-muted/50 rounded">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-medium text-foreground">{c.author}</span>
                      <span className="text-[10px] text-muted-foreground">{c.timestamp}</span>
                    </div>
                    <p className="text-xs text-foreground">{c.text}</p>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <input className="flex-1 px-2 py-1.5 text-xs border border-input rounded-md bg-background" placeholder={locale === "pt-BR" ? "Adicionar comentário..." : "Add comment..."} value={comment} onChange={e => setComment(e.target.value)} onKeyDown={e => e.key === "Enter" && handleComment(selectedDoc.id)} />
                <button onClick={() => handleComment(selectedDoc.id)} className="px-3 py-1.5 text-xs font-medium rounded-md bg-primary text-primary-foreground hover:bg-primary/90"><Send className="w-3 h-3" /></button>
              </div>
            </div>

            <div>
              <h3 className="text-xs font-semibold text-foreground uppercase tracking-wider mb-3">{t.docDetail.documentLifecycle}</h3>
              <div className="space-y-3">
                {selectedDoc.timeline.map((item, i) => (
                  <div key={item.id} className="flex items-start gap-3">
                    <div className="flex flex-col items-center">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center ${item.actorType === "agent" ? "bg-primary/10" : item.actorType === "human" ? "bg-warning/10" : "bg-muted"}`}>
                        {item.actorType === "agent" ? <Bot className="w-2.5 h-2.5 text-primary" /> : <Clock className="w-2.5 h-2.5 text-muted-foreground" />}
                      </div>
                      {i < selectedDoc.timeline.length - 1 && <div className="w-px h-4 bg-border mt-1" />}
                    </div>
                    <div>
                      <p className="text-xs text-foreground">{item.action}</p>
                      <p className="text-[10px] text-muted-foreground">{item.timestamp} · {item.actor}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <ConfirmDialog open={dialog?.type === "reject"} title={locale === "pt-BR" ? "Rejeitar Documento" : "Reject Document"} description={locale === "pt-BR" ? "Informe o motivo da rejeição" : "Please provide a rejection reason"} confirmLabel={locale === "pt-BR" ? "Rejeitar" : "Reject"} cancelLabel={locale === "pt-BR" ? "Cancelar" : "Cancel"} variant="danger" requireReason reasonLabel={locale === "pt-BR" ? "Motivo" : "Reason"} onConfirm={r => handleReject(r || "")} onCancel={() => setDialog(null)} />
      <ConfirmDialog open={dialog?.type === "correction"} title={locale === "pt-BR" ? "Solicitar Correção" : "Request Correction"} description={locale === "pt-BR" ? "Descreva a correção necessária" : "Describe the required correction"} confirmLabel={locale === "pt-BR" ? "Solicitar" : "Request"} cancelLabel={locale === "pt-BR" ? "Cancelar" : "Cancel"} variant="warning" requireReason reasonLabel={locale === "pt-BR" ? "Correção necessária" : "Required correction"} onConfirm={r => handleCorrection(r || "")} onCancel={() => setDialog(null)} />
      <ConfirmDialog open={dialog?.type === "exception"} title={locale === "pt-BR" ? "Marcar como Exceção" : "Mark as Exception"} description={locale === "pt-BR" ? "Informe a justificativa" : "Provide justification"} confirmLabel={locale === "pt-BR" ? "Confirmar" : "Confirm"} cancelLabel={locale === "pt-BR" ? "Cancelar" : "Cancel"} variant="warning" requireReason reasonLabel={locale === "pt-BR" ? "Justificativa" : "Justification"} onConfirm={r => handleMarkException(r || "")} onCancel={() => setDialog(null)} />
    </div>
  );
}
