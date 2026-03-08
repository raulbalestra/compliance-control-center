import { useState } from "react";
import { useApp } from "@/stores/AppStore";
import { useLanguage } from "@/i18n/LanguageContext";
import { StatusBadge } from "@/components/StatusBadge";
import { Plus, Edit2, ToggleLeft, ToggleRight, X } from "lucide-react";
import { toast } from "sonner";

export default function AdminDocTypes() {
  const { locale } = useLanguage();
  const { docTypes, updateDocType, addDocType } = useApp();
  const [creating, setCreating] = useState(false);
  const t = locale === "pt-BR";

  return (
    <div className="p-4 md:p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div><h1 className="page-header">{t ? "Tipos de Documento" : "Document Types"}</h1><p className="page-subheader">{t ? "Configuração de tipos documentais" : "Document type configuration"}</p></div>
        <button onClick={() => setCreating(true)} className="flex items-center gap-2 px-4 py-2 text-xs font-medium rounded-md bg-primary text-primary-foreground hover:bg-primary/90"><Plus className="w-3.5 h-3.5" />{t ? "Novo Tipo" : "New Type"}</button>
      </div>
      <div className="bg-card rounded-lg border overflow-x-auto">
        <table className="w-full text-xs min-w-[800px]">
          <thead><tr className="border-b bg-muted/30">
            <th className="text-left p-3 font-medium text-muted-foreground">{t ? "Nome" : "Name"}</th>
            <th className="text-left p-3 font-medium text-muted-foreground">{t ? "Categoria" : "Category"}</th>
            <th className="text-left p-3 font-medium text-muted-foreground">{t ? "Criticidade" : "Criticality"}</th>
            <th className="text-left p-3 font-medium text-muted-foreground">{t ? "Validade" : "Validity"}</th>
            <th className="text-left p-3 font-medium text-muted-foreground">{t ? "Recorrência" : "Recurrence"}</th>
            <th className="text-left p-3 font-medium text-muted-foreground">{t ? "Formatos" : "Formats"}</th>
            <th className="text-left p-3 font-medium text-muted-foreground">{t ? "Obrigatório" : "Required"}</th>
            <th className="text-left p-3 font-medium text-muted-foreground">Status</th>
            <th className="text-left p-3 font-medium text-muted-foreground">{t ? "Ações" : "Actions"}</th>
          </tr></thead>
          <tbody>
            {docTypes.map(dt => (
              <tr key={dt.id} className="border-b last:border-0">
                <td className="p-3 font-medium text-foreground">{dt.name}</td>
                <td className="p-3 text-muted-foreground">{dt.category}</td>
                <td className="p-3"><StatusBadge status={dt.criticality} /></td>
                <td className="p-3 text-muted-foreground">{dt.validity}</td>
                <td className="p-3 text-muted-foreground">{dt.recurrence}</td>
                <td className="p-3"><div className="flex gap-1">{dt.acceptedFormats.map(f => <span key={f} className="px-1.5 py-0.5 text-[10px] rounded bg-muted">{f}</span>)}</div></td>
                <td className="p-3">{dt.mandatory ? <span className="text-success text-xs">✓</span> : <span className="text-muted-foreground text-xs">—</span>}</td>
                <td className="p-3">
                  <button onClick={() => { updateDocType(dt.id, { active: !dt.active }); toast.info(dt.active ? (t ? "Desativado" : "Deactivated") : (t ? "Ativado" : "Activated")); }}>
                    {dt.active ? <ToggleRight className="w-5 h-5 text-success" /> : <ToggleLeft className="w-5 h-5 text-muted-foreground" />}
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
