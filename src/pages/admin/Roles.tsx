import { useLanguage } from "@/i18n/LanguageContext";
import { ROLE_LABELS, type UserRole } from "@/types";
import { useState } from "react";
import { CheckCircle2, X } from "lucide-react";

const modules = ["Dashboard", "Documents", "Upload", "Validations", "Pending", "Exceptions", "Clients", "Contracts", "Workers", "Rules", "Reports", "Audit", "Admin", "Settings"];

const defaultPerms: Record<UserRole, Record<string, { read: boolean; write: boolean; delete: boolean }>> = {
  admin: Object.fromEntries(modules.map(m => [m, { read: true, write: true, delete: true }])),
  coordinator: Object.fromEntries(modules.map(m => [m, { read: true, write: m !== "Admin", delete: false }])),
  analyst: Object.fromEntries(modules.map(m => [m, { read: !["Admin", "Settings"].includes(m), write: ["Documents", "Validations", "Pending", "Exceptions"].includes(m), delete: false }])),
  provider: Object.fromEntries(modules.map(m => [m, { read: ["Dashboard", "Documents", "Upload"].includes(m), write: ["Upload"].includes(m), delete: false }])),
  auditor: Object.fromEntries(modules.map(m => [m, { read: ["Dashboard", "Documents", "Audit", "Reports"].includes(m), write: false, delete: false }])),
  viewer: Object.fromEntries(modules.map(m => [m, { read: ["Dashboard", "Documents", "Reports"].includes(m), write: false, delete: false }])),
};

export default function AdminRoles() {
  const { locale } = useLanguage();
  const [perms, setPerms] = useState(defaultPerms);
  const t = locale === "pt-BR";

  const toggle = (role: UserRole, mod: string, action: "read" | "write" | "delete") => {
    setPerms(prev => ({
      ...prev,
      [role]: { ...prev[role], [mod]: { ...prev[role][mod], [action]: !prev[role][mod][action] } }
    }));
  };

  return (
    <div className="p-4 md:p-6 space-y-4">
      <div><h1 className="page-header">{t ? "Perfis e Permissões" : "Roles & Permissions"}</h1><p className="page-subheader">{t ? "Configure acessos por perfil" : "Configure access by role"}</p></div>
      <div className="bg-card rounded-lg border overflow-x-auto">
        <table className="w-full text-xs min-w-[800px]">
          <thead>
            <tr className="border-b bg-muted/30">
              <th className="text-left p-3 font-medium text-muted-foreground">{t ? "Módulo" : "Module"}</th>
              {Object.entries(ROLE_LABELS).map(([k, v]) => (
                <th key={k} className="text-center p-3 font-medium text-muted-foreground" colSpan={3}>{locale === "pt-BR" ? v.pt : v.en}</th>
              ))}
            </tr>
            <tr className="border-b bg-muted/10">
              <th className="p-2"></th>
              {Object.keys(ROLE_LABELS).map(role => (
                <><th key={`${role}-r`} className="p-2 text-[10px] text-center text-muted-foreground">R</th>
                <th key={`${role}-w`} className="p-2 text-[10px] text-center text-muted-foreground">W</th>
                <th key={`${role}-d`} className="p-2 text-[10px] text-center text-muted-foreground">D</th></>
              ))}
            </tr>
          </thead>
          <tbody>
            {modules.map(mod => (
              <tr key={mod} className="border-b last:border-0">
                <td className="p-3 font-medium text-foreground">{mod}</td>
                {(Object.keys(ROLE_LABELS) as UserRole[]).map(role => (
                  <>
                    {["read", "write", "delete"].map(action => (
                      <td key={`${role}-${mod}-${action}`} className="p-2 text-center">
                        <button onClick={() => toggle(role, mod, action as any)} className={`w-5 h-5 rounded flex items-center justify-center ${perms[role][mod]?.[action as "read"] ? "bg-success/20 text-success" : "bg-muted text-muted-foreground"}`}>
                          {perms[role][mod]?.[action as "read"] ? <CheckCircle2 className="w-3 h-3" /> : <X className="w-3 h-3" />}
                        </button>
                      </td>
                    ))}
                  </>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
