import { useState } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { useAuth } from "@/stores/AuthContext";
import { useNavigate } from "react-router-dom";
import { FileText, Clock, Upload as UploadIcon, AlertTriangle, CheckCircle2, Send } from "lucide-react";

const portalDocs = [
  { id: 1, name: "NR-10 Certificate", status: "approved", expiration: "2025-03-10", lastUpdate: "Apr 5" },
  { id: 2, name: "Medical Certificate (ASO)", status: "waiting", expiration: "2024-06-15", lastUpdate: "Apr 3" },
  { id: 3, name: "Payroll Receipt - March", status: "rejected", expiration: "2024-04-10", lastUpdate: "Apr 4", reason: "Missing signature" },
  { id: 4, name: "FGTS Payment Proof", status: "submitted", expiration: "2024-04-30", lastUpdate: "Apr 5" },
];

const portalPending = [
  { id: 1, doc: "Medical Certificate (ASO)", deadline: "2024-04-15", description: "Pending submission - expires soon" },
  { id: 2, doc: "Payroll Receipt - March", deadline: "2024-04-10", description: "Rejected - resubmit with signature" },
];

export default function PortalDashboard() {
  const { locale } = useLanguage();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const t = locale === "pt-BR";

  return (
    <div className="min-h-screen bg-background">
      <header className="h-14 bg-card border-b border-border flex items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center"><FileText className="w-4 h-4 text-primary-foreground" /></div>
          <span className="text-sm font-semibold text-foreground">{t ? "Portal do Fornecedor" : "Provider Portal"}</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-muted-foreground">{user?.name}</span>
          <button onClick={() => { logout(); navigate("/login"); }} className="text-xs text-destructive hover:underline">{t ? "Sair" : "Logout"}</button>
        </div>
      </header>

      <div className="p-4 md:p-6 max-w-5xl mx-auto space-y-4">
        <div><h1 className="page-header">{t ? "Meus Documentos" : "My Documents"}</h1><p className="page-subheader">{t ? "Gerencie seus documentos e pendências" : "Manage your documents and pending items"}</p></div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="metric-card"><p className="text-xs text-muted-foreground uppercase">{t ? "Total Docs" : "Total Docs"}</p><p className="text-2xl font-bold mt-1">{portalDocs.length}</p></div>
          <div className="metric-card"><p className="text-xs text-muted-foreground uppercase">{t ? "Pendentes" : "Pending"}</p><p className="text-2xl font-bold text-warning mt-1">{portalPending.length}</p></div>
          <div className="metric-card"><p className="text-xs text-muted-foreground uppercase">{t ? "Aprovados" : "Approved"}</p><p className="text-2xl font-bold text-success mt-1">{portalDocs.filter(d => d.status === "approved").length}</p></div>
          <div className="metric-card"><p className="text-xs text-muted-foreground uppercase">{t ? "Rejeitados" : "Rejected"}</p><p className="text-2xl font-bold text-destructive mt-1">{portalDocs.filter(d => d.status === "rejected").length}</p></div>
        </div>

        {portalPending.length > 0 && (
          <div className="bg-warning/5 border border-warning/20 rounded-lg p-4">
            <h3 className="text-sm font-semibold text-foreground flex items-center gap-2 mb-3"><AlertTriangle className="w-4 h-4 text-warning" />{t ? "Ações Pendentes" : "Pending Actions"}</h3>
            <div className="space-y-2">
              {portalPending.map(p => (
                <div key={p.id} className="flex items-center justify-between p-3 bg-card rounded-lg border">
                  <div><p className="text-xs font-medium text-foreground">{p.doc}</p><p className="text-[10px] text-muted-foreground">{p.description}</p></div>
                  <div className="text-right"><p className="text-[10px] text-muted-foreground">{t ? "Prazo" : "Deadline"}: {p.deadline}</p>
                    <button className="mt-1 px-3 py-1 text-xs font-medium rounded bg-primary text-primary-foreground hover:bg-primary/90">{t ? "Enviar" : "Submit"}</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-foreground">{t ? "Documentos Enviados" : "Submitted Documents"}</h3>
            <button onClick={() => navigate("/portal/upload")} className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-md bg-primary text-primary-foreground hover:bg-primary/90"><UploadIcon className="w-3.5 h-3.5" />{t ? "Enviar Documento" : "Upload Document"}</button>
          </div>
          <div className="bg-card rounded-lg border overflow-x-auto">
            <table className="w-full text-xs">
              <thead><tr className="border-b bg-muted/30">
                <th className="text-left p-3 font-medium text-muted-foreground">{t ? "Documento" : "Document"}</th>
                <th className="text-left p-3 font-medium text-muted-foreground">Status</th>
                <th className="text-left p-3 font-medium text-muted-foreground">{t ? "Vencimento" : "Expiration"}</th>
                <th className="text-left p-3 font-medium text-muted-foreground">{t ? "Atualizado" : "Updated"}</th>
                <th className="text-left p-3 font-medium text-muted-foreground">{t ? "Ações" : "Actions"}</th>
              </tr></thead>
              <tbody>
                {portalDocs.map(d => (
                  <tr key={d.id} className="border-b last:border-0">
                    <td className="p-3 font-medium text-foreground">{d.name}</td>
                    <td className="p-3"><span className={`text-xs px-2 py-0.5 rounded-full ${d.status === "approved" ? "bg-success/10 text-success" : d.status === "rejected" ? "bg-destructive/10 text-destructive" : d.status === "submitted" ? "bg-primary/10 text-primary" : "bg-warning/10 text-warning"}`}>{d.status}</span></td>
                    <td className="p-3 text-muted-foreground">{d.expiration}</td>
                    <td className="p-3 text-muted-foreground">{d.lastUpdate}</td>
                    <td className="p-3">
                      {d.status === "rejected" && <button className="px-2 py-1 text-xs rounded bg-primary text-primary-foreground hover:bg-primary/90">{t ? "Reenviar" : "Resubmit"}</button>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
