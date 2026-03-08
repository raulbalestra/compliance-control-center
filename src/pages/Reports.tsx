import { useApp } from "@/stores/AppStore";
import { useLanguage } from "@/i18n/LanguageContext";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell,
} from "recharts";

const tooltipStyle = { background: "hsl(0, 0%, 100%)", border: "1px solid hsl(220, 13%, 89%)", borderRadius: "8px", fontSize: "12px" };

export default function Reports() {
  const { locale } = useLanguage();
  const { documents, clients, counts } = useApp();
  const t = locale === "pt-BR";

  const approvedCount = documents.filter(d => ["approved", "ready", "submitted"].includes(d.status)).length;
  const rejectedCount = documents.filter(d => ["rejected", "validation_failed"].includes(d.status)).length;
  const pendingCount = documents.filter(d => ["waiting", "received", "validating", "correction_requested", "reprocessing"].includes(d.status)).length;

  const statusData = [
    { name: t ? "Aprovados" : "Approved", value: approvedCount, color: "hsl(142, 71%, 45%)" },
    { name: t ? "Pendentes" : "Pending", value: pendingCount, color: "hsl(38, 92%, 50%)" },
    { name: t ? "Rejeitados" : "Rejected", value: rejectedCount, color: "hsl(0, 72%, 51%)" },
  ];

  const clientData = clients.map(c => ({
    client: c.name,
    docs: documents.filter(d => d.clientId === c.id).length,
    compliance: c.compliance,
  }));

  const monthlyData = [
    { month: "Jan", validated: 980, rejected: 65 },
    { month: "Feb", validated: 1200, rejected: 72 },
    { month: "Mar", validated: 1420, rejected: 58 },
    { month: "Apr", validated: approvedCount * 10, rejected: rejectedCount * 5 },
  ];

  const kpis = [
    { label: t ? "Tempo Médio Validação" : "Avg Validation Time", value: "2.3 min" },
    { label: t ? "Taxa de Automação" : "Automation Rate", value: `${documents.length > 0 ? ((approvedCount / documents.length) * 100).toFixed(1) : 0}%` },
    { label: t ? "Total Documentos" : "Total Documents", value: String(documents.length) },
    { label: t ? "Exceções Abertas" : "Open Exceptions", value: String(counts.openExceptions) },
    { label: t ? "Colaboradores Bloqueados" : "Blocked Workers", value: String(counts.blockedWorkers) },
  ];

  return (
    <div className="p-4 md:p-6 space-y-4">
      <div><h1 className="page-header">{t ? "Relatórios" : "Reports"}</h1><p className="page-subheader">{t ? "Análises de conformidade e desempenho" : "Compliance analytics and performance"}</p></div>
      <div className="bg-card rounded-lg border p-4">
        <h3 className="text-sm font-semibold text-foreground mb-3">{t ? "Indicadores" : "KPIs"}</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {kpis.map(k => (
            <div key={k.label} className="text-center p-3 bg-muted/30 rounded-lg">
              <p className="text-xs text-muted-foreground">{k.label}</p>
              <p className="text-lg font-bold text-foreground mt-1">{k.value}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        <div className="bg-card rounded-lg border p-4">
          <h3 className="text-sm font-semibold text-foreground mb-4">{t ? "Documentos por Mês" : "Documents by Month"}</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 13%, 89%)" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: "hsl(220, 10%, 46%)" }} />
              <YAxis tick={{ fontSize: 12, fill: "hsl(220, 10%, 46%)" }} />
              <Tooltip contentStyle={tooltipStyle} />
              <Bar dataKey="validated" fill="hsl(142, 71%, 45%)" radius={[4, 4, 0, 0]} name={t ? "Validados" : "Validated"} />
              <Bar dataKey="rejected" fill="hsl(0, 72%, 51%)" radius={[4, 4, 0, 0]} name={t ? "Rejeitados" : "Rejected"} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-card rounded-lg border p-4">
          <h3 className="text-sm font-semibold text-foreground mb-4">{t ? "Distribuição por Status" : "Status Distribution"}</h3>
          <div className="flex items-center gap-6">
            <ResponsiveContainer width="50%" height={200}>
              <PieChart>
                <Pie data={statusData} cx="50%" cy="50%" outerRadius={80} dataKey="value" paddingAngle={2}>
                  {statusData.map((e, i) => <Cell key={i} fill={e.color} />)}
                </Pie>
                <Tooltip contentStyle={tooltipStyle} />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2">
              {statusData.map(s => (
                <div key={s.name} className="flex items-center gap-2 text-xs">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: s.color }} />
                  <span className="text-muted-foreground">{s.name}</span>
                  <span className="font-medium text-foreground ml-auto">{s.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="bg-card rounded-lg border p-4 lg:col-span-2">
          <h3 className="text-sm font-semibold text-foreground mb-4">{t ? "Documentos por Cliente" : "Documents per Client"}</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={clientData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 13%, 89%)" />
              <XAxis type="number" tick={{ fontSize: 12, fill: "hsl(220, 10%, 46%)" }} />
              <YAxis dataKey="client" type="category" tick={{ fontSize: 12, fill: "hsl(220, 10%, 46%)" }} width={100} />
              <Tooltip contentStyle={tooltipStyle} />
              <Bar dataKey="docs" fill="hsl(220, 70%, 50%)" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
