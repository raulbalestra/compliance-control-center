import { useState } from "react";
import { documents } from "@/lib/mockData";
import { StatusBadge } from "@/components/StatusBadge";
import { DocumentDetail } from "@/components/DocumentDetail";
import { Search, Filter, X } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

const statusOptions = ["All", "waiting", "received", "validating", "validation_failed", "ready", "submitted", "rejected"];
const clientOptions = ["All", "Petrobras", "Shell Brasil", "TotalEnergies", "Equinor"];
const priorityOptions = ["All", "critical", "high", "medium", "low"];

export default function DocumentQueue() {
  const { t } = useLanguage();
  const [selectedDoc, setSelectedDoc] = useState<number | null>(null);
  const [statusFilter, setStatusFilter] = useState("All");
  const [clientFilter, setClientFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = documents.filter((doc) => {
    if (statusFilter !== "All" && doc.status !== statusFilter) return false;
    if (clientFilter !== "All" && doc.client !== clientFilter) return false;
    if (priorityFilter !== "All" && doc.priority !== priorityFilter) return false;
    if (search && !doc.worker.toLowerCase().includes(search.toLowerCase()) && !doc.docType.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const selectedDocument = documents.find((d) => d.id === selectedDoc);

  return (
    <div className="flex flex-col md:flex-row h-[calc(100vh-3rem)] md:h-screen">
      <div className={`flex-1 flex flex-col overflow-hidden ${selectedDoc ? "hidden md:flex md:border-r md:border-border" : ""}`}>
        <div className="p-4 md:p-6 pb-0">
          <h1 className="page-header">{t.docQueue.title}</h1>
          <p className="page-subheader">{t.docQueue.subtitle}</p>
        </div>

        <div className="p-4 md:p-6 pb-3">
          <div className="filter-bar flex-col sm:flex-row">
            <div className="relative w-full sm:flex-1 sm:max-w-xs">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
              <input type="text" placeholder={t.docQueue.searchPlaceholder}
                className="w-full pl-8 pr-3 py-1.5 text-xs bg-background border border-input rounded-md focus:outline-none focus:ring-1 focus:ring-ring"
                value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Filter className="w-3.5 h-3.5 text-muted-foreground hidden sm:block" />
              <select className="text-xs border border-input rounded-md px-2 py-1.5 bg-background flex-1 sm:flex-none" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                {statusOptions.map((s) => <option key={s} value={s}>{s === "All" ? t.docQueue.allStatuses : s.replace("_", " ")}</option>)}
              </select>
              <select className="text-xs border border-input rounded-md px-2 py-1.5 bg-background flex-1 sm:flex-none" value={clientFilter} onChange={(e) => setClientFilter(e.target.value)}>
                {clientOptions.map((c) => <option key={c} value={c}>{c === "All" ? t.docQueue.allClients : c}</option>)}
              </select>
              <select className="text-xs border border-input rounded-md px-2 py-1.5 bg-background flex-1 sm:flex-none" value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value)}>
                {priorityOptions.map((p) => <option key={p} value={p}>{p === "All" ? t.docQueue.allPriorities : p}</option>)}
              </select>
              {(statusFilter !== "All" || clientFilter !== "All" || priorityFilter !== "All" || search) && (
                <button className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1" onClick={() => { setStatusFilter("All"); setClientFilter("All"); setPriorityFilter("All"); setSearch(""); }}>
                  <X className="w-3 h-3" /> {t.docQueue.clear}
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-auto px-4 md:px-6 pb-4 md:pb-6">
          <div className="bg-card rounded-lg border overflow-x-auto">
            <table className="w-full text-xs min-w-[700px]">
              <thead>
                <tr className="border-b bg-muted/30">
                  <th className="text-left p-3 font-medium text-muted-foreground">{t.docQueue.worker}</th>
                  <th className="text-left p-3 font-medium text-muted-foreground">{t.docQueue.contract}</th>
                  <th className="text-left p-3 font-medium text-muted-foreground">{t.docQueue.client}</th>
                  <th className="text-left p-3 font-medium text-muted-foreground">{t.docQueue.documentType}</th>
                  <th className="text-left p-3 font-medium text-muted-foreground">{t.docQueue.status}</th>
                  <th className="text-left p-3 font-medium text-muted-foreground">{t.docQueue.priority}</th>
                  <th className="text-left p-3 font-medium text-muted-foreground">{t.docQueue.expiration}</th>
                  <th className="text-left p-3 font-medium text-muted-foreground">{t.docQueue.updated}</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((doc) => (
                  <tr key={doc.id} className={`table-row-interactive border-b last:border-0 ${selectedDoc === doc.id ? "bg-primary/5" : ""}`} onClick={() => setSelectedDoc(doc.id)}>
                    <td className="p-3 font-medium text-foreground whitespace-nowrap">{doc.worker}</td>
                    <td className="p-3 text-muted-foreground whitespace-nowrap">{doc.contract}</td>
                    <td className="p-3 text-muted-foreground whitespace-nowrap">{doc.client}</td>
                    <td className="p-3 text-foreground whitespace-nowrap">{doc.docType}</td>
                    <td className="p-3"><StatusBadge status={doc.status} /></td>
                    <td className="p-3"><StatusBadge status={doc.priority} /></td>
                    <td className="p-3 text-muted-foreground whitespace-nowrap">{doc.expiration}</td>
                    <td className="p-3 text-muted-foreground whitespace-nowrap">{doc.lastUpdate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filtered.length === 0 && (
              <div className="p-12 text-center text-sm text-muted-foreground">{t.docQueue.noResults}</div>
            )}
          </div>
        </div>
      </div>

      {selectedDocument && (
        <DocumentDetail document={selectedDocument} onClose={() => setSelectedDoc(null)} />
      )}
    </div>
  );
}
