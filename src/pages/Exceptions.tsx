import { exceptions } from "@/lib/mockData";
import { StatusBadge } from "@/components/StatusBadge";
import { AlertTriangle, Send, ShieldOff, Users, ArrowUpRight } from "lucide-react";

export default function Exceptions() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="page-header">Exceptions Queue</h1>
        <p className="page-subheader">Cases requiring human intervention — Agent could not resolve automatically</p>
      </div>

      <div className="grid grid-cols-4 gap-4">
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

      <div className="bg-card rounded-lg border overflow-hidden">
        <table className="w-full text-xs">
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
                <td className="p-3 font-medium text-foreground">{exc.worker}</td>
                <td className="p-3 text-muted-foreground">{exc.contract}</td>
                <td className="p-3 text-foreground">{exc.document}</td>
                <td className="p-3">
                  <span className="text-destructive flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3" />{exc.error}
                  </span>
                </td>
                <td className="p-3"><StatusBadge status={exc.risk} /></td>
                <td className="p-3 text-muted-foreground">{exc.deadline}</td>
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
    </div>
  );
}
