import { clients } from "@/lib/mockData";
import { Building2, FileText, Users, ChevronRight } from "lucide-react";

export default function ClientsContracts() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="page-header">Clients & Contracts</h1>
        <p className="page-subheader">Client-specific compliance requirements and document configuration</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {clients.map((client) => (
          <div key={client.id} className="bg-card rounded-lg border p-5 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-foreground">{client.name}</h3>
                  <p className="text-xs text-muted-foreground">{client.contracts} active contracts</p>
                </div>
              </div>
              <div className={`text-lg font-bold ${
                client.compliance >= 95 ? "text-success" :
                client.compliance >= 90 ? "text-info" :
                client.compliance >= 85 ? "text-warning" : "text-destructive"
              }`}>
                {client.compliance}%
              </div>
            </div>

            <div className="flex items-center gap-4 mb-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1"><Users className="w-3 h-3" />{client.activeWorkers} workers</span>
              <span className="flex items-center gap-1"><FileText className="w-3 h-3" />{client.docs.length} required docs</span>
            </div>

            <div>
              <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider mb-2">Required Documents</p>
              <div className="flex flex-wrap gap-1.5">
                {client.docs.map((doc) => (
                  <span key={doc} className="px-2 py-0.5 text-[10px] font-medium rounded-full bg-muted text-muted-foreground">
                    {doc}
                  </span>
                ))}
              </div>
            </div>

            <button className="mt-4 w-full flex items-center justify-center gap-1 py-2 text-xs font-medium text-primary hover:bg-primary/5 rounded-md transition-colors">
              View Details <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
