import { useApp } from "@/stores/AppStore";
import { useLanguage } from "@/i18n/LanguageContext";
import { useNavigate } from "react-router-dom";

export default function ContractsPage() {
  const { locale } = useLanguage();
  const navigate = useNavigate();
  const { contracts } = useApp();
  const t = locale === "pt-BR";

  return (
    <div className="p-4 md:p-6 space-y-4">
      <div><h1 className="page-header">{t ? "Contratos" : "Contracts"}</h1><p className="page-subheader">{t ? "Gestão de contratos ativos" : "Active contract management"}</p></div>
      <div className="bg-card rounded-lg border overflow-x-auto">
        <table className="w-full text-xs min-w-[700px]">
          <thead><tr className="border-b bg-muted/30">
            <th className="text-left p-3 font-medium text-muted-foreground">{t ? "Contrato" : "Contract"}</th>
            <th className="text-left p-3 font-medium text-muted-foreground">{t ? "Cliente" : "Client"}</th>
            <th className="text-left p-3 font-medium text-muted-foreground">{t ? "Site" : "Site"}</th>
            <th className="text-left p-3 font-medium text-muted-foreground">Status</th>
            <th className="text-left p-3 font-medium text-muted-foreground">{t ? "Colaboradores" : "Workers"}</th>
            <th className="text-left p-3 font-medium text-muted-foreground">{t ? "Conformidade" : "Compliance"}</th>
            <th className="text-left p-3 font-medium text-muted-foreground">{t ? "Período" : "Period"}</th>
          </tr></thead>
          <tbody>
            {contracts.map(c => (
              <tr key={c.id} className="border-b last:border-0 table-row-interactive" onClick={() => navigate(`/contracts/${c.id}`)}>
                <td className="p-3 font-medium text-foreground">{c.name}</td>
                <td className="p-3 text-muted-foreground cursor-pointer hover:text-primary" onClick={e => { e.stopPropagation(); navigate(`/clients/${c.clientId}`); }}>{c.clientName}</td>
                <td className="p-3 text-muted-foreground">{c.siteName}</td>
                <td className="p-3"><span className={`text-xs font-medium px-2 py-0.5 rounded-full ${c.status === "active" ? "bg-success/10 text-success" : "bg-muted text-muted-foreground"}`}>{c.status}</span></td>
                <td className="p-3 text-foreground">{c.workers}</td>
                <td className="p-3"><span className={`font-bold ${c.compliance >= 90 ? "text-success" : c.compliance >= 80 ? "text-warning" : "text-destructive"}`}>{c.compliance}%</span></td>
                <td className="p-3 text-muted-foreground">{c.startDate} — {c.endDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
