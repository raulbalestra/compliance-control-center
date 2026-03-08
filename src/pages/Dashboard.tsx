import {
  FileStack, CheckCircle2, Clock, XCircle, Send, TrendingUp,
  AlertTriangle, Ban, CalendarClock, Bot, User, Zap,
} from "lucide-react";
import { MetricCard } from "@/components/MetricCard";
import { StatusBadge } from "@/components/StatusBadge";
import { activityTimeline, clients } from "@/lib/mockData";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell,
} from "recharts";

const statusData = [
  { name: "Validated", value: 1245, color: "hsl(142, 71%, 45%)" },
  { name: "Pending", value: 342, color: "hsl(38, 92%, 50%)" },
  { name: "Rejected", value: 89, color: "hsl(0, 72%, 51%)" },
  { name: "Submitted", value: 1156, color: "hsl(220, 70%, 50%)" },
];

const weeklyData = [
  { day: "Mon", processed: 245, validated: 220, rejected: 12 },
  { day: "Tue", processed: 312, validated: 290, rejected: 8 },
  { day: "Wed", processed: 278, validated: 260, rejected: 15 },
  { day: "Thu", processed: 356, validated: 330, rejected: 11 },
  { day: "Fri", processed: 289, validated: 270, rejected: 6 },
];

const deadlines = [
  { doc: "NR-10 - João Oliveira", deadline: "Apr 8", risk: "critical" as const },
  { doc: "FGTS - Pedro Mendes", deadline: "Apr 10", risk: "high" as const },
  { doc: "ASO - 12 Workers (Petrobras)", deadline: "Apr 15", risk: "medium" as const },
  { doc: "NR-35 - Amanda Rocha", deadline: "Apr 20", risk: "low" as const },
];

const rejections = [
  { doc: "eSocial - Lucia Ferreira", reason: "Invalid XML format", client: "Shell Brasil" },
  { doc: "NR-10 - João Oliveira", reason: "Certificate expired", client: "Petrobras" },
  { doc: "FGTS - Roberto Dias", reason: "Unreadable scan", client: "Petrobras" },
];

export default function Dashboard() {
  return (
    <div className="p-4 md:p-6 space-y-4 md:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <h1 className="page-header">Operations Dashboard</h1>
          <p className="page-subheader">Compliance Control Center — Real-time overview</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="agent-badge">
            <Bot className="w-3 h-3" />
            Agent Active
          </div>
          <span className="text-xs text-muted-foreground">Last sync: 2 min ago</span>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4">
        <MetricCard title="Documents Processed" value="1,676" change="+12% vs last month" changeType="positive" icon={FileStack} />
        <MetricCard title="Auto-Validated" value="1,245" change="74.3% automation rate" changeType="positive" icon={CheckCircle2} iconColor="bg-success/10" />
        <MetricCard title="Pending Validation" value="342" change="18 high priority" changeType="negative" icon={Clock} iconColor="bg-warning/10" />
        <MetricCard title="Rejected" value="89" change="-8% vs last month" changeType="positive" icon={XCircle} iconColor="bg-destructive/10" />
        <MetricCard title="Submitted to Clients" value="1,156" change="Success rate: 96.2%" changeType="positive" icon={Send} />
        <MetricCard title="Compliance Rate" value="94.7%" change="+2.1% vs last month" changeType="positive" icon={TrendingUp} iconColor="bg-success/10" />
        <MetricCard title="Contracts at Risk" value="3" change="2 critical deadlines" changeType="negative" icon={AlertTriangle} iconColor="bg-warning/10" />
        <MetricCard title="Blocked Workers" value="7" change="Pending documentation" changeType="negative" icon={Ban} iconColor="bg-destructive/10" />
        <MetricCard title="Expiring Soon" value="24" change="Within next 30 days" changeType="neutral" icon={CalendarClock} />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 md:gap-4">
        <div className="lg:col-span-2 bg-card rounded-lg border p-4 md:p-5">
          <h3 className="text-sm font-semibold text-foreground mb-4">Documents Processed This Week</h3>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 13%, 89%)" />
              <XAxis dataKey="day" tick={{ fontSize: 12, fill: "hsl(220, 10%, 46%)" }} />
              <YAxis tick={{ fontSize: 12, fill: "hsl(220, 10%, 46%)" }} />
              <Tooltip contentStyle={{ background: "hsl(0, 0%, 100%)", border: "1px solid hsl(220, 13%, 89%)", borderRadius: "8px", fontSize: "12px" }} />
              <Bar dataKey="validated" fill="hsl(142, 71%, 45%)" radius={[4, 4, 0, 0]} name="Validated" />
              <Bar dataKey="rejected" fill="hsl(0, 72%, 51%)" radius={[4, 4, 0, 0]} name="Rejected" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-card rounded-lg border p-4 md:p-5">
          <h3 className="text-sm font-semibold text-foreground mb-4">Documents by Status</h3>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={statusData} cx="50%" cy="50%" innerRadius={50} outerRadius={75} dataKey="value" paddingAngle={2}>
                {statusData.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
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

      {/* Bottom Widgets */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 md:gap-4">
        <div className="bg-card rounded-lg border p-4 md:p-5">
          <h3 className="text-sm font-semibold text-foreground mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {activityTimeline.map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                  item.type === "agent" ? "bg-primary/10" : item.type === "human" ? "bg-warning/10" : "bg-muted"
                }`}>
                  {item.type === "agent" ? <Bot className="w-3 h-3 text-primary" /> :
                   item.type === "human" ? <User className="w-3 h-3 text-warning" /> :
                   <Zap className="w-3 h-3 text-muted-foreground" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-foreground leading-relaxed">{item.action}</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-card rounded-lg border p-4 md:p-5">
          <h3 className="text-sm font-semibold text-foreground mb-4">Upcoming Deadlines</h3>
          <div className="space-y-3">
            {deadlines.map((item, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                <div className="min-w-0 flex-1 mr-2">
                  <p className="text-xs font-medium text-foreground truncate">{item.doc}</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">Due: {item.deadline}</p>
                </div>
                <StatusBadge status={item.risk} />
              </div>
            ))}
          </div>
        </div>

        <div className="bg-card rounded-lg border p-4 md:p-5">
          <h3 className="text-sm font-semibold text-foreground mb-4">Client Compliance</h3>
          <div className="space-y-3">
            {clients.map((client) => (
              <div key={client.id} className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-foreground">{client.name}</span>
                  <span className={`text-xs font-bold ${
                    client.compliance >= 95 ? "text-success" :
                    client.compliance >= 90 ? "text-info" :
                    client.compliance >= 85 ? "text-warning" : "text-destructive"
                  }`}>{client.compliance}%</span>
                </div>
                <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${
                      client.compliance >= 95 ? "bg-success" :
                      client.compliance >= 90 ? "bg-info" :
                      client.compliance >= 85 ? "bg-warning" : "bg-destructive"
                    }`}
                    style={{ width: `${client.compliance}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <h3 className="text-sm font-semibold text-foreground mt-6 mb-3">Recent Rejections</h3>
          <div className="space-y-2">
            {rejections.map((item, i) => (
              <div key={i} className="p-2 rounded bg-destructive/5 border border-destructive/10">
                <p className="text-xs font-medium text-foreground">{item.doc}</p>
                <p className="text-[10px] text-destructive mt-0.5">{item.reason}</p>
                <p className="text-[10px] text-muted-foreground">{item.client}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
