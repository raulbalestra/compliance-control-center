import { useState, useRef } from "react";
import { flushSync } from "react-dom";
import { Upload as UploadIcon, X, CheckCircle2, AlertCircle, FileText } from "lucide-react";
import { useApp } from "@/stores/AppStore";
import { useLanguage } from "@/i18n/LanguageContext";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { n8nApi } from "@/services/n8n";

export default function UploadPage() {
  const { locale } = useLanguage();
  const navigate = useNavigate();
  const { clients, contracts, workers, docTypes, uploadDocument } = useApp();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<{ file: File; name: string; size: number; progress: number; status: "pending" | "uploading" | "done" | "error" }[]>([]);
  const [selectedClient, setSelectedClient] = useState("");
  const [selectedContract, setSelectedContract] = useState("");
  const [selectedWorker, setSelectedWorker] = useState("");
  const [selectedDocType, setSelectedDocType] = useState("");
  const [observation, setObservation] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const filteredContracts = selectedClient ? contracts.filter(c => String(c.clientId) === selectedClient) : contracts;
  const filteredWorkers = selectedContract ? workers.filter(w => String(w.contractId) === selectedContract) : selectedClient ? workers.filter(w => String(w.clientId) === selectedClient) : workers;

  const addFiles = (rawFiles: File[]) => {
    const newEntries = rawFiles.map(f => ({ file: f, name: f.name, size: f.size, progress: 0, status: "pending" as const }));
    setFiles(prev => [...prev, ...newEntries]);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const picked = Array.from(e.dataTransfer.files);
    if (picked.length) addFiles(picked);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const picked = Array.from(e.target.files || []);
    if (picked.length) addFiles(picked);
  };

  const handleSubmit = async () => {
    const t = locale === "pt-BR";
    if (!selectedClient || !selectedDocType) {
      toast.error(t ? "Preencha os campos obrigatórios" : "Fill required fields");
      return;
    }
    const pendingFiles = files.filter(f => f.status === "pending");
    if (pendingFiles.length === 0) {
      toast.error(t ? "Nenhum documento selecionado" : "No documents selected");
      return;
    }
    setIsSubmitting(true);
    let successCount = 0;

    // Resolve names for n8n metadata
    const workerName = workers.find(w => String(w.id) === selectedWorker)?.name;
    const clientName = clients.find(c => String(c.id) === selectedClient)?.name;
    const contractName = contracts.find(c => String(c.id) === selectedContract)?.name;
    const docTypeName = docTypes.find(d => String(d.id) === selectedDocType)?.name;

    for (const entry of pendingFiles) {
      setFiles(prev => prev.map(f => f.name === entry.name ? { ...f, status: "uploading", progress: 10 } : f));
      try {
        // Send file to n8n for AI analysis
        setFiles(prev => prev.map(f => f.name === entry.name ? { ...f, progress: 40 } : f));
        const analysis = await n8nApi.analyzeDocument(entry.file, {
          workerName,
          clientName,
          contractName,
          docTypeName,
          observation,
        });

        setFiles(prev => prev.map(f => f.name === entry.name ? { ...f, progress: 100, status: "done" } : f));
        successCount++;

        // Determine status based on score
        const score = analysis.compliance_score;
        const docStatus = score >= 85 ? "approved" as const
          : score >= 50 ? "validating" as const
          : "validation_failed" as const;
        const docValidation = score >= 85 ? "pass" as const
          : score >= 50 ? "warning" as const
          : "fail" as const;
        const docPriority = score >= 85 ? "low" as const
          : score >= 50 ? "medium" as const
          : "critical" as const;

        // Add document to the queue with n8n analysis data
        flushSync(() => {
          uploadDocument({
            worker: workerName || "Unknown",
            workerId: selectedWorker ? Number(selectedWorker) : 0,
            contract: contractName || "Unknown",
            contractId: selectedContract ? Number(selectedContract) : 0,
            client: clientName || "Unknown",
            clientId: selectedClient ? Number(selectedClient) : 0,
            docType: analysis.document_type || docTypeName || "Unknown",
            docTypeId: selectedDocType ? Number(selectedDocType) : 0,
            status: docStatus,
            validation: docValidation,
            validationScore: score,
            priority: docPriority,
          });
        });
      } catch (err) {
        console.error("[Upload] Failed to upload file:", entry.name, err);
        setFiles(prev => prev.map(f => f.name === entry.name ? { ...f, status: "error" } : f));
      }
    }
    setIsSubmitting(false);
    if (successCount > 0) {
      toast.success(t ? `${successCount} documento(s) enviado(s) para análise` : `${successCount} document(s) submitted for analysis`);
      navigate("/documents");
    }
  };

  const t = locale === "pt-BR";

  return (
    <div className="p-4 md:p-6 space-y-4 max-w-4xl">
      <div>
        <h1 className="page-header">{t ? "Upload de Documentos" : "Document Upload"}</h1>
        <p className="page-subheader">{t ? "Envie documentos para processamento" : "Upload documents for processing"}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="space-y-4">
          <div className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer ${isDragging ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"}`}
            onDragOver={e => { e.preventDefault(); setIsDragging(true); }} onDragLeave={() => setIsDragging(false)} onDrop={handleDrop} onClick={() => fileInputRef.current?.click()}>
            <input ref={fileInputRef} type="file" multiple className="hidden" onChange={handleFileSelect} accept=".pdf,.jpg,.jpeg,.png,.tiff,.xml" />
            <UploadIcon className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
            <p className="text-sm font-medium text-foreground">{t ? "Arraste arquivos aqui" : "Drag files here"}</p>
            <p className="text-xs text-muted-foreground mt-1">{t ? "ou clique para selecionar" : "or click to select"}</p>
            <p className="text-[10px] text-muted-foreground mt-2">PDF, JPG, PNG, TIFF, XML — Max 25MB</p>
          </div>

          {files.length > 0 && (
            <div className="bg-card rounded-lg border p-4 space-y-3">
              <h3 className="text-xs font-semibold text-foreground">{t ? "Arquivos" : "Files"} ({files.length})</h3>
              {files.map((file, i) => (
                <div key={i} className="flex items-center gap-3">
                  <FileText className="w-4 h-4 text-muted-foreground shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-medium text-foreground truncate">{file.name}</p>
                      {file.status === "done" ? <CheckCircle2 className="w-3.5 h-3.5 text-success shrink-0" /> : file.status === "error" ? <AlertCircle className="w-3.5 h-3.5 text-destructive shrink-0" /> : null}
                    </div>
                    <div className="w-full h-1.5 bg-muted rounded-full mt-1 overflow-hidden">
                      <div className={`h-full rounded-full transition-all duration-300 ${file.status === "done" ? "bg-success" : file.status === "error" ? "bg-destructive" : "bg-primary"}`} style={{ width: `${file.progress}%` }} />
                    </div>
                    <p className="text-[10px] text-muted-foreground mt-0.5">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                  </div>
                  <button onClick={() => setFiles(prev => prev.filter((_, idx) => idx !== i))} disabled={file.status === "uploading"} className="p-1 hover:bg-muted rounded disabled:opacity-30"><X className="w-3 h-3" /></button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-card rounded-lg border p-5 space-y-4">
          <h3 className="text-sm font-semibold text-foreground">{t ? "Detalhes do Envio" : "Upload Details"}</h3>
          <div>
            <label className="text-xs font-medium text-foreground">{t ? "Cliente *" : "Client *"}</label>
            <select className="w-full mt-1 px-3 py-2 text-xs border border-input rounded-md bg-background" value={selectedClient} onChange={e => { setSelectedClient(e.target.value); setSelectedContract(""); setSelectedWorker(""); }}>
              <option value="">{t ? "Selecione..." : "Select..."}</option>
              {clients.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs font-medium text-foreground">{t ? "Contrato" : "Contract"}</label>
            <select className="w-full mt-1 px-3 py-2 text-xs border border-input rounded-md bg-background" value={selectedContract} onChange={e => { setSelectedContract(e.target.value); setSelectedWorker(""); }}>
              <option value="">{t ? "Selecione..." : "Select..."}</option>
              {filteredContracts.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs font-medium text-foreground">{t ? "Colaborador" : "Worker"}</label>
            <select className="w-full mt-1 px-3 py-2 text-xs border border-input rounded-md bg-background" value={selectedWorker} onChange={e => setSelectedWorker(e.target.value)}>
              <option value="">{t ? "Selecione..." : "Select..."}</option>
              {filteredWorkers.map(w => <option key={w.id} value={w.id}>{w.name}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs font-medium text-foreground">{t ? "Tipo de Documento *" : "Document Type *"}</label>
            <select className="w-full mt-1 px-3 py-2 text-xs border border-input rounded-md bg-background" value={selectedDocType} onChange={e => setSelectedDocType(e.target.value)}>
              <option value="">{t ? "Selecione..." : "Select..."}</option>
              {docTypes.filter(d => d.active).map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs font-medium text-foreground">{t ? "Observação" : "Observation"}</label>
            <textarea className="w-full mt-1 px-3 py-2 text-xs border border-input rounded-md bg-background" rows={3} value={observation} onChange={e => setObservation(e.target.value)} placeholder={t ? "Observações opcionais..." : "Optional notes..."} />
          </div>
          <button onClick={handleSubmit} disabled={isSubmitting || files.filter(f => f.status === "pending").length === 0} className="w-full py-2.5 text-xs font-medium rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50">
            {isSubmitting ? (t ? "Enviando..." : "Uploading...") : `${t ? "Enviar Documentos" : "Submit Documents"} (${files.filter(f => f.status === "pending").length})`}
          </button>
        </div>
      </div>
    </div>
  );
}
