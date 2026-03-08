import { useParams, useNavigate } from "react-router-dom";
import { useApp } from "@/stores/AppStore";
import { useLanguage } from "@/i18n/LanguageContext";
import { ArrowLeft, Building2, FileText, Users, MapPin } from "lucide-react";

export default function ClientDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { locale } = useLanguage();
  const { clients, contracts, workers, documents } = useApp();
  const t = locale === "pt-BR";
  const client = clients.find(c => c.id === Number(id));
  if (!client) return <div className="p-6">{t ? "Cliente não encontrado" : "Client not found"}</div>;

  const clientContracts = contracts.filter(c => c.clientId === client.id);
  const clientWorkers = workers.filter(w => w.clientId === client.id);
  const clientDocs = documents.filter(d => d.clientId === client.id);

  return (
    <div className="p-4 md:p-6 space-y-4">
      <button onClick={() => navigate("/clients")} className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"><ArrowLeft className="w-3.5 h-3.5" />{t ? "Voltar" : "Back"}</button>
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center"><Building2 className="w-6 h-6 text-primary" /></div>
        <div>
          <h1 className="page-header">{client.name}</h1>
          <p className="text-xs text-muted-foreground">{client.cnpj} · {client.contactEmail}</p>
        </div>
        <div className={`ml-auto text-2xl font-bold ${client.compliance >= 90 ? "text-success" : client.compliance >= 80 ? "text-warning" : "text-destructive"}`}>{client.compliance}%</div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="metric-card"><p className="text-xs text-muted-foreground uppercase">{t ? "Contratos" : "Contracts"}</p><p className="text-2xl font-bold text-foreground mt-1">{clientContracts.length}</p></div>
        <div className="metric-card"><p className="text-xs text-muted-foreground uppercase">{t ? "Colaboradores" : "Workers"}</p><p className="text-2xl font-bold text-foreground mt-1">{clientWorkers.length}</p></div>
        <div className="metric-card"><p className="text-xs text-muted-foreground uppercase">{t ? "Documentos" : "Documents"}</p><p className="text-2xl font-bold text-foreground mt-1">{clientDocs.length}</p></div>
        <div className="metric-card"><p className="text-xs text-muted-foreground uppercase">{t ? "Docs Pendentes" : "Pending Docs"}</p><p className="text-2xl font-bold text-warning mt-1">{clientDocs.filter(d => ["waiting", "received", "validating"].includes(d.status)).length}</p></div>
      </div>
      <div>
        <h2 className="text-sm font-semibold text-foreground mb-3">{t ? "Contratos" : "Contracts"}</h2>
        <div className="space-y-2">
          {clientContracts.map(c => (
            <div key={c.id} className="bg-card rounded-lg border p-4 flex items-center justify-between cursor-pointer hover:shadow-sm" onClick={() => navigate(`/contracts/${c.id}`)}>
              <div>
                <p className="text-xs font-medium text-foreground">{c.name}</p>
                <p className="text-[10px] text-muted-foreground">{c.siteName} · {c.workers} {t ? "colaboradores" : "workers"} · {c.status}</p>
              </div>
              <div className={`text-sm font-bold ${c.compliance >= 90 ? "text-success" : c.compliance >= 80 ? "text-warning" : "text-destructive"}`}>{c.compliance}%</div>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h2 className="text-sm font-semibold text-foreground mb-3">{t ? "Colaboradores" : "Workers"}</h2>
        <div className="bg-card rounded-lg border overflow-x-auto">
          <table className="w-full text-xs">
            <thead><tr className="border-b bg-muted/30">
              <th className="text-left p-3 font-medium text-muted-foreground">{t ? "Nome" : "Name"}</th>
              <th className="text-left p-3 font-medium text-muted-foreground">{t ? "Função" : "Role"}</th>
              <th className="text-left p-3 font-medium text-muted-foreground">Status</th>
              <th className="text-left p-3 font-medium text-muted-foreground">{t ? "Conformidade" : "Compliance"}</th>
            </tr></thead>
            <tbody>
              {clientWorkers.map(w => (
                <tr key={w.id} className="border-b last:border-0 table-row-interactive" onClick={() => navigate(`/workers/${w.id}`)}>
                  <td className="p-3 font-medium text-foreground">{w.name}</td>
                  <td className="p-3 text-muted-foreground">{w.role}</td>
                  <td className="p-3"><span className={`text-xs font-medium px-2 py-0.5 rounded-full ${w.status === "active" ? "bg-success/10 text-success" : w.status === "blocked" ? "bg-destructive/10 text-destructive" : "bg-muted text-muted-foreground"}`}>{w.status}</span></td>
                  <td className="p-3"><span className={`font-bold ${w.compliance >= 90 ? "text-success" : w.compliance >= 70 ? "text-warning" : "text-destructive"}`}>{w.compliance}%</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
