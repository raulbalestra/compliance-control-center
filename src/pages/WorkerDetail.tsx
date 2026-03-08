import { useParams, useNavigate } from "react-router-dom";
import { useApp } from "@/stores/AppStore";
import { useLanguage } from "@/i18n/LanguageContext";
import { StatusBadge } from "@/components/StatusBadge";
import { ArrowLeft, User } from "lucide-react";

export default function WorkerDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { locale } = useLanguage();
  const { workers, documents } = useApp();
  const t = locale === "pt-BR";
  const worker = workers.find(w => w.id === Number(id));
  if (!worker) return <div className="p-6">{t ? "Colaborador não encontrado" : "Worker not found"}</div>;

  const workerDocs = documents.filter(d => d.workerId === worker.id);

  return (
    <div className="p-4 md:p-6 space-y-4">
      <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"><ArrowLeft className="w-3.5 h-3.5" />{t ? "Voltar" : "Back"}</button>
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center"><User className="w-6 h-6 text-primary" /></div>
        <div>
          <h1 className="page-header">{worker.name}</h1>
          <p className="text-xs text-muted-foreground">{worker.role} · {worker.cpf} · <span className="cursor-pointer hover:text-primary" onClick={() => navigate(`/clients/${worker.clientId}`)}>{worker.clientName}</span></p>
        </div>
        <div className="ml-auto flex items-center gap-3">
          <span className={`text-xs font-medium px-3 py-1 rounded-full ${worker.status === "active" ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"}`}>{worker.status}</span>
          <span className={`text-xl font-bold ${worker.compliance >= 90 ? "text-success" : worker.compliance >= 70 ? "text-warning" : "text-destructive"}`}>{worker.compliance}%</span>
        </div>
      </div>
      <div>
        <h2 className="text-sm font-semibold text-foreground mb-3">{t ? "Documentos" : "Documents"} ({workerDocs.length})</h2>
        <div className="bg-card rounded-lg border overflow-x-auto">
          <table className="w-full text-xs">
            <thead><tr className="border-b bg-muted/30">
              <th className="text-left p-3 font-medium text-muted-foreground">{t ? "Tipo" : "Type"}</th>
              <th className="text-left p-3 font-medium text-muted-foreground">Status</th>
              <th className="text-left p-3 font-medium text-muted-foreground">{t ? "Prioridade" : "Priority"}</th>
              <th className="text-left p-3 font-medium text-muted-foreground">{t ? "Vencimento" : "Expiration"}</th>
              <th className="text-left p-3 font-medium text-muted-foreground">{t ? "Atualizado" : "Updated"}</th>
            </tr></thead>
            <tbody>
              {workerDocs.map(d => (
                <tr key={d.id} className="border-b last:border-0 table-row-interactive" onClick={() => navigate("/documents")}>
                  <td className="p-3 font-medium text-foreground">{d.docType}</td>
                  <td className="p-3"><StatusBadge status={d.status as any} /></td>
                  <td className="p-3"><StatusBadge status={d.priority} /></td>
                  <td className="p-3 text-muted-foreground">{d.expiration}</td>
                  <td className="p-3 text-muted-foreground">{d.lastUpdate}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {workerDocs.length === 0 && <div className="p-8 text-center text-xs text-muted-foreground">{t ? "Nenhum documento" : "No documents"}</div>}
        </div>
      </div>
    </div>
  );
}
