import { useApp } from "@/stores/AppStore";
import { useLanguage } from "@/i18n/LanguageContext";
import { StatusBadge } from "@/components/StatusBadge";
import { Search, CheckCircle2, XCircle, RotateCcw, Eye } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function ValidationsPage() {
  const { locale } = useLanguage();
  const { documents, approveDocument, rejectDocument, reprocessDocument } = useApp();
  const [search, setSearch] = useState("");
  const t = locale === "pt-BR";

  const validating = documents.filter(d => ["validating", "received", "reprocessing"].includes(d.status));
  const filtered = validating.filter(d => !search || d.worker.toLowerCase().includes(search.toLowerCase()) || d.docType.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="p-4 md:p-6 space-y-4">
      <div><h1 className="page-header">{t ? "Validações" : "Validations"}</h1><p className="page-subheader">{t ? "Documentos em processo de validação" : "Documents under validation"}</p></div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="metric-card"><p className="text-xs text-muted-foreground uppercase">{t ? "Em Validação" : "Validating"}</p><p className="text-2xl font-bold text-foreground mt-1">{validating.length}</p></div>
        <div className="metric-card"><p className="text-xs text-muted-foreground uppercase">{t ? "Score Alto" : "High Score"}</p><p className="text-2xl font-bold text-success mt-1">{validating.filter(d => d.validationScore >= 80).length}</p></div>
        <div className="metric-card"><p className="text-xs text-muted-foreground uppercase">{t ? "Score Baixo" : "Low Score"}</p><p className="text-2xl font-bold text-destructive mt-1">{validating.filter(d => d.validationScore < 50).length}</p></div>
        <div className="metric-card"><p className="text-xs text-muted-foreground uppercase">{t ? "Reprocessando" : "Reprocessing"}</p><p className="text-2xl font-bold text-warning mt-1">{documents.filter(d => d.status === "reprocessing").length}</p></div>
      </div>
      <div className="filter-bar">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
          <input className="w-full pl-8 pr-3 py-1.5 text-xs bg-background border border-input rounded-md" placeholder={t ? "Buscar..." : "Search..."} value={search} onChange={e => setSearch(e.target.value)} />
        </div>
      </div>
      <div className="space-y-2">
        {filtered.map(doc => (
          <div key={doc.id} className="bg-card rounded-lg border p-4">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="text-xs font-medium text-foreground">{doc.docType}</p>
                  <StatusBadge status={doc.status as any} />
                  <StatusBadge status={doc.priority} />
                </div>
                <p className="text-[10px] text-muted-foreground mt-1">{doc.worker} · {doc.client} · {doc.contract}</p>
              </div>
              <div className="text-right shrink-0">
                <span className={`text-lg font-bold ${doc.validationScore >= 80 ? "text-success" : doc.validationScore >= 50 ? "text-warning" : "text-destructive"}`}>{doc.validationScore}%</span>
                <p className="text-[10px] text-muted-foreground">Score</p>
              </div>
            </div>
            <div className="flex items-center gap-2 mt-3">
              <button onClick={() => { approveDocument(doc.id); toast.success(t ? "Aprovado" : "Approved"); }} className="px-3 py-1.5 text-xs font-medium rounded-md bg-success text-success-foreground hover:bg-success/90 flex items-center gap-1"><CheckCircle2 className="w-3 h-3" />{t ? "Aprovar" : "Approve"}</button>
              <button onClick={() => { rejectDocument(doc.id, "Manual rejection"); toast.error(t ? "Rejeitado" : "Rejected"); }} className="px-3 py-1.5 text-xs font-medium rounded-md bg-destructive text-destructive-foreground hover:bg-destructive/90 flex items-center gap-1"><XCircle className="w-3 h-3" />{t ? "Rejeitar" : "Reject"}</button>
              <button onClick={() => { reprocessDocument(doc.id); toast.info(t ? "Reprocessando" : "Reprocessing"); }} className="px-3 py-1.5 text-xs font-medium rounded-md border border-input bg-background hover:bg-muted flex items-center gap-1"><RotateCcw className="w-3 h-3" />{t ? "Reprocessar" : "Reprocess"}</button>
            </div>
          </div>
        ))}
        {filtered.length === 0 && <div className="p-12 text-center text-sm text-muted-foreground">{t ? "Nenhum documento em validação" : "No documents under validation"}</div>}
      </div>
    </div>
  );
}
