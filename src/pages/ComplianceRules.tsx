import { useState } from "react";
import { useApp } from "@/stores/AppStore";
import { useLanguage } from "@/i18n/LanguageContext";
import { ShieldCheck, Plus, Edit2, ToggleLeft, ToggleRight } from "lucide-react";
import { toast } from "sonner";

export default function ComplianceRules() {
  const { locale } = useLanguage();
  const { rules, toggleRuleActive, updateRule } = useApp();
  const [editing, setEditing] = useState<number | null>(null);
  const t = locale === "pt-BR";

  return (
    <div className="p-4 md:p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div><h1 className="page-header">{t ? "Regras de Conformidade" : "Compliance Rules"}</h1><p className="page-subheader">{t ? "Motor de regras documentais" : "Document rules engine"}</p></div>
        <button className="flex items-center gap-2 px-4 py-2 text-xs font-medium rounded-md bg-primary text-primary-foreground hover:bg-primary/90"><Plus className="w-3.5 h-3.5" />{t ? "Nova Regra" : "New Rule"}</button>
      </div>
      <div className="bg-card rounded-lg border overflow-x-auto">
        <table className="w-full text-xs min-w-[1000px]">
          <thead><tr className="border-b bg-muted/30">
            <th className="text-left p-3 font-medium text-muted-foreground">{t ? "Regra" : "Rule"}</th>
            <th className="text-left p-3 font-medium text-muted-foreground">{t ? "Cliente" : "Client"}</th>
            <th className="text-left p-3 font-medium text-muted-foreground">{t ? "Tipo Doc" : "Doc Type"}</th>
            <th className="text-left p-3 font-medium text-muted-foreground">{t ? "Frequência" : "Frequency"}</th>
            <th className="text-left p-3 font-medium text-muted-foreground">{t ? "Prazo" : "Deadline"}</th>
            <th className="text-left p-3 font-medium text-muted-foreground">{t ? "Prioridade" : "Priority"}</th>
            <th className="text-left p-3 font-medium text-muted-foreground">{t ? "Impacto" : "Impact"}</th>
            <th className="text-left p-3 font-medium text-muted-foreground">{t ? "Status" : "Status"}</th>
            <th className="text-left p-3 font-medium text-muted-foreground">{t ? "Ações" : "Actions"}</th>
          </tr></thead>
          <tbody>
            {rules.map(rule => (
              <tr key={rule.id} className="border-b last:border-0">
                <td className="p-3 font-medium text-foreground"><ShieldCheck className="w-3 h-3 text-primary inline mr-1" />{rule.name}</td>
                <td className="p-3 text-muted-foreground">{rule.clientName}</td>
                <td className="p-3 text-foreground">{rule.docTypeName}</td>
                <td className="p-3 text-muted-foreground">{rule.frequency}</td>
                <td className="p-3 text-muted-foreground">{rule.deadline}</td>
                <td className="p-3"><span className={`text-xs font-medium ${rule.priority === "critical" ? "text-destructive" : rule.priority === "high" ? "text-warning" : "text-muted-foreground"}`}>{rule.priority}</span></td>
                <td className="p-3 text-muted-foreground text-[10px]">{rule.impact}</td>
                <td className="p-3">
                  <button onClick={() => { toggleRuleActive(rule.id); toast.info(rule.active ? (t ? "Regra desativada" : "Rule deactivated") : (t ? "Regra ativada" : "Rule activated")); }}>
                    {rule.active ? <ToggleRight className="w-5 h-5 text-success" /> : <ToggleLeft className="w-5 h-5 text-muted-foreground" />}
                  </button>
                </td>
                <td className="p-3"><button className="p-1.5 rounded hover:bg-muted"><Edit2 className="w-3 h-3 text-muted-foreground" /></button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
