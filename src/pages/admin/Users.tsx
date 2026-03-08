import { useState } from "react";
import { useApp } from "@/stores/AppStore";
import { useLanguage } from "@/i18n/LanguageContext";
import { ROLE_LABELS, type UserRole, type AppUser } from "@/types";
import { toast } from "sonner";
import { Search, Plus, Edit2, Ban, CheckCircle2, RotateCcw, X } from "lucide-react";

export default function AdminUsers() {
  const { locale } = useLanguage();
  const { users, addUser, updateUser, toggleUserActive } = useApp();
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [editing, setEditing] = useState<AppUser | null>(null);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", role: "analyst" as UserRole });
  const t = locale === "pt-BR";

  const filtered = users.filter(u => {
    if (roleFilter !== "All" && u.role !== roleFilter) return false;
    if (search && !u.name.toLowerCase().includes(search.toLowerCase()) && !u.email.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const handleSave = () => {
    if (!form.name || !form.email) { toast.error(t ? "Preencha todos os campos" : "Fill all fields"); return; }
    if (editing) {
      updateUser(editing.id, { name: form.name, email: form.email, role: form.role });
      toast.success(t ? "Usuário atualizado" : "User updated");
    } else {
      addUser({ id: crypto.randomUUID(), name: form.name, email: form.email, role: form.role, active: true, lastAccess: "—", createdAt: new Date().toLocaleDateString() });
      toast.success(t ? "Usuário criado" : "User created");
    }
    setEditing(null); setCreating(false); setForm({ name: "", email: "", role: "analyst" });
  };

  return (
    <div className="p-4 md:p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div><h1 className="page-header">{t ? "Usuários" : "Users"}</h1><p className="page-subheader">{t ? "Gestão de usuários do sistema" : "System user management"}</p></div>
        <button onClick={() => { setCreating(true); setEditing(null); setForm({ name: "", email: "", role: "analyst" }); }} className="flex items-center gap-2 px-4 py-2 text-xs font-medium rounded-md bg-primary text-primary-foreground hover:bg-primary/90"><Plus className="w-3.5 h-3.5" />{t ? "Novo Usuário" : "New User"}</button>
      </div>

      {(creating || editing) && (
        <div className="bg-card rounded-lg border p-5 space-y-3">
          <div className="flex items-center justify-between"><h3 className="text-sm font-semibold">{editing ? (t ? "Editar Usuário" : "Edit User") : (t ? "Novo Usuário" : "New User")}</h3><button onClick={() => { setCreating(false); setEditing(null); }}><X className="w-4 h-4" /></button></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div><label className="text-xs font-medium">{t ? "Nome" : "Name"}</label><input className="w-full mt-1 px-3 py-2 text-xs border border-input rounded-md bg-background" value={form.name} onChange={e => setForm({...form, name: e.target.value})} /></div>
            <div><label className="text-xs font-medium">Email</label><input className="w-full mt-1 px-3 py-2 text-xs border border-input rounded-md bg-background" value={form.email} onChange={e => setForm({...form, email: e.target.value})} /></div>
            <div><label className="text-xs font-medium">{t ? "Perfil" : "Role"}</label>
              <select className="w-full mt-1 px-3 py-2 text-xs border border-input rounded-md bg-background" value={form.role} onChange={e => setForm({...form, role: e.target.value as UserRole})}>
                {Object.entries(ROLE_LABELS).map(([k, v]) => <option key={k} value={k}>{locale === "pt-BR" ? v.pt : v.en}</option>)}
              </select>
            </div>
          </div>
          <div className="flex gap-2">
            <button onClick={handleSave} className="px-4 py-2 text-xs font-medium rounded-md bg-primary text-primary-foreground hover:bg-primary/90">{t ? "Salvar" : "Save"}</button>
            <button onClick={() => { setCreating(false); setEditing(null); }} className="px-4 py-2 text-xs font-medium rounded-md border border-input bg-background hover:bg-muted">{t ? "Cancelar" : "Cancel"}</button>
          </div>
        </div>
      )}

      <div className="filter-bar flex-col sm:flex-row">
        <div className="relative w-full sm:flex-1 sm:max-w-xs">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
          <input className="w-full pl-8 pr-3 py-1.5 text-xs bg-background border border-input rounded-md" placeholder={t ? "Buscar..." : "Search..."} value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <select className="text-xs border border-input rounded-md px-2 py-1.5 bg-background" value={roleFilter} onChange={e => setRoleFilter(e.target.value)}>
          <option value="All">{t ? "Todos os Perfis" : "All Roles"}</option>
          {Object.entries(ROLE_LABELS).map(([k, v]) => <option key={k} value={k}>{locale === "pt-BR" ? v.pt : v.en}</option>)}
        </select>
      </div>

      <div className="bg-card rounded-lg border overflow-x-auto">
        <table className="w-full text-xs min-w-[600px]">
          <thead><tr className="border-b bg-muted/30">
            <th className="text-left p-3 font-medium text-muted-foreground">{t ? "Nome" : "Name"}</th>
            <th className="text-left p-3 font-medium text-muted-foreground">Email</th>
            <th className="text-left p-3 font-medium text-muted-foreground">{t ? "Perfil" : "Role"}</th>
            <th className="text-left p-3 font-medium text-muted-foreground">Status</th>
            <th className="text-left p-3 font-medium text-muted-foreground">{t ? "Último Acesso" : "Last Access"}</th>
            <th className="text-left p-3 font-medium text-muted-foreground">{t ? "Ações" : "Actions"}</th>
          </tr></thead>
          <tbody>
            {filtered.map(u => (
              <tr key={u.id} className="border-b last:border-0">
                <td className="p-3 font-medium text-foreground">{u.name}</td>
                <td className="p-3 text-muted-foreground">{u.email}</td>
                <td className="p-3"><span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs">{ROLE_LABELS[u.role]?.[locale === "pt-BR" ? "pt" : "en"] || u.role}</span></td>
                <td className="p-3"><span className={`text-xs px-2 py-0.5 rounded-full ${u.active ? "bg-success/10 text-success" : "bg-muted text-muted-foreground"}`}>{u.active ? (t ? "Ativo" : "Active") : (t ? "Inativo" : "Inactive")}</span></td>
                <td className="p-3 text-muted-foreground">{u.lastAccess}</td>
                <td className="p-3">
                  <div className="flex items-center gap-1">
                    <button onClick={() => { setEditing(u); setCreating(false); setForm({ name: u.name, email: u.email, role: u.role }); }} className="p-1.5 rounded hover:bg-muted" title={t ? "Editar" : "Edit"}><Edit2 className="w-3 h-3 text-muted-foreground" /></button>
                    <button onClick={() => { toggleUserActive(u.id); toast.info(u.active ? (t ? "Usuário bloqueado" : "User blocked") : (t ? "Usuário desbloqueado" : "User unblocked")); }} className="p-1.5 rounded hover:bg-muted" title={u.active ? (t ? "Bloquear" : "Block") : (t ? "Desbloquear" : "Unblock")}>
                      {u.active ? <Ban className="w-3 h-3 text-destructive" /> : <CheckCircle2 className="w-3 h-3 text-success" />}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
