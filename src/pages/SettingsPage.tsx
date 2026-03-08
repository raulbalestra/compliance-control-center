import { Shield, Bell, HardDrive, Users, Lock } from "lucide-react";

const sections = [
  {
    icon: Users,
    title: "User Roles & Permissions",
    description: "Manage user access levels and role assignments",
    items: [
      { label: "Admin", desc: "Full system access, rule management, overrides" },
      { label: "Compliance Analyst", desc: "Document review, exception handling, approvals" },
      { label: "Viewer", desc: "Read-only access to dashboards and reports" },
      { label: "Auditor", desc: "Access to audit logs and compliance reports" },
    ],
  },
  {
    icon: Bell,
    title: "Notification Preferences",
    description: "Configure alerts and notification channels",
    items: [
      { label: "Critical exceptions", desc: "Email + SMS", enabled: true },
      { label: "Document rejections", desc: "Email", enabled: true },
      { label: "Deadline reminders", desc: "Email (7 days before)", enabled: true },
      { label: "Daily summary report", desc: "Email at 08:00", enabled: false },
    ],
  },
  {
    icon: HardDrive,
    title: "Document Storage",
    description: "Storage configuration and retention policies",
    items: [
      { label: "Storage provider", desc: "Enterprise Cloud Storage" },
      { label: "Retention period", desc: "7 years (regulatory compliance)" },
      { label: "Max file size", desc: "25 MB" },
      { label: "Accepted formats", desc: "PDF, JPG, PNG, TIFF" },
    ],
  },
  {
    icon: Lock,
    title: "Security Policies",
    description: "Enterprise security and compliance settings",
    items: [
      { label: "Two-factor authentication", desc: "Required for all users", enabled: true },
      { label: "Session timeout", desc: "30 minutes of inactivity" },
      { label: "IP allowlist", desc: "Enabled — 3 ranges configured", enabled: true },
      { label: "Audit log retention", desc: "Indefinite" },
    ],
  },
];

export default function SettingsPage() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="page-header">Settings</h1>
        <p className="page-subheader">System configuration, security, and administration</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
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
