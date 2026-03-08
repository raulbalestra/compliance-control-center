import { useState } from "react";
import { documents } from "@/lib/mockData";
import { StatusBadge } from "@/components/StatusBadge";
import { DocumentDetail } from "@/components/DocumentDetail";
import { Search, Filter, X } from "lucide-react";

const statusOptions = ["All", "waiting", "received", "validating", "validation_failed", "ready", "submitted", "rejected"];
const clientOptions = ["All", "Petrobras", "Shell Brasil", "TotalEnergies", "Equinor"];
const priorityOptions = ["All", "critical", "high", "medium", "low"];

export default function DocumentQueue() {
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
    <div className="flex h-screen">
      <div className={`flex-1 flex flex-col overflow-hidden ${selectedDoc ? "border-r border-border" : ""}`}>
        {/* Header */}
        <div className="p-6 pb-0">
          <h1 className="page-header">Document Queue</h1>
          <p className="page-subheader">Primary workflow — All documents in processing</p>
        </div>

        {/* Filters */}
        <div className="p-6 pb-3">
          <div className="filter-bar">
            <div className="relative flex-1 max-w-xs">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search worker or document..."
                className="w-full pl-8 pr-3 py-1.5 text-xs bg-background border border-input rounded-md focus:outline-none focus:ring-1 focus:ring-ring"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <Filter className="w-3.5 h-3.5 text-muted-foreground" />
            <select className="text-xs border border-input rounded-md px-2 py-1.5 bg-background" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              {statusOptions.map((s) => <option key={s} value={s}>{s === "All" ? "All Statuses" : s.replace("_", " ")}</option>)}
            </select>
            <select className="text-xs border border-input rounded-md px-2 py-1.5 bg-background" value={clientFilter} onChange={(e) => setClientFilter(e.target.value)}>
              {clientOptions.map((c) => <option key={c} value={c}>{c === "All" ? "All Clients" : c}</option>)}
            </select>
            <select className="text-xs border border-input rounded-md px-2 py-1.5 bg-background" value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value)}>
              {priorityOptions.map((p) => <option key={p} value={p}>{p === "All" ? "All Priorities" : p}</option>)}
            </select>
            {(statusFilter !== "All" || clientFilter !== "All" || priorityFilter !== "All" || search) && (
              <button className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1" onClick={() => { setStatusFilter("All"); setClientFilter("All"); setPriorityFilter("All"); setSearch(""); }}>
                <X className="w-3 h-3" /> Clear
              </button>
            )}
          </div>
        </div>

        {/* Table */}
        <div className="flex-1 overflow-auto px-6 pb-6">
          <div className="bg-card rounded-lg border overflow-hidden">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b bg-muted/30">
                  <th className="text-left p-3 font-medium text-muted-foreground">Worker</th>
                  <th className="text-left p-3 font-medium text-muted-foreground">Contract</th>
                  <th className="text-left p-3 font-medium text-muted-foreground">Client</th>
                  <th className="text-left p-3 font-medium text-muted-foreground">Document Type</th>
                  <th className="text-left p-3 font-medium text-muted-foreground">Status</th>
                  <th className="text-left p-3 font-medium text-muted-foreground">Priority</th>
                  <th className="text-left p-3 font-medium text-muted-foreground">Expiration</th>
                  <th className="text-left p-3 font-medium text-muted-foreground">Updated</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((doc) => (
                  <tr
                    key={doc.id}
                    className={`table-row-interactive border-b last:border-0 ${selectedDoc === doc.id ? "bg-primary/5" : ""}`}
                    onClick={() => setSelectedDoc(doc.id)}
                  >
                    <td className="p-3 font-medium text-foreground">{doc.worker}</td>
                    <td className="p-3 text-muted-foreground">{doc.contract}</td>
                    <td className="p-3 text-muted-foreground">{doc.client}</td>
                    <td className="p-3 text-foreground">{doc.docType}</td>
                    <td className="p-3"><StatusBadge status={doc.status} /></td>
                    <td className="p-3"><StatusBadge status={doc.priority} /></td>
                    <td className="p-3 text-muted-foreground">{doc.expiration}</td>
                    <td className="p-3 text-muted-foreground">{doc.lastUpdate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filtered.length === 0 && (
              <div className="p-12 text-center text-sm text-muted-foreground">No documents match the current filters.</div>
            )}
          </div>
        </div>
      </div>

      {/* Detail Panel */}
      {selectedDocument && (
        <DocumentDetail document={selectedDocument} onClose={() => setSelectedDoc(null)} />
      )}
    </div>
  );
}
