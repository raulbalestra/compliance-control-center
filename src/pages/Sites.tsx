import { useApp } from "@/stores/AppStore";
import { useLanguage } from "@/i18n/LanguageContext";
import { useNavigate } from "react-router-dom";
import { MapPin } from "lucide-react";

export default function SitesPage() {
  const { locale } = useLanguage();
  const navigate = useNavigate();
  const { sites } = useApp();
  const t = locale === "pt-BR";

  return (
    <div className="p-4 md:p-6 space-y-4">
      <div><h1 className="page-header">Sites</h1><p className="page-subheader">{t ? "Localidades e instalações" : "Locations and facilities"}</p></div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {sites.map(site => (
          <div key={site.id} className="bg-card rounded-lg border p-4 hover:shadow-sm transition-shadow">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center"><MapPin className="w-4 h-4 text-primary" /></div>
              <div>
                <p className="text-sm font-medium text-foreground">{site.name}</p>
                <p className="text-[10px] text-muted-foreground">{site.address}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span className="cursor-pointer hover:text-primary" onClick={() => navigate(`/clients/${site.clientId}`)}>{site.clientName}</span>
              <span>{site.contracts} {t ? "contratos" : "contracts"}</span>
              <span>{site.workers} {t ? "colaboradores" : "workers"}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
