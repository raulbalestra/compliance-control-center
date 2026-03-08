import { X, CheckCircle2, XCircle, AlertTriangle, Bot, FileText, Clock } from "lucide-react";
import { StatusBadge } from "@/components/StatusBadge";

interface DocumentDetailProps {
  document: any;
  onClose: () => void;
}

const validationChecks = [
  { name: "Signature detected", status: "pass" as const },
  { name: "Expiration valid", status: "pass" as const },
  { name: "Name match", status: "pass" as const },
  { name: "CPF match", status: "pass" as const },
  { name: "Company match", status: "warning" as const },
  { name: "Mandatory fields present", status: "pass" as const },
  { name: "File quality check", status: "pass" as const },
];

const lifecycle = [
  { time: "Apr 5, 14:32", action: "Agent validated document", actor: "agent" },
  { time: "Apr 5, 14:30", action: "Validation checks completed (6/7 passed)", actor: "agent" },
  { time: "Apr 5, 14:28", action: "Document metadata extracted", actor: "agent" },
  { time: "Apr 5, 14:25", action: "Document received and queued", actor: "system" },
  { time: "Apr 5, 10:15", action: "Document requested from worker", actor: "agent" },
];

export function DocumentDetail({ document, onClose }: DocumentDetailProps) {
  return (
    <div className="w-[480px] h-screen overflow-y-auto bg-card border-l border-border">
      {/* Header */}
      <div className="sticky top-0 bg-card z-10 p-4 border-b border-border flex items-center justify-between">
        <div>
          <h2 className="text-sm font-semibold text-foreground">{document.docType}</h2>
          <p className="text-xs text-muted-foreground">{document.worker} — {document.client}</p>
        </div>
        <button onClick={onClose} className="p-1 hover:bg-muted rounded">
          <X className="w-4 h-4 text-muted-foreground" />
        </button>
      </div>

      <div className="p-4 space-y-5">
        {/* Document Preview Placeholder */}
        <div className="bg-muted rounded-lg border-2 border-dashed border-border h-48 flex items-center justify-center">
          <div className="text-center">
            <FileText className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
            <p className="text-xs text-muted-foreground">Document Preview</p>
            <p className="text-[10px] text-muted-foreground">PDF / Image Viewer</p>
          </div>
        </div>

        {/* Status */}
        <div className="flex items-center gap-2">
          <StatusBadge status={document.status} />
          <StatusBadge status={document.priority} />
        </div>

        {/* Extracted Metadata */}
        <div>
          <h3 className="text-xs font-semibold text-foreground uppercase tracking-wider mb-3">Extracted Metadata</h3>
          <div className="grid grid-cols-2 gap-2">
            {[
              ["Name", document.worker],
              ["CPF / ID", "***.***.***-42"],
              ["Company", "TechServ Engenharia"],
              ["Document Type", document.docType],
              ["Issue Date", "2024-01-15"],
              ["Expiration", document.expiration],
              ["Reference Period", "March 2024"],
              ["Contract", document.contract],
            ].map(([label, value]) => (
              <div key={label} className="p-2 bg-muted/50 rounded text-xs">
                <span className="text-muted-foreground">{label}</span>
                <p className="font-medium text-foreground mt-0.5">{value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Validation Checks */}
        <div>
          <h3 className="text-xs font-semibold text-foreground uppercase tracking-wider mb-3">Validation Checks</h3>
          <div className="space-y-1.5">
            {validationChecks.map((check) => (
              <div key={check.name} className="flex items-center justify-between py-1.5 px-2 rounded bg-muted/30">
                <span className="text-xs text-foreground">{check.name}</span>
                <StatusBadge status={check.status} />
              </div>
            ))}
          </div>
        </div>

        {/* Agent Recommendation */}
        <div className="p-3 rounded-lg border border-primary/20 bg-primary/5">
          <div className="flex items-center gap-2 mb-2">
            <Bot className="w-4 h-4 text-primary" />
            <span className="text-xs font-semibold text-primary">Agent Recommendation</span>
          </div>
          <p className="text-xs text-foreground">
            Document passes 6 of 7 validation checks. Company name has a minor variation ("TechServ" vs "TechServ Engenharia"). 
            Recommended action: <strong>Approve with note</strong>.
          </p>
        </div>

        {/* Actions */}
        <div className="grid grid-cols-2 gap-2">
          <button className="px-3 py-2 text-xs font-medium rounded-md bg-success text-success-foreground hover:bg-success/90 transition-colors">
            Approve Document
          </button>
          <button className="px-3 py-2 text-xs font-medium rounded-md bg-warning text-warning-foreground hover:bg-warning/90 transition-colors">
            Request Correction
          </button>
          <button className="px-3 py-2 text-xs font-medium rounded-md border border-input bg-background hover:bg-muted transition-colors text-foreground">
            Upload Replacement
          </button>
          <button className="px-3 py-2 text-xs font-medium rounded-md border border-input bg-background hover:bg-muted transition-colors text-foreground">
            Mark Exception
          </button>
        </div>

        {/* Lifecycle History */}
        <div>
          <h3 className="text-xs font-semibold text-foreground uppercase tracking-wider mb-3">Document Lifecycle</h3>
          <div className="space-y-3">
            {lifecycle.map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="flex flex-col items-center">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                    item.actor === "agent" ? "bg-primary/10" : "bg-muted"
                  }`}>
                    {item.actor === "agent" ? <Bot className="w-2.5 h-2.5 text-primary" /> : <Clock className="w-2.5 h-2.5 text-muted-foreground" />}
                  </div>
                  {i < lifecycle.length - 1 && <div className="w-px h-4 bg-border mt-1" />}
                </div>
                <div>
                  <p className="text-xs text-foreground">{item.action}</p>
                  <p className="text-[10px] text-muted-foreground">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
