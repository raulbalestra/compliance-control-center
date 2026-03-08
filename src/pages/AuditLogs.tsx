import { auditLogs } from "@/lib/mockData";
import { Bot, User, Search } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/i18n/LanguageContext";

export default function AuditLogs() {
  const { t } = useLanguage();
  const [search, setSearch] = useState("");
  const [actorFilter, setActorFilter] = useState("All");

  const filtered = auditLogs.filter((log) => {
    if (actorFilter !== "All" && log.actorType !== actorFilter) return false;
    if (search && !log.action.toLowerCase().includes(search.toLowerCase()) && !log.document.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="p-4 md:p-6 space-y-4 md:space-y-6">
      <div>
        <h1 className="page-header">{t.audit.title}</h1>
        <p className="page-subheader">{t.audit.subtitle}</p>
      </div>

      <div className="filter-bar flex-col sm:flex-row">
        <div className="relative w-full sm:flex-1 sm:max-w-xs">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
          <input type="text" placeholder={t.audit.searchPlaceholder}
            className="w-full pl-8 pr-3 py-1.5 text-xs bg-background border border-input rounded-md focus:outline-none focus:ring-1 focus:ring-ring"
            value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <select className="text-xs border border-input rounded-md px-2 py-1.5 bg-background w-full sm:w-auto" value={actorFilter} onChange={(e) => setActorFilter(e.target.value)}>
          <option value="All">{t.audit.allActors}</option>
          <option value="agent">{t.audit.agent}</option>
          <option value="human">{t.audit.human}</option>
        </select>
      </div>

      <div className="hidden md:block bg-card rounded-lg border overflow-x-auto">
        <table className="w-full text-xs min-w-[600px]">
          <thead>
            <tr className="border-b bg-muted/30">
              <th className="text-left p-3 font-medium text-muted-foreground">{t.audit.timestamp}</th>
              <th className="text-left p-3 font-medium text-muted-foreground">{t.audit.action}</th>
              <th className="text-left p-3 font-medium text-muted-foreground">{t.audit.actor}</th>
              <th className="text-left p-3 font-medium text-muted-foreground">{t.audit.document}</th>
              <th className="text-left p-3 font-medium text-muted-foreground">{t.audit.result}</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((log) => (
              <tr key={log.id} className="border-b last:border-0">
                <td className="p-3 text-muted-foreground font-mono whitespace-nowrap">{log.timestamp}</td>
                <td className="p-3 font-medium text-foreground">{log.action}</td>
                <td className="p-3">
                  <span className={log.actorType === "agent" ? "agent-badge" : "human-badge"}>
                    {log.actorType === "agent" ? <Bot className="w-3 h-3" /> : <User className="w-3 h-3" />}
                    {log.actor}
                  </span>
                </td>
                <td className="p-3 text-muted-foreground">{log.document}</td>
                <td className="p-3 text-foreground">{log.result}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="md:hidden space-y-3">
        {filtered.map((log) => (
          <div key={log.id} className="bg-card rounded-lg border p-3 space-y-2">
            <div className="flex items-start justify-between gap-2">
              <p className="text-xs font-medium text-foreground">{log.action}</p>
              <span className={`shrink-0 ${log.actorType === "agent" ? "agent-badge" : "human-badge"}`}>
                {log.actorType === "agent" ? <Bot className="w-3 h-3" /> : <User className="w-3 h-3" />}
                {log.actor}
              </span>
            </div>
            <p className="text-xs text-muted-foreground">{log.document}</p>
            <div className="flex items-center justify-between text-[10px] text-muted-foreground">
              <span className="font-mono">{log.timestamp}</span>
              <span className="text-foreground">{log.result}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
