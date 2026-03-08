import {
  FileStack, CheckCircle2, Clock, XCircle, Send, TrendingUp,
  AlertTriangle, Ban, CalendarClock, Bot, User, Zap,
} from "lucide-react";
import { MetricCard } from "@/components/MetricCard";
import { StatusBadge } from "@/components/StatusBadge";
import { useApp } from "@/stores/AppStore";
import { activityTimeline } from "@/lib/mockData";
import { useLanguage } from "@/i18n/LanguageContext";
import { useNavigate } from "react-router-dom";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell,
} from "recharts";

const weeklyData = [
  { day: "Mon", validated: 220, rejected: 12 },
  { day: "Tue", validated: 290, rejected: 8 },
  { day: "Wed", validated: 260, rejected: 15 },
  { day: "Thu", validated: 330, rejected: 11 },
  { day: "Fri", validated: 270, rejected: 6 },
];

export default function Dashboard() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { documents, clients, counts, exceptions, pendingItems } = useApp();

  const approvedCount = documents.filter(d => d.status === "approved" || d.status === "ready" || d.status === "submitted").length;
  const rejectedCount = documents.filter(d => d.status === "rejected" || d.status === "validation_failed").length;
  const pendingCount = documents.filter(d => ["waiting", "received", "validating", "correction_requested", "reprocessing"].includes(d.status)).length;

  const statusData = [
    { name: t.dashboard.validated, value: approvedCount, color: "hsl(142, 71%, 45%)" },
    { name: t.dashboard.pending, value: pendingCount, color: "hsl(38, 92%, 50%)" },
    { name: t.dashboard.rejected, value: rejectedCount, color: "hsl(0, 72%, 51%)" },
    { name: t.dashboard.submitted, value: documents.filter(d => d.status === "submitted").length, color: "hsl(220, 70%, 50%)" },
  ];

  const deadlines = [
    { doc: "NR-10 - João Oliveira", deadline: "Apr 8", risk: "critical" as const },
    { doc: "FGTS - Pedro Mendes", deadline: "Apr 10", risk: "high" as const },
    { doc: "ASO - 12 Workers (Petrobras)", deadline: "Apr 15", risk: "medium" as const },
    { doc: "NR-35 - Amanda Rocha", deadline: "Apr 20", risk: "low" as const },
  ];

  return (
    <div className="p-4 md:p-6 space-y-4 md:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <h1 className="page-header">{t.dashboard.title}</h1>
          <p className="page-subheader">{t.dashboard.subtitle}</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="agent-badge"><Bot className="w-3 h-3" />{t.dashboard.agentActive}</div>
          <span className="text-xs text-muted-foreground">{t.dashboard.lastSync}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        <MetricCard title={t.dashboard.docsProcessed} value={String(documents.length)} change={t.dashboard.changeDocsProcessed} changeType="positive" icon={FileStack} />
        <MetricCard title={t.dashboard.autoValidated} value={String(approvedCount)} change={`${documents.length > 0 ? ((approvedCount / documents.length) * 100).toFixed(1) : 0}%`} changeType="positive" icon={CheckCircle2} iconColor="bg-success/10" />
        <MetricCard title={t.dashboard.pendingValidation} value={String(pendingCount)} change={`${counts.openPending} open`} changeType="negative" icon={Clock} iconColor="bg-warning/10" />
        <MetricCard title={t.dashboard.rejected} value={String(rejectedCount)} changeType="positive" icon={XCircle} iconColor="bg-destructive/10" />
        <MetricCard title={t.dashboard.submittedToClients} value={String(documents.filter(d => d.status === "submitted").length)} changeType="positive" icon={Send} />
        <MetricCard title={t.dashboard.complianceRate} value="94.7%" change={t.dashboard.changeCompliance} changeType="positive" icon={TrendingUp} iconColor="bg-success/10" />
        <MetricCard title={t.dashboard.contractsAtRisk} value="3" change={t.dashboard.changeContracts} changeType="negative" icon={AlertTriangle} iconColor="bg-warning/10" />
        <MetricCard title={t.dashboard.blockedWorkers} value={String(counts.blockedWorkers)} changeType="negative" icon={Ban} iconColor="bg-destructive/10" />
        <MetricCard title={t.dashboard.expiringSoon} value="24" change={t.dashboard.changeExpiring} changeType="neutral" icon={CalendarClock} />
        <div className="metric-card cursor-pointer" onClick={() => navigate("/exceptions")}>
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{t.exceptions?.title || "Exceptions"}</p>
          <p className="text-2xl font-bold text-foreground mt-1">{counts.openExceptions}</p>
          <p className="text-[10px] text-destructive mt-1">{counts.criticalExceptions} critical</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
        <div className="lg:col-span-2 bg-card rounded-lg border p-4">
          <h3 className="text-sm font-semibold text-foreground mb-4">{t.dashboard.weeklyChart}</h3>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 13%, 89%)" />
              <XAxis dataKey="day" tick={{ fontSize: 12, fill: "hsl(220, 10%, 46%)" }} />
              <YAxis tick={{ fontSize: 12, fill: "hsl(220, 10%, 46%)" }} />
              <Tooltip contentStyle={{ background: "hsl(0, 0%, 100%)", border: "1px solid hsl(220, 13%, 89%)", borderRadius: "8px", fontSize: "12px" }} />
              <Bar dataKey="validated" fill="hsl(142, 71%, 45%)" radius={[4, 4, 0, 0]} name={t.dashboard.validated} />
              <Bar dataKey="rejected" fill="hsl(0, 72%, 51%)" radius={[4, 4, 0, 0]} name={t.dashboard.rejected} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-card rounded-lg border p-4">
          <h3 className="text-sm font-semibold text-foreground mb-4">{t.dashboard.statusChart}</h3>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={statusData} cx="50%" cy="50%" innerRadius={50} outerRadius={75} dataKey="value" paddingAngle={2}>
                {statusData.map((entry, index) => <Cell key={index} fill={entry.color} />)}
              </Pie>
              <Tooltip contentStyle={{ background: "hsl(0, 0%, 100%)", border: "1px solid hsl(220, 13%, 89%)", borderRadius: "8px", fontSize: "12px" }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-1.5 mt-2">
            {statusData.map((item) => (
              <div key={item.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: item.color }} />
                  <span className="text-muted-foreground">{item.name}</span>
                </div>
                <span className="font-medium text-foreground">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
        <div className="bg-card rounded-lg border p-4">
          <h3 className="text-sm font-semibold text-foreground mb-4">{t.dashboard.recentActivity}</h3>
          <div className="space-y-3">
            {activityTimeline.map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${item.type === "agent" ? "bg-primary/10" : item.type === "human" ? "bg-warning/10" : "bg-muted"}`}>
                  {item.type === "agent" ? <Bot className="w-3 h-3 text-primary" /> : item.type === "human" ? <User className="w-3 h-3 text-warning" /> : <Zap className="w-3 h-3 text-muted-foreground" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-foreground leading-relaxed">{item.action}</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-card rounded-lg border p-4">
          <h3 className="text-sm font-semibold text-foreground mb-4">{t.dashboard.upcomingDeadlines}</h3>
          <div className="space-y-3">
            {deadlines.map((item, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                <div className="min-w-0 flex-1 mr-2">
                  <p className="text-xs font-medium text-foreground truncate">{item.doc}</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">{t.dashboard.due}: {item.deadline}</p>
                </div>
                <StatusBadge status={item.risk} />
              </div>
            ))}
          </div>
        </div>

        <div className="bg-card rounded-lg border p-4">
          <h3 className="text-sm font-semibold text-foreground mb-4">{t.dashboard.clientCompliance}</h3>
          <div className="space-y-3">
            {clients.map((client) => (
              <div key={client.id} className="space-y-1.5 cursor-pointer" onClick={() => navigate(`/clients/${client.id}`)}>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-foreground">{client.name}</span>
                  <span className={`text-xs font-bold ${client.compliance >= 95 ? "text-success" : client.compliance >= 90 ? "text-info" : client.compliance >= 85 ? "text-warning" : "text-destructive"}`}>{client.compliance}%</span>
                </div>
                <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                  <div className={`h-full rounded-full transition-all ${client.compliance >= 95 ? "bg-success" : client.compliance >= 90 ? "bg-info" : client.compliance >= 85 ? "bg-warning" : "bg-destructive"}`} style={{ width: `${client.compliance}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
