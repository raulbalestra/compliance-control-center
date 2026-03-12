import { useState } from "react";
import { useApp } from "@/stores/AppStore";
import { useLanguage } from "@/i18n/LanguageContext";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";

export default function WorkersPage() {
  const { locale } = useLanguage();
  const navigate = useNavigate();
  const { workers } = useApp();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const t = locale === "pt-BR";

  const filtered = workers.filter(w => {
    if (statusFilter !== "All" && w.workerStatus !== statusFilter) return false;
    if (search && !w.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="p-4 md:p-6 space-y-4">
      <div><h1 className="page-header">{t ? "Colaboradores" : "Workers"}</h1><p className="page-subheader">{t ? "Gestão de colaboradores" : "Worker management"}</p></div>
      <div className="filter-bar flex-col sm:flex-row">
        <div className="relative w-full sm:flex-1 sm:max-w-xs">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
          <input className="w-full pl-8 pr-3 py-1.5 text-xs bg-background border border-input rounded-md focus:outline-none focus:ring-1 focus:ring-ring" placeholder={t ? "Buscar..." : "Search..."} value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <select className="text-xs border border-input rounded-md px-2 py-1.5 bg-background" value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
          <option value="All">{t ? "Todos" : "All"}</option>
          <option value="active">{t ? "Ativo" : "Active"}</option>
          <option value="blocked">{t ? "Bloqueado" : "Blocked"}</option>
          <option value="inactive">{t ? "Inativo" : "Inactive"}</option>
        </select>
      </div>
      <div className="bg-card rounded-lg border overflow-x-auto">
        <table className="w-full text-xs min-w-[700px]">
          <thead><tr className="border-b bg-muted/30">
            <th className="text-left p-3 font-medium text-muted-foreground">{t ? "Nome" : "Name"}</th>
            <th className="text-left p-3 font-medium text-muted-foreground">{t ? "Função" : "Role"}</th>
            <th className="text-left p-3 font-medium text-muted-foreground">{t ? "Cliente" : "Client"}</th>
            <th className="text-left p-3 font-medium text-muted-foreground">{t ? "Contrato" : "Contract"}</th>
            <th className="text-left p-3 font-medium text-muted-foreground">Status</th>
            <th className="text-left p-3 font-medium text-muted-foreground">{t ? "Docs" : "Docs"}</th>
            <th className="text-left p-3 font-medium text-muted-foreground">{t ? "Pendentes" : "Pending"}</th>
            <th className="text-left p-3 font-medium text-muted-foreground">{t ? "Conformidade" : "Compliance"}</th>
          </tr></thead>
          <tbody>
            {filtered.map(w => (
              <tr key={w.id} className="border-b last:border-0 table-row-interactive" onClick={() => navigate(`/workers/${w.id}`)}>
                <td className="p-3 font-medium text-foreground">{w.name}</td>
                <td className="p-3 text-muted-foreground">{w.role}</td>
                <td className="p-3 text-muted-foreground">{w.clientName}</td>
                <td className="p-3 text-muted-foreground">{w.contractName}</td>
                <td className="p-3"><span className={`text-xs px-2 py-0.5 rounded-full ${w.workerStatus === "active" ? "bg-success/10 text-success" : w.workerStatus === "blocked" ? "bg-destructive/10 text-destructive" : "bg-muted text-muted-foreground"}`}>{w.workerStatus}</span></td>
                <td className="p-3">{w.documents}</td>
                <td className="p-3"><span className={w.pendingDocs > 0 ? "text-warning font-medium" : ""}>{w.pendingDocs}</span></td>
                <td className="p-3"><span className={`font-bold ${w.compliance >= 90 ? "text-success" : w.compliance >= 70 ? "text-warning" : "text-destructive"}`}>{w.compliance}%</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
