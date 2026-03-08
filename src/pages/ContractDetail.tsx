import { useParams, useNavigate } from "react-router-dom";
import { useApp } from "@/stores/AppStore";
import { useLanguage } from "@/i18n/LanguageContext";
import { ArrowLeft } from "lucide-react";

export default function ContractDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { locale } = useLanguage();
  const { contracts, workers, documents } = useApp();
  const t = locale === "pt-BR";
  const contract = contracts.find(c => c.id === Number(id));
  if (!contract) return <div className="p-6">{t ? "Contrato não encontrado" : "Contract not found"}</div>;

  const cWorkers = workers.filter(w => w.contractId === contract.id);
  const cDocs = documents.filter(d => d.contractId === contract.id);

  return (
    <div className="p-4 md:p-6 space-y-4">
      <button onClick={() => navigate("/contracts")} className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"><ArrowLeft className="w-3.5 h-3.5" />{t ? "Voltar" : "Back"}</button>
      <div>
        <h1 className="page-header">{contract.name}</h1>
        <p className="text-xs text-muted-foreground cursor-pointer hover:text-primary" onClick={() => navigate(`/clients/${contract.clientId}`)}>{contract.clientName} · {contract.siteName} · {contract.startDate} — {contract.endDate}</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="metric-card"><p className="text-xs text-muted-foreground uppercase">{t ? "Colaboradores" : "Workers"}</p><p className="text-2xl font-bold mt-1">{cWorkers.length}</p></div>
        <div className="metric-card"><p className="text-xs text-muted-foreground uppercase">{t ? "Documentos" : "Documents"}</p><p className="text-2xl font-bold mt-1">{cDocs.length}</p></div>
        <div className="metric-card"><p className="text-xs text-muted-foreground uppercase">{t ? "Conformidade" : "Compliance"}</p><p className={`text-2xl font-bold mt-1 ${contract.compliance >= 90 ? "text-success" : "text-warning"}`}>{contract.compliance}%</p></div>
        <div className="metric-card"><p className="text-xs text-muted-foreground uppercase">Status</p><p className="text-2xl font-bold mt-1 text-success">{contract.status}</p></div>
      </div>
      <div>
        <h2 className="text-sm font-semibold text-foreground mb-3">{t ? "Colaboradores" : "Workers"}</h2>
        <div className="bg-card rounded-lg border overflow-x-auto">
          <table className="w-full text-xs">
            <thead><tr className="border-b bg-muted/30">
              <th className="text-left p-3 font-medium text-muted-foreground">{t ? "Nome" : "Name"}</th>
              <th className="text-left p-3 font-medium text-muted-foreground">{t ? "Função" : "Role"}</th>
              <th className="text-left p-3 font-medium text-muted-foreground">Status</th>
              <th className="text-left p-3 font-medium text-muted-foreground">{t ? "Docs Pendentes" : "Pending Docs"}</th>
              <th className="text-left p-3 font-medium text-muted-foreground">{t ? "Conformidade" : "Compliance"}</th>
            </tr></thead>
            <tbody>
              {cWorkers.map(w => (
                <tr key={w.id} className="border-b last:border-0 table-row-interactive" onClick={() => navigate(`/workers/${w.id}`)}>
                  <td className="p-3 font-medium text-foreground">{w.name}</td>
                  <td className="p-3 text-muted-foreground">{w.role}</td>
                  <td className="p-3"><span className={`text-xs px-2 py-0.5 rounded-full ${w.status === "active" ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"}`}>{w.status}</span></td>
                  <td className="p-3">{w.pendingDocs}</td>
                  <td className="p-3"><span className={`font-bold ${w.compliance >= 90 ? "text-success" : "text-warning"}`}>{w.compliance}%</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
