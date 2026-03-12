import type { LucideIcon } from "lucide-react";
import { CheckCircle2, XCircle, AlertTriangle, Clock, Send, FileSearch, Ban, Upload } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

export type StatusType =
  | "waiting"
  | "received"
  | "uploaded"
  | "processing"
  | "processed"
  | "validating"
  | "validation_failed"
  | "approved"
  | "ready"
  | "submitted"
  | "rejected"
  | "correction_requested"
  | "needs_correction"
  | "reprocessing"
  | "exception"
  | "pass"
  | "fail"
  | "warning"
  | "critical"
  | "high"
  | "medium"
  | "low";

const statusConfig: Record<StatusType, { className: string; icon?: LucideIcon }> = {
  waiting: { className: "status-badge status-info", icon: Clock },
  received: { className: "status-badge status-info", icon: Upload },
  uploaded: { className: "status-badge status-info", icon: Upload },
  processing: { className: "status-badge status-warning", icon: FileSearch },
  processed: { className: "status-badge status-pass", icon: CheckCircle2 },
  validating: { className: "status-badge status-warning", icon: FileSearch },
  validation_failed: { className: "status-badge status-fail", icon: XCircle },
  ready: { className: "status-badge status-pass", icon: CheckCircle2 },
  submitted: { className: "status-badge status-pass", icon: Send },
  rejected: { className: "status-badge status-fail", icon: Ban },
  approved: { className: "status-badge status-pass", icon: CheckCircle2 },
  correction_requested: { className: "status-badge status-warning", icon: AlertTriangle },
  needs_correction: { className: "status-badge status-warning", icon: AlertTriangle },
  reprocessing: { className: "status-badge status-info", icon: FileSearch },
  exception: { className: "status-badge status-fail", icon: XCircle },
  pass: { className: "status-badge status-pass", icon: CheckCircle2 },
  fail: { className: "status-badge status-fail", icon: XCircle },
  warning: { className: "status-badge status-warning", icon: AlertTriangle },
  critical: { className: "status-badge status-fail" },
  high: { className: "status-badge bg-risk-high/10 text-risk-high border-risk-high/20" },
  medium: { className: "status-badge status-warning" },
  low: { className: "status-badge status-pass" },
};

interface StatusBadgeProps {
  status: StatusType;
  label?: string;
}

export function StatusBadge({ status, label }: StatusBadgeProps) {
  const { t } = useLanguage();
  const config = statusConfig[status] || { className: "status-badge bg-muted text-muted-foreground" };
  const Icon = config?.icon;
  const translatedLabel = t.status?.[status as keyof typeof t.status] || status;

  return (
    <span className={config.className}>
      {Icon && <Icon className="w-3 h-3" />}
      {label || translatedLabel}
    </span>
  );
}
