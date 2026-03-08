import { exceptions } from "@/lib/mockData";
import { StatusBadge } from "@/components/StatusBadge";
import { AlertTriangle, Send, ShieldOff, Users, ArrowUpRight } from "lucide-react";

export default function Exceptions() {
  return (
    <div className="p-4 md:p-6 space-y-4 md:space-y-6">
      <div>
        <h1 className="page-header">Exceptions Queue</h1>
        <p className="page-subheader">Cases requiring human intervention — Agent could not resolve automatically</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        <div className="metric-card">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Open Exceptions</p>
          <p className="text-2xl font-bold text-foreground mt-1">{exceptions.length}</p>
        </div>
        <div className="metric-card">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Critical</p>
          <p className="text-2xl font-bold text-destructive mt-1">{exceptions.filter(e => e.risk === "critical").length}</p>
        </div>
        <div className="metric-card">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">High Priority</p>
          <p className="text-2xl font-bold text-warning mt-1">{exceptions.filter(e => e.risk === "high").length}</p>
        </div>
        <div className="metric-card">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Avg Resolution Time</p>
          <p className="text-2xl font-bold text-foreground mt-1">4.2h</p>
        </div>
      </div>

      {/* Mobile cards / Desktop table */}
      <div className="hidden md:block bg-card rounded-lg border overflow-x-auto">
        <table className="w-full text-xs min-w-[800px]">
          <thead>
            <tr className="border-b bg-muted/30">
              <th className="text-left p-3 font-medium text-muted-foreground">Worker</th>
              <th className="text-left p-3 font-medium text-muted-foreground">Contract</th>
              <th className="text-left p-3 font-medium text-muted-foreground">Document</th>
              <th className="text-left p-3 font-medium text-muted-foreground">Error Reason</th>
              <th className="text-left p-3 font-medium text-muted-foreground">Risk</th>
              <th className="text-left p-3 font-medium text-muted-foreground">Deadline</th>
              <th className="text-left p-3 font-medium text-muted-foreground">Suggested Resolution</th>
              <th className="text-left p-3 font-medium text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {exceptions.map((exc) => (
              <tr key={exc.id} className="border-b last:border-0 table-row-interactive">
                <td className="p-3 font-medium text-foreground whitespace-nowrap">{exc.worker}</td>
                <td className="p-3 text-muted-foreground whitespace-nowrap">{exc.contract}</td>
                <td className="p-3 text-foreground whitespace-nowrap">{exc.document}</td>
                <td className="p-3">
                  <span className="text-destructive flex items-center gap-1 whitespace-nowrap">
                    <AlertTriangle className="w-3 h-3 shrink-0" />{exc.error}
                  </span>
                </td>
                <td className="p-3"><StatusBadge status={exc.risk} /></td>
                <td className="p-3 text-muted-foreground whitespace-nowrap">{exc.deadline}</td>
                <td className="p-3 text-muted-foreground max-w-[200px]">{exc.resolution}</td>
                <td className="p-3">
                  <div className="flex items-center gap-1">
                    <button className="p-1.5 rounded hover:bg-muted" title="Request new document"><Send className="w-3 h-3 text-muted-foreground" /></button>
                    <button className="p-1.5 rounded hover:bg-muted" title="Override validation"><ShieldOff className="w-3 h-3 text-muted-foreground" /></button>
                    <button className="p-1.5 rounded hover:bg-muted" title="Assign to team"><Users className="w-3 h-3 text-muted-foreground" /></button>
                    <button className="p-1.5 rounded hover:bg-muted" title="Escalate"><ArrowUpRight className="w-3 h-3 text-muted-foreground" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile card view */}
      <div className="md:hidden space-y-3">
        {exceptions.map((exc) => (
          <div key={exc.id} className="bg-card rounded-lg border p-4 space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">{exc.worker}</p>
                <p className="text-xs text-muted-foreground">{exc.contract}</p>
              </div>
              <StatusBadge status={exc.risk} />
            </div>
            <div>
              <p className="text-xs text-foreground">{exc.document}</p>
              <p className="text-xs text-destructive flex items-center gap-1 mt-1">
                <AlertTriangle className="w-3 h-3 shrink-0" />{exc.error}
              </p>
            </div>
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Due: {exc.deadline}</span>
              <div className="flex items-center gap-1">
                <button className="p-1.5 rounded hover:bg-muted"><Send className="w-3.5 h-3.5" /></button>
                <button className="p-1.5 rounded hover:bg-muted"><ShieldOff className="w-3.5 h-3.5" /></button>
                <button className="p-1.5 rounded hover:bg-muted"><Users className="w-3.5 h-3.5" /></button>
                <button className="p-1.5 rounded hover:bg-muted"><ArrowUpRight className="w-3.5 h-3.5" /></button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
