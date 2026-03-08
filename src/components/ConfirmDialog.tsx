import { useState } from "react";
import { X } from "lucide-react";

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: "danger" | "warning" | "default";
  requireReason?: boolean;
  reasonLabel?: string;
  onConfirm: (reason?: string) => void;
  onCancel: () => void;
}

export function ConfirmDialog({ open, title, description, confirmLabel = "Confirm", cancelLabel = "Cancel", variant = "default", requireReason, reasonLabel = "Reason", onConfirm, onCancel }: ConfirmDialogProps) {
  const [reason, setReason] = useState("");
  if (!open) return null;

  const variantClasses = variant === "danger" ? "bg-destructive text-destructive-foreground hover:bg-destructive/90" :
    variant === "warning" ? "bg-warning text-warning-foreground hover:bg-warning/90" :
    "bg-primary text-primary-foreground hover:bg-primary/90";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/50" onClick={onCancel} />
      <div className="relative bg-card rounded-lg border shadow-lg max-w-md w-full p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-foreground">{title}</h3>
          <button onClick={onCancel} className="p-1 hover:bg-muted rounded"><X className="w-4 h-4" /></button>
        </div>
        <p className="text-xs text-muted-foreground">{description}</p>
        {requireReason && (
          <div>
            <label className="text-xs font-medium text-foreground">{reasonLabel}</label>
            <textarea className="w-full mt-1 p-2 text-xs border border-input rounded-md bg-background focus:ring-1 focus:ring-ring focus:outline-none" rows={3} value={reason} onChange={e => setReason(e.target.value)} placeholder={`${reasonLabel}...`} />
          </div>
        )}
        <div className="flex justify-end gap-2">
          <button onClick={onCancel} className="px-3 py-1.5 text-xs font-medium rounded-md border border-input bg-background hover:bg-muted transition-colors">{cancelLabel}</button>
          <button onClick={() => { onConfirm(reason); setReason(""); }} disabled={requireReason && !reason.trim()} className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors disabled:opacity-50 ${variantClasses}`}>{confirmLabel}</button>
        </div>
      </div>
    </div>
  );
}
