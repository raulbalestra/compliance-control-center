import { useState, useRef } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { useNavigate } from "react-router-dom";
import { Upload as UploadIcon, FileText, CheckCircle2, X, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

export default function PortalUpload() {
  const { locale } = useLanguage();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<{ name: string; progress: number; status: string }[]>([]);
  const [docType, setDocType] = useState("");
  const t = locale === "pt-BR";

  const simulateUpload = (names: string[]) => {
    const newFiles = names.map(name => ({ name, progress: 0, status: "uploading" }));
    setFiles(prev => [...prev, ...newFiles]);
    newFiles.forEach(file => {
      const iv = setInterval(() => setFiles(prev => prev.map(f => f.name === file.name && f.status === "uploading" ? { ...f, progress: Math.min(f.progress + 25, 100) } : f)), 300);
      setTimeout(() => { clearInterval(iv); setFiles(prev => prev.map(f => f.name === file.name ? { ...f, progress: 100, status: "done" } : f)); }, 1500);
    });
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-6">
      <div className="max-w-2xl mx-auto space-y-4">
        <button onClick={() => navigate("/portal")} className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"><ArrowLeft className="w-3.5 h-3.5" />{t ? "Voltar" : "Back"}</button>
        <h1 className="page-header">{t ? "Enviar Documento" : "Upload Document"}</h1>
        <div>
          <label className="text-xs font-medium">{t ? "Tipo de Documento" : "Document Type"}</label>
          <select className="w-full mt-1 px-3 py-2 text-xs border border-input rounded-md bg-background" value={docType} onChange={e => setDocType(e.target.value)}>
            <option value="">{t ? "Selecione..." : "Select..."}</option>
            <option>Medical Certificate (ASO)</option><option>NR-10 Certificate</option><option>Payroll Receipt</option><option>FGTS Payment Proof</option>
          </select>
        </div>
        <div className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:border-primary/50 transition-colors" onClick={() => fileInputRef.current?.click()}>
          <input ref={fileInputRef} type="file" multiple className="hidden" onChange={e => { const names = Array.from(e.target.files || []).map(f => f.name); if (names.length) simulateUpload(names); }} />
          <UploadIcon className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
          <p className="text-sm font-medium">{t ? "Arraste ou clique para selecionar" : "Drag or click to select"}</p>
          <p className="text-[10px] text-muted-foreground mt-1">PDF, JPG, PNG — Max 25MB</p>
        </div>
        {files.length > 0 && (
          <div className="space-y-2">
            {files.map((f, i) => (
              <div key={i} className="flex items-center gap-3 p-3 bg-card rounded-lg border">
                <FileText className="w-4 h-4 text-muted-foreground" />
                <div className="flex-1">
                  <p className="text-xs font-medium">{f.name}</p>
                  <div className="w-full h-1.5 bg-muted rounded-full mt-1"><div className={`h-full rounded-full ${f.status === "done" ? "bg-success" : "bg-primary"}`} style={{ width: `${f.progress}%` }} /></div>
                </div>
                {f.status === "done" && <CheckCircle2 className="w-4 h-4 text-success" />}
              </div>
            ))}
          </div>
        )}
        <button disabled={files.filter(f => f.status === "done").length === 0 || !docType} onClick={() => { toast.success(t ? "Documento enviado!" : "Document submitted!"); setTimeout(() => navigate("/portal"), 1000); }} className="w-full py-2.5 text-xs font-medium rounded-md bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50">{t ? "Enviar" : "Submit"}</button>
      </div>
    </div>
  );
}
