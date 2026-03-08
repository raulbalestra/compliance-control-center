import { useLanguage } from "@/i18n/LanguageContext";
import { useState } from "react";
import { toast } from "sonner";
import { Save } from "lucide-react";

export default function AdminSystemSettings() {
  const { locale } = useLanguage();
  const t = locale === "pt-BR";

  const [settings, setSettings] = useState({
    statuses: ["waiting", "received", "validating", "approved", "rejected", "submitted", "correction_requested", "exception"],
    rejectionReasons: ["Expired document", "Invalid format", "Missing fields", "Unreadable scan", "Name mismatch", "Data inconsistency"],
    slaDefault: "48",
    categories: ["Health & Safety", "Training", "Labor", "Compliance", "Professional"],
    processTypes: ["Monthly Compliance", "Onboarding", "Renewal", "Audit"],
    maxFileSize: "25",
    acceptedFormats: "PDF, JPG, PNG, TIFF, XML",
  });

  return (
    <div className="p-4 md:p-6 space-y-4 max-w-4xl">
      <div><h1 className="page-header">{t ? "Configurações do Sistema" : "System Settings"}</h1><p className="page-subheader">{t ? "Parâmetros gerais da plataforma" : "General platform parameters"}</p></div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-card rounded-lg border p-5 space-y-3">
          <h3 className="text-sm font-semibold text-foreground">{t ? "Status de Documentos" : "Document Statuses"}</h3>
          <div className="flex flex-wrap gap-1.5">{settings.statuses.map(s => <span key={s} className="px-2 py-0.5 text-xs rounded-full bg-muted text-muted-foreground">{s}</span>)}</div>
        </div>
        <div className="bg-card rounded-lg border p-5 space-y-3">
          <h3 className="text-sm font-semibold text-foreground">{t ? "Motivos de Rejeição" : "Rejection Reasons"}</h3>
          <div className="flex flex-wrap gap-1.5">{settings.rejectionReasons.map(r => <span key={r} className="px-2 py-0.5 text-xs rounded-full bg-destructive/10 text-destructive">{r}</span>)}</div>
        </div>
        <div className="bg-card rounded-lg border p-5 space-y-3">
          <h3 className="text-sm font-semibold text-foreground">{t ? "Parâmetros de SLA" : "SLA Parameters"}</h3>
          <div><label className="text-xs text-muted-foreground">{t ? "SLA padrão (horas)" : "Default SLA (hours)"}</label><input className="w-full mt-1 px-3 py-2 text-xs border border-input rounded-md bg-background" value={settings.slaDefault} onChange={e => setSettings({...settings, slaDefault: e.target.value})} /></div>
        </div>
        <div className="bg-card rounded-lg border p-5 space-y-3">
          <h3 className="text-sm font-semibold text-foreground">{t ? "Categorias" : "Categories"}</h3>
          <div className="flex flex-wrap gap-1.5">{settings.categories.map(c => <span key={c} className="px-2 py-0.5 text-xs rounded-full bg-primary/10 text-primary">{c}</span>)}</div>
        </div>
        <div className="bg-card rounded-lg border p-5 space-y-3">
          <h3 className="text-sm font-semibold text-foreground">{t ? "Tipos de Processo" : "Process Types"}</h3>
          <div className="flex flex-wrap gap-1.5">{settings.processTypes.map(p => <span key={p} className="px-2 py-0.5 text-xs rounded-full bg-muted text-muted-foreground">{p}</span>)}</div>
        </div>
        <div className="bg-card rounded-lg border p-5 space-y-3">
          <h3 className="text-sm font-semibold text-foreground">{t ? "Parâmetros de Upload" : "Upload Parameters"}</h3>
          <div><label className="text-xs text-muted-foreground">{t ? "Tamanho máximo (MB)" : "Max file size (MB)"}</label><input className="w-full mt-1 px-3 py-2 text-xs border border-input rounded-md bg-background" value={settings.maxFileSize} onChange={e => setSettings({...settings, maxFileSize: e.target.value})} /></div>
          <div><label className="text-xs text-muted-foreground">{t ? "Formatos aceitos" : "Accepted formats"}</label><input className="w-full mt-1 px-3 py-2 text-xs border border-input rounded-md bg-background" value={settings.acceptedFormats} onChange={e => setSettings({...settings, acceptedFormats: e.target.value})} /></div>
        </div>
      </div>
      <button onClick={() => toast.success(t ? "Configurações salvas" : "Settings saved")} className="flex items-center gap-2 px-4 py-2 text-xs font-medium rounded-md bg-primary text-primary-foreground hover:bg-primary/90"><Save className="w-3.5 h-3.5" />{t ? "Salvar Configurações" : "Save Settings"}</button>
    </div>
  );
}
