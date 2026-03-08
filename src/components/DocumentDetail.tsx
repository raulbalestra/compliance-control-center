import { X, Bot, FileText, Clock, ArrowLeft } from "lucide-react";
import { StatusBadge } from "@/components/StatusBadge";
import { useLanguage } from "@/i18n/LanguageContext";

interface DocumentDetailProps {
  document: any;
  onClose: () => void;
}

const lifecycle = [
  { time: "Apr 5, 14:32", actionKey: "agentValidated", actor: "agent" },
  { time: "Apr 5, 14:30", actionKey: "checksCompleted", actor: "agent" },
  { time: "Apr 5, 14:28", actionKey: "metadataExtracted", actor: "agent" },
  { time: "Apr 5, 14:25", actionKey: "receivedQueued", actor: "system" },
  { time: "Apr 5, 10:15", actionKey: "requestedFromWorker", actor: "agent" },
];

const lifecycleLabels = {
  en: {
    agentValidated: "Agent validated document",
    checksCompleted: "Validation checks completed (6/7 passed)",
    metadataExtracted: "Document metadata extracted",
    receivedQueued: "Document received and queued",
    requestedFromWorker: "Document requested from worker",
  },
  "pt-BR": {
    agentValidated: "Agente validou documento",
    checksCompleted: "Verificações de validação concluídas (6/7 aprovadas)",
    metadataExtracted: "Metadados do documento extraídos",
    receivedQueued: "Documento recebido e enfileirado",
    requestedFromWorker: "Documento solicitado ao trabalhador",
  },
};

export function DocumentDetail({ document, onClose }: DocumentDetailProps) {
  const { t, locale } = useLanguage();

  const validationChecks = [
    { name: t.docDetail.signatureDetected, status: "pass" as const },
    { name: t.docDetail.expirationValid, status: "pass" as const },
    { name: t.docDetail.nameMatch, status: "pass" as const },
    { name: t.docDetail.cpfMatch, status: "pass" as const },
    { name: t.docDetail.companyMatch, status: "warning" as const },
    { name: t.docDetail.mandatoryFields, status: "pass" as const },
    { name: t.docDetail.fileQuality, status: "pass" as const },
  ];

  return (
    <div className="w-full md:w-[480px] h-[calc(100vh-3rem)] md:h-screen overflow-y-auto bg-card border-l border-border">
      <div className="sticky top-0 bg-card z-10 p-4 border-b border-border flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <button onClick={onClose} className="p-1 hover:bg-muted rounded md:hidden shrink-0">
            <ArrowLeft className="w-4 h-4 text-muted-foreground" />
          </button>
          <div className="min-w-0">
            <h2 className="text-sm font-semibold text-foreground truncate">{document.docType}</h2>
            <p className="text-xs text-muted-foreground truncate">{document.worker} — {document.client}</p>
          </div>
        </div>
        <button onClick={onClose} className="p-1 hover:bg-muted rounded shrink-0 hidden md:block">
          <X className="w-4 h-4 text-muted-foreground" />
        </button>
      </div>

      <div className="p-4 space-y-5">
        <div className="bg-muted rounded-lg border-2 border-dashed border-border h-48 flex items-center justify-center">
          <div className="text-center">
            <FileText className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
            <p className="text-xs text-muted-foreground">{t.docDetail.docPreview}</p>
            <p className="text-[10px] text-muted-foreground">{t.docDetail.pdfViewer}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <StatusBadge status={document.status} />
          <StatusBadge status={document.priority} />
        </div>

        <div>
          <h3 className="text-xs font-semibold text-foreground uppercase tracking-wider mb-3">{t.docDetail.extractedMetadata}</h3>
          <div className="grid grid-cols-2 gap-2">
            {[
              [t.docDetail.name, document.worker],
              [t.docDetail.cpfId, "***.***.***-42"],
              [t.docDetail.company, "TechServ Engenharia"],
              [t.docDetail.documentType, document.docType],
              [t.docDetail.issueDate, "2024-01-15"],
              [t.docDetail.expiration, document.expiration],
              [t.docDetail.referencePeriod, "March 2024"],
              [t.docDetail.contract, document.contract],
            ].map(([label, value]) => (
              <div key={label} className="p-2 bg-muted/50 rounded text-xs">
                <span className="text-muted-foreground">{label}</span>
                <p className="font-medium text-foreground mt-0.5 truncate">{value}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xs font-semibold text-foreground uppercase tracking-wider mb-3">{t.docDetail.validationChecks}</h3>
          <div className="space-y-1.5">
            {validationChecks.map((check) => (
              <div key={check.name} className="flex items-center justify-between py-1.5 px-2 rounded bg-muted/30">
                <span className="text-xs text-foreground">{check.name}</span>
                <StatusBadge status={check.status} />
              </div>
            ))}
          </div>
        </div>

        <div className="p-3 rounded-lg border border-primary/20 bg-primary/5">
          <div className="flex items-center gap-2 mb-2">
            <Bot className="w-4 h-4 text-primary" />
            <span className="text-xs font-semibold text-primary">{t.docDetail.agentRecommendation}</span>
          </div>
          <p className="text-xs text-foreground">
            {t.docDetail.agentRecommendationText} <strong>{t.docDetail.approveWithNote}</strong>.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <button className="px-3 py-2 text-xs font-medium rounded-md bg-success text-success-foreground hover:bg-success/90 transition-colors">{t.docDetail.approveDocument}</button>
          <button className="px-3 py-2 text-xs font-medium rounded-md bg-warning text-warning-foreground hover:bg-warning/90 transition-colors">{t.docDetail.requestCorrection}</button>
          <button className="px-3 py-2 text-xs font-medium rounded-md border border-input bg-background hover:bg-muted transition-colors text-foreground">{t.docDetail.uploadReplacement}</button>
          <button className="px-3 py-2 text-xs font-medium rounded-md border border-input bg-background hover:bg-muted transition-colors text-foreground">{t.docDetail.markException}</button>
        </div>

        <div>
          <h3 className="text-xs font-semibold text-foreground uppercase tracking-wider mb-3">{t.docDetail.documentLifecycle}</h3>
          <div className="space-y-3">
            {lifecycle.map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="flex flex-col items-center">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center ${item.actor === "agent" ? "bg-primary/10" : "bg-muted"}`}>
                    {item.actor === "agent" ? <Bot className="w-2.5 h-2.5 text-primary" /> : <Clock className="w-2.5 h-2.5 text-muted-foreground" />}
                  </div>
                  {i < lifecycle.length - 1 && <div className="w-px h-4 bg-border mt-1" />}
                </div>
                <div>
                  <p className="text-xs text-foreground">{lifecycleLabels[locale][item.actionKey as keyof typeof lifecycleLabels["en"]]}</p>
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
