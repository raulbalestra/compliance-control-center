const N8N_WEBHOOK_URL = import.meta.env.VITE_N8N_WEBHOOK_URL || 'https://n8n.itfolkstech.com/webhook/testePorcentagem';

export interface N8nChecklistItem {
  field: string;
  status: 'present' | 'missing' | 'invalid';
  found_value: string;
  notes: string;
}

export interface N8nSummary {
  total_fields: number;
  present: number;
  missing: number;
  invalid: number;
}

export interface N8nAnalysisResult {
  document_type: string;
  compliance_score: number;
  summary: N8nSummary;
  checklist: N8nChecklistItem[];
  recommendation: 'approve' | 'correction' | 'reject';
}

export const n8nApi = {
  async analyzeDocument(
    file: File,
    metadata: {
      workerName?: string;
      clientName?: string;
      contractName?: string;
      docTypeName?: string;
      observation?: string;
    }
  ): Promise<N8nAnalysisResult> {
    const formData = new FormData();
    formData.append('data', file, file.name);
    if (metadata.workerName) formData.append('workerName', metadata.workerName);
    if (metadata.clientName) formData.append('clientName', metadata.clientName);
    if (metadata.contractName) formData.append('contractName', metadata.contractName);
    if (metadata.docTypeName) formData.append('docTypeName', metadata.docTypeName);
    if (metadata.observation) formData.append('observation', metadata.observation);

    const res = await fetch(N8N_WEBHOOK_URL, {
      method: 'POST',
      body: formData,
    });

    if (!res.ok) {
      const errText = await res.text().catch(() => res.statusText);
      throw new Error(`n8n webhook error: ${errText}`);
    }

    const raw = await res.json();

    // Response is an array — take the first element
    const entry = Array.isArray(raw) ? raw[0] : raw;

    const score = typeof entry.compliance_score === 'number' ? entry.compliance_score : 0;

    return {
      document_type: entry.document_type || '',
      compliance_score: score,
      summary: entry.summary || { total_fields: 0, present: 0, missing: 0, invalid: 0 },
      checklist: entry.checklist || [],
      recommendation: score >= 85 ? 'approve' : score >= 50 ? 'correction' : 'reject',
    };
  },
};
