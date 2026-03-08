import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell,
} from "recharts";

const monthlyData = [
  { month: "Jan", processed: 1120, validated: 980, rejected: 65 },
  { month: "Feb", processed: 1340, validated: 1200, rejected: 72 },
  { month: "Mar", processed: 1560, validated: 1420, rejected: 58 },
  { month: "Apr", processed: 1676, validated: 1540, rejected: 89 },
];

const complianceRate = [
  { month: "Jan", rate: 91.2 },
  { month: "Feb", rate: 92.8 },
  { month: "Mar", rate: 93.5 },
  { month: "Apr", rate: 94.7 },
];

const errorTypes = [
  { name: "Expired document", value: 34, color: "hsl(0, 72%, 51%)" },
  { name: "Name mismatch", value: 22, color: "hsl(25, 95%, 53%)" },
  { name: "Missing fields", value: 18, color: "hsl(38, 92%, 50%)" },
  { name: "Unreadable scan", value: 10, color: "hsl(200, 80%, 50%)" },
  { name: "Format error", value: 5, color: "hsl(220, 10%, 46%)" },
];

const clientSubmissions = [
  { client: "Petrobras", submitted: 680 },
  { client: "Shell", submitted: 312 },
  { client: "TotalEnergies", submitted: 98 },
  { client: "Equinor", submitted: 66 },
];

const tooltipStyle = {
  background: "hsl(0, 0%, 100%)",
  border: "1px solid hsl(220, 13%, 89%)",
  borderRadius: "8px",
  fontSize: "12px",
};

export default function Reports() {
  return (
    <div className="p-4 md:p-6 space-y-4 md:space-y-6">
      <div>
        <h1 className="page-header">Reports</h1>
        <p className="page-subheader">Compliance analytics and performance reporting</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 md:gap-4">
        <div className="bg-card rounded-lg border p-4 md:p-5">
          <h3 className="text-sm font-semibold text-foreground mb-4">Documents Processed by Month</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 13%, 89%)" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: "hsl(220, 10%, 46%)" }} />
              <YAxis tick={{ fontSize: 12, fill: "hsl(220, 10%, 46%)" }} />
              <Tooltip contentStyle={tooltipStyle} />
              <Bar dataKey="validated" fill="hsl(142, 71%, 45%)" radius={[4, 4, 0, 0]} name="Validated" />
              <Bar dataKey="rejected" fill="hsl(0, 72%, 51%)" radius={[4, 4, 0, 0]} name="Rejected" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-card rounded-lg border p-4 md:p-5">
          <h3 className="text-sm font-semibold text-foreground mb-4">Compliance Success Rate (%)</h3>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={complianceRate}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 13%, 89%)" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: "hsl(220, 10%, 46%)" }} />
              <YAxis domain={[88, 100]} tick={{ fontSize: 12, fill: "hsl(220, 10%, 46%)" }} />
              <Tooltip contentStyle={tooltipStyle} />
              <Line type="monotone" dataKey="rate" stroke="hsl(220, 70%, 50%)" strokeWidth={2} dot={{ fill: "hsl(220, 70%, 50%)", r: 4 }} name="Rate %" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-card rounded-lg border p-4 md:p-5">
          <h3 className="text-sm font-semibold text-foreground mb-4">Most Common Document Errors</h3>
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
            <ResponsiveContainer width="100%" height={200} className="sm:w-1/2">
              <PieChart>
                <Pie data={errorTypes} cx="50%" cy="50%" outerRadius={80} dataKey="value" paddingAngle={2}>
                  {errorTypes.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                </Pie>
                <Tooltip contentStyle={tooltipStyle} />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2 w-full sm:w-auto">
              {errorTypes.map((e) => (
                <div key={e.name} className="flex items-center gap-2 text-xs">
                  <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: e.color }} />
                  <span className="text-muted-foreground">{e.name}</span>
                  <span className="font-medium text-foreground ml-auto">{e.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-card rounded-lg border p-4 md:p-5">
          <h3 className="text-sm font-semibold text-foreground mb-4">Documents Submitted per Client</h3>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={clientSubmissions} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 13%, 89%)" />
              <XAxis type="number" tick={{ fontSize: 12, fill: "hsl(220, 10%, 46%)" }} />
              <YAxis dataKey="client" type="category" tick={{ fontSize: 12, fill: "hsl(220, 10%, 46%)" }} width={100} />
              <Tooltip contentStyle={tooltipStyle} />
              <Bar dataKey="submitted" fill="hsl(220, 70%, 50%)" radius={[0, 4, 4, 0]} name="Submitted" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-card rounded-lg border p-4 md:p-5">
        <h3 className="text-sm font-semibold text-foreground mb-3">Key Performance Indicators</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
          {[
            { label: "Avg Validation Time", value: "2.3 min" },
            { label: "Agent Automation Rate", value: "74.3%" },
            { label: "First-Pass Approval", value: "68.1%" },
            { label: "Documents Expiring (30d)", value: "24" },
            { label: "Platform Acceptance Rate", value: "96.2%" },
          ].map((kpi) => (
            <div key={kpi.label} className="text-center p-3 bg-muted/30 rounded-lg">
              <p className="text-xs text-muted-foreground">{kpi.label}</p>
              <p className="text-lg font-bold text-foreground mt-1">{kpi.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
