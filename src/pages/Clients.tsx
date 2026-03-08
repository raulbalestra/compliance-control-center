import { useApp } from "@/stores/AppStore";
import { useLanguage } from "@/i18n/LanguageContext";
import { useNavigate } from "react-router-dom";
import { Building2, FileText, Users, ChevronRight } from "lucide-react";

export default function ClientsPage() {
  const { locale } = useLanguage();
  const navigate = useNavigate();
  const { clients } = useApp();
  const t = locale === "pt-BR";

  return (
    <div className="p-4 md:p-6 space-y-4">
      <div><h1 className="page-header">{t ? "Clientes" : "Clients"}</h1><p className="page-subheader">{t ? "Gestão de clientes e conformidade" : "Client management and compliance"}</p></div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        {clients.map(client => (
          <div key={client.id} className="bg-card rounded-lg border p-5 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center"><Building2 className="w-5 h-5 text-primary" /></div>
                <div>
                  <h3 className="text-sm font-semibold text-foreground">{client.name}</h3>
                  <p className="text-xs text-muted-foreground">{client.cnpj}</p>
                </div>
              </div>
              <div className={`text-lg font-bold ${client.compliance >= 95 ? "text-success" : client.compliance >= 90 ? "text-info" : client.compliance >= 85 ? "text-warning" : "text-destructive"}`}>{client.compliance}%</div>
            </div>
            <div className="flex items-center gap-4 mb-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1"><FileText className="w-3 h-3" />{client.contracts} {t ? "contratos" : "contracts"}</span>
              <span className="flex items-center gap-1"><Users className="w-3 h-3" />{client.activeWorkers} {t ? "colaboradores" : "workers"}</span>
            </div>
            <div className="flex flex-wrap gap-1.5 mb-4">
              {client.docs.map(doc => <span key={doc} className="px-2 py-0.5 text-[10px] font-medium rounded-full bg-muted text-muted-foreground">{doc}</span>)}
            </div>
            <button onClick={() => navigate(`/clients/${client.id}`)} className="w-full flex items-center justify-center gap-1 py-2 text-xs font-medium text-primary hover:bg-primary/5 rounded-md transition-colors">
              {t ? "Ver Detalhes" : "View Details"} <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
