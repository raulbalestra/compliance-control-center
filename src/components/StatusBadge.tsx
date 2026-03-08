import { CheckCircle2, XCircle, AlertTriangle, Clock, Send, FileSearch, Ban, Upload } from "lucide-react";

type StatusType =
  | "waiting"
  | "received"
  | "validating"
  | "validation_failed"
  | "ready"
  | "submitted"
  | "rejected"
  | "pass"
  | "fail"
  | "warning"
  | "critical"
  | "high"
  | "medium"
  | "low";

const statusConfig: Record<StatusType, { label: string; className: string; icon?: any }> = {
  waiting: { label: "Waiting for Document", className: "status-badge status-info", icon: Clock },
  received: { label: "Document Received", className: "status-badge status-info", icon: Upload },
  validating: { label: "Validating", className: "status-badge status-warning", icon: FileSearch },
  validation_failed: { label: "Validation Failed", className: "status-badge status-fail", icon: XCircle },
  ready: { label: "Ready for Submission", className: "status-badge status-pass", icon: CheckCircle2 },
  submitted: { label: "Submitted", className: "status-badge status-pass", icon: Send },
  rejected: { label: "Rejected by Client", className: "status-badge status-fail", icon: Ban },
  pass: { label: "PASS", className: "status-badge status-pass", icon: CheckCircle2 },
  fail: { label: "FAIL", className: "status-badge status-fail", icon: XCircle },
  warning: { label: "WARNING", className: "status-badge status-warning", icon: AlertTriangle },
  critical: { label: "Critical", className: "status-badge status-fail" },
  high: { label: "High", className: "status-badge bg-risk-high/10 text-risk-high border-risk-high/20" },
  medium: { label: "Medium", className: "status-badge status-warning" },
  low: { label: "Low", className: "status-badge status-pass" },
};

interface StatusBadgeProps {
  status: StatusType;
  label?: string;
}

export function StatusBadge({ status, label }: StatusBadgeProps) {
  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <span className={config.className}>
      {Icon && <Icon className="w-3 h-3" />}
      {label || config.label}
    </span>
  );
}
