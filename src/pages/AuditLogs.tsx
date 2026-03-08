import { useState } from "react";
import { useApp } from "@/stores/AppStore";
import { useLanguage } from "@/i18n/LanguageContext";
import { Bot, User, Search } from "lucide-react";

export default function AuditLogs() {
  const { locale } = useLanguage();
  const { auditLogs } = useApp();
  const [search, setSearch] = useState("");
  const [actorFilter, setActorFilter] = useState("All");
  const [moduleFilter, setModuleFilter] = useState("All");
  const t = locale === "pt-BR";

  const modules = [...new Set(auditLogs.map(l => l.module))];
  const filtered = auditLogs.filter(log => {
    if (actorFilter !== "All" && log.actorType !== actorFilter) return false;
    if (moduleFilter !== "All" && log.module !== moduleFilter) return false;
    if (search && !log.action.toLowerCase().includes(search.toLowerCase()) && !log.document.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="p-4 md:p-6 space-y-4">
      <div><h1 className="page-header">{t ? "Logs de Auditoria" : "Audit Logs"}</h1><p className="page-subheader">{t ? "Trilha completa de auditoria" : "Complete audit trail"}</p></div>
      <div className="filter-bar flex-col sm:flex-row">
        <div className="relative w-full sm:flex-1 sm:max-w-xs">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
          <input className="w-full pl-8 pr-3 py-1.5 text-xs bg-background border border-input rounded-md focus:outline-none focus:ring-1 focus:ring-ring" placeholder={t ? "Buscar..." : "Search..."} value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <select className="text-xs border border-input rounded-md px-2 py-1.5 bg-background" value={actorFilter} onChange={e => setActorFilter(e.target.value)}>
          <option value="All">{t ? "Todos os Atores" : "All Actors"}</option>
          <option value="agent">{t ? "Agente" : "Agent"}</option>
          <option value="human">{t ? "Humano" : "Human"}</option>
          <option value="system">System</option>
        </select>
        <select className="text-xs border border-input rounded-md px-2 py-1.5 bg-background" value={moduleFilter} onChange={e => setModuleFilter(e.target.value)}>
          <option value="All">{t ? "Todos os Módulos" : "All Modules"}</option>
          {modules.map(m => <option key={m} value={m}>{m}</option>)}
        </select>
      </div>
      <div className="text-xs text-muted-foreground">{filtered.length} {t ? "registros" : "records"}</div>
      <div className="bg-card rounded-lg border overflow-x-auto">
        <table className="w-full text-xs min-w-[700px]">
          <thead><tr className="border-b bg-muted/30">
            <th className="text-left p-3 font-medium text-muted-foreground">{t ? "Data/Hora" : "Timestamp"}</th>
            <th className="text-left p-3 font-medium text-muted-foreground">{t ? "Ação" : "Action"}</th>
            <th className="text-left p-3 font-medium text-muted-foreground">{t ? "Ator" : "Actor"}</th>
            <th className="text-left p-3 font-medium text-muted-foreground">{t ? "Módulo" : "Module"}</th>
            <th className="text-left p-3 font-medium text-muted-foreground">{t ? "Documento" : "Document"}</th>
            <th className="text-left p-3 font-medium text-muted-foreground">{t ? "Resultado" : "Result"}</th>
          </tr></thead>
          <tbody>
            {filtered.map(log => (
              <tr key={log.id} className="border-b last:border-0">
                <td className="p-3 text-muted-foreground font-mono whitespace-nowrap">{log.timestamp}</td>
                <td className="p-3 font-medium text-foreground">{log.action}</td>
                <td className="p-3"><span className={log.actorType === "agent" ? "agent-badge" : "human-badge"}>{log.actorType === "agent" ? <Bot className="w-3 h-3" /> : <User className="w-3 h-3" />}{log.actor}</span></td>
                <td className="p-3 text-muted-foreground">{log.module}</td>
                <td className="p-3 text-muted-foreground">{log.document}</td>
                <td className="p-3 text-foreground">{log.result}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
