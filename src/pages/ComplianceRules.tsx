import { ShieldCheck, Plus } from "lucide-react";

const rules = [
  { id: 1, client: "Petrobras", contract: "All", docType: "Medical Certificate (ASO)", required: true, expiration: "12 months", frequency: "Annual", validation: "Signature + Date + Name match", deadline: "30 days before expiry", priority: "High" },
  { id: 2, client: "Petrobras", contract: "Refinery Maintenance", docType: "NR-10 Certificate", required: true, expiration: "24 months", frequency: "Biennial", validation: "Certificate number + Training provider", deadline: "60 days before expiry", priority: "Critical" },
  { id: 3, client: "Shell Brasil", contract: "All", docType: "NR-35 Training", required: true, expiration: "24 months", frequency: "Biennial", validation: "Certificate + Signature + Provider", deadline: "45 days before expiry", priority: "High" },
  { id: 4, client: "All", contract: "All", docType: "Payroll Receipt", required: true, expiration: "Monthly", frequency: "Monthly", validation: "Worker name + CPF + Period", deadline: "10th of following month", priority: "Medium" },
  { id: 5, client: "All", contract: "All", docType: "FGTS Payment Proof", required: true, expiration: "Monthly", frequency: "Monthly", validation: "Company CNPJ + Period + Amount", deadline: "48 hours after due date", priority: "High" },
  { id: 6, client: "TotalEnergies", contract: "Gas Plant Upgrade", docType: "NR-33 Certificate", required: true, expiration: "12 months", frequency: "Annual", validation: "Certificate + Provider + Hours", deadline: "30 days before expiry", priority: "Critical" },
];

export default function ComplianceRules() {
  return (
    <div className="p-4 md:p-6 space-y-4 md:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <h1 className="page-header">Compliance Rules</h1>
          <p className="page-subheader">Rule engine configuration — Define validation and submission requirements</p>
        </div>
        <button className="flex items-center justify-center gap-2 px-4 py-2 text-xs font-medium rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors w-full sm:w-auto">
          <Plus className="w-3.5 h-3.5" /> New Rule
        </button>
      </div>

      {/* Desktop table */}
      <div className="hidden md:block bg-card rounded-lg border overflow-x-auto">
        <table className="w-full text-xs min-w-[900px]">
          <thead>
            <tr className="border-b bg-muted/30">
              <th className="text-left p-3 font-medium text-muted-foreground">Client</th>
              <th className="text-left p-3 font-medium text-muted-foreground">Contract</th>
              <th className="text-left p-3 font-medium text-muted-foreground">Document Type</th>
              <th className="text-left p-3 font-medium text-muted-foreground">Required</th>
              <th className="text-left p-3 font-medium text-muted-foreground">Expiration</th>
              <th className="text-left p-3 font-medium text-muted-foreground">Frequency</th>
              <th className="text-left p-3 font-medium text-muted-foreground">Validation Rules</th>
              <th className="text-left p-3 font-medium text-muted-foreground">Deadline</th>
              <th className="text-left p-3 font-medium text-muted-foreground">Priority</th>
            </tr>
          </thead>
          <tbody>
            {rules.map((rule) => (
              <tr key={rule.id} className="border-b last:border-0 table-row-interactive">
                <td className="p-3 font-medium text-foreground">{rule.client}</td>
                <td className="p-3 text-muted-foreground">{rule.contract}</td>
                <td className="p-3 text-foreground">
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3 h-3 text-primary shrink-0" />{rule.docType}
                  </span>
                </td>
                <td className="p-3">
                  <span className={`text-xs font-medium ${rule.required ? "text-foreground" : "text-muted-foreground"}`}>
                    {rule.required ? "Mandatory" : "Optional"}
                  </span>
                </td>
                <td className="p-3 text-muted-foreground">{rule.expiration}</td>
                <td className="p-3 text-muted-foreground">{rule.frequency}</td>
                <td className="p-3 text-muted-foreground max-w-[200px]">{rule.validation}</td>
                <td className="p-3 text-muted-foreground">{rule.deadline}</td>
                <td className="p-3">
                  <span className={`text-xs font-medium ${
                    rule.priority === "Critical" ? "text-destructive" :
                    rule.priority === "High" ? "text-warning" : "text-muted-foreground"
                  }`}>{rule.priority}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="md:hidden space-y-3">
        {rules.map((rule) => (
          <div key={rule.id} className="bg-card rounded-lg border p-4 space-y-2">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-primary shrink-0" />
                <span className="text-sm font-medium text-foreground">{rule.docType}</span>
              </div>
              <span className={`text-xs font-medium ${
                rule.priority === "Critical" ? "text-destructive" :
                rule.priority === "High" ? "text-warning" : "text-muted-foreground"
              }`}>{rule.priority}</span>
            </div>
            <div className="text-xs text-muted-foreground space-y-1">
              <p><span className="font-medium text-foreground">Client:</span> {rule.client} · {rule.contract}</p>
              <p><span className="font-medium text-foreground">Expiration:</span> {rule.expiration} · {rule.frequency}</p>
              <p><span className="font-medium text-foreground">Validation:</span> {rule.validation}</p>
              <p><span className="font-medium text-foreground">Deadline:</span> {rule.deadline}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
