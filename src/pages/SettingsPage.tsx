import { Shield, Bell, HardDrive, Users, Lock } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

export default function SettingsPage() {
  const { t } = useLanguage();

  const sections = [
    {
      icon: Users,
      title: t.settings.userRoles,
      description: t.settings.userRolesDesc,
      items: [
        { label: t.settings.admin, desc: t.settings.adminDesc },
        { label: t.settings.analyst, desc: t.settings.analystDesc },
        { label: t.settings.viewer, desc: t.settings.viewerDesc },
        { label: t.settings.auditor, desc: t.settings.auditorDesc },
      ],
    },
    {
      icon: Bell,
      title: t.settings.notifications,
      description: t.settings.notificationsDesc,
      items: [
        { label: t.settings.criticalExceptions, desc: t.settings.criticalExceptionsDesc, enabled: true },
        { label: t.settings.docRejections, desc: t.settings.docRejectionsDesc, enabled: true },
        { label: t.settings.deadlineReminders, desc: t.settings.deadlineRemindersDesc, enabled: true },
        { label: t.settings.dailySummary, desc: t.settings.dailySummaryDesc, enabled: false },
      ],
    },
    {
      icon: HardDrive,
      title: t.settings.storage,
      description: t.settings.storageDesc,
      items: [
        { label: t.settings.storageProvider, desc: t.settings.storageProviderDesc },
        { label: t.settings.retentionPeriod, desc: t.settings.retentionPeriodDesc },
        { label: t.settings.maxFileSize, desc: t.settings.maxFileSizeDesc },
        { label: t.settings.acceptedFormats, desc: t.settings.acceptedFormatsDesc },
      ],
    },
    {
      icon: Lock,
      title: t.settings.security,
      description: t.settings.securityDesc,
      items: [
        { label: t.settings.twoFactor, desc: t.settings.twoFactorDesc, enabled: true },
        { label: t.settings.sessionTimeout, desc: t.settings.sessionTimeoutDesc },
        { label: t.settings.ipAllowlist, desc: t.settings.ipAllowlistDesc, enabled: true },
        { label: t.settings.auditRetention, desc: t.settings.auditRetentionDesc },
      ],
    },
  ];

  return (
    <div className="p-4 md:p-6 space-y-4 md:space-y-6">
      <div>
        <h1 className="page-header">{t.settings.title}</h1>
        <p className="page-subheader">{t.settings.subtitle}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 md:gap-4">
        {sections.map((section) => (
          <div key={section.title} className="bg-card rounded-lg border p-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                <section.icon className="w-4.5 h-4.5 text-primary" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-foreground">{section.title}</h3>
                <p className="text-xs text-muted-foreground">{section.description}</p>
              </div>
            </div>
            <div className="space-y-2.5">
              {section.items.map((item) => (
                <div key={item.label} className="flex items-center justify-between py-2 px-3 rounded bg-muted/30">
                  <div>
                    <p className="text-xs font-medium text-foreground">{item.label}</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">{item.desc}</p>
                  </div>
                  {"enabled" in item && (
                    <div className={`w-8 h-4.5 rounded-full relative cursor-pointer transition-colors ${item.enabled ? "bg-success" : "bg-muted"}`}>
                      <div className={`absolute top-0.5 w-3.5 h-3.5 rounded-full bg-card shadow transition-transform ${item.enabled ? "left-[18px]" : "left-0.5"}`} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
