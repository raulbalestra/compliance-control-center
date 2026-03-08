import type { Document, Exception, PendingItem, Client, Contract, Site, Worker, Provider, DocTypeConfig, ComplianceRule, AuditLog, Integration, Automation, Process, AppUser } from "@/types";

export const initialDocuments: Document[] = [
  { id: 1, worker: "Carlos Silva", workerId: 1, contract: "Refinery Maintenance 2024", contractId: 1, client: "Petrobras", clientId: 1, docType: "Medical Certificate (ASO)", docTypeId: 1, status: "validating", validation: "pending", expiration: "2024-06-15", submission: "Pending", priority: "high", lastUpdate: "2 min ago", origin: "Email", version: 1, validationScore: 85, comments: [{ id: 1, author: "Agent", text: "Document received and queued for validation", timestamp: "Apr 5, 14:25" }], timeline: [{ id: 1, action: "Document received and queued", actor: "System", actorType: "system", timestamp: "Apr 5, 14:25" }, { id: 2, action: "Metadata extracted", actor: "Agent", actorType: "agent", timestamp: "Apr 5, 14:28" }, { id: 3, action: "Validation in progress", actor: "Agent", actorType: "agent", timestamp: "Apr 5, 14:30" }] },
  { id: 2, worker: "Maria Santos", workerId: 2, contract: "Pipeline Construction", contractId: 2, client: "Shell Brasil", clientId: 2, docType: "NR-35 Training", docTypeId: 5, status: "ready", validation: "pass", expiration: "2025-01-20", submission: "Ready", priority: "medium", lastUpdate: "15 min ago", origin: "Portal", version: 1, validationScore: 98, comments: [], timeline: [{ id: 4, action: "Document uploaded via portal", actor: "Maria Santos", actorType: "human", timestamp: "Apr 5, 13:00" }, { id: 5, action: "Validated - all checks passed", actor: "Agent", actorType: "agent", timestamp: "Apr 5, 13:15" }] },
  { id: 3, worker: "João Oliveira", workerId: 3, contract: "Platform Inspection", contractId: 3, client: "Petrobras", clientId: 1, docType: "NR-10 Certificate", docTypeId: 3, status: "validation_failed", validation: "fail", expiration: "2024-03-01", submission: "Blocked", priority: "critical", lastUpdate: "1 hour ago", origin: "Email", version: 2, validationScore: 32, comments: [{ id: 2, author: "Agent", text: "Certificate expired 45 days ago", timestamp: "Apr 5, 14:28" }], timeline: [{ id: 6, action: "Document received", actor: "System", actorType: "system", timestamp: "Apr 5, 13:00" }, { id: 7, action: "Validation failed - expired", actor: "Agent", actorType: "agent", timestamp: "Apr 5, 14:28" }] },
  { id: 4, worker: "Ana Costa", workerId: 4, contract: "Refinery Maintenance 2024", contractId: 1, client: "Petrobras", clientId: 1, docType: "Payroll Receipt", docTypeId: 6, status: "submitted", validation: "pass", expiration: "2024-12-31", submission: "Submitted", priority: "low", lastUpdate: "3 hours ago", origin: "API", version: 1, validationScore: 100, comments: [], timeline: [{ id: 8, action: "Document submitted to Petrobras", actor: "Agent", actorType: "agent", timestamp: "Apr 5, 10:00" }] },
  { id: 5, worker: "Pedro Mendes", workerId: 5, contract: "Gas Plant Upgrade", contractId: 4, client: "TotalEnergies", clientId: 3, docType: "FGTS Payment Proof", docTypeId: 7, status: "waiting", validation: "pending", expiration: "2024-07-30", submission: "Pending", priority: "high", lastUpdate: "5 hours ago", origin: "Pending", version: 1, validationScore: 0, comments: [], timeline: [{ id: 9, action: "Document requested from worker", actor: "Agent", actorType: "agent", timestamp: "Apr 5, 08:00" }] },
  { id: 6, worker: "Lucia Ferreira", workerId: 6, contract: "Pipeline Construction", contractId: 2, client: "Shell Brasil", clientId: 2, docType: "eSocial Submission", docTypeId: 8, status: "rejected", validation: "fail", expiration: "2024-08-15", submission: "Rejected", priority: "critical", lastUpdate: "30 min ago", origin: "API", version: 1, validationScore: 45, comments: [{ id: 3, author: "Shell Platform", text: "Invalid XML format", timestamp: "Apr 5, 14:00" }], timeline: [{ id: 10, action: "Submitted to Shell platform", actor: "Agent", actorType: "agent", timestamp: "Apr 5, 13:30" }, { id: 11, action: "Rejected by platform", actor: "System", actorType: "system", timestamp: "Apr 5, 14:00" }], rejectionReason: "Invalid XML format" },
  { id: 7, worker: "Rafael Almeida", workerId: 7, contract: "Offshore Maintenance", contractId: 5, client: "Equinor", clientId: 4, docType: "Safety Training NR-33", docTypeId: 4, status: "received", validation: "pending", expiration: "2025-03-10", submission: "Pending", priority: "medium", lastUpdate: "1 hour ago", origin: "Upload", version: 1, validationScore: 0, comments: [], timeline: [{ id: 12, action: "Document received", actor: "System", actorType: "system", timestamp: "Apr 5, 13:00" }] },
  { id: 8, worker: "Fernanda Lima", workerId: 8, contract: "Refinery Maintenance 2024", contractId: 1, client: "Petrobras", clientId: 1, docType: "Medical Certificate (ASO)", docTypeId: 1, status: "approved", validation: "pass", expiration: "2025-06-20", submission: "Ready", priority: "low", lastUpdate: "4 hours ago", origin: "Portal", version: 1, validationScore: 96, comments: [], timeline: [{ id: 13, action: "Approved by agent", actor: "Agent", actorType: "agent", timestamp: "Apr 5, 09:00" }] },
  { id: 9, worker: "Roberto Dias", workerId: 9, contract: "Refinery Maintenance 2024", contractId: 1, client: "Petrobras", clientId: 1, docType: "NR-10 Certificate", docTypeId: 3, status: "validating", validation: "pending", expiration: "2025-02-28", submission: "Pending", priority: "medium", lastUpdate: "20 min ago", origin: "Email", version: 1, validationScore: 72, comments: [], timeline: [{ id: 14, action: "Document under validation", actor: "Agent", actorType: "agent", timestamp: "Apr 5, 14:10" }] },
  { id: 10, worker: "Amanda Rocha", workerId: 10, contract: "Offshore Maintenance", contractId: 5, client: "Equinor", clientId: 4, docType: "NR-35 Training", docTypeId: 5, status: "waiting", validation: "pending", expiration: "2024-04-25", submission: "Pending", priority: "high", lastUpdate: "2 hours ago", origin: "Pending", version: 1, validationScore: 0, comments: [], timeline: [{ id: 15, action: "Requested from worker", actor: "Agent", actorType: "agent", timestamp: "Apr 5, 11:00" }] },
];

export const initialExceptions: Exception[] = [
  { id: 1, worker: "João Oliveira", workerId: 3, contract: "Platform Inspection", contractId: 3, document: "NR-10 Certificate", documentId: 3, error: "Certificate expired 45 days ago", risk: "critical", deadline: "2024-04-15", resolution: "Request updated certificate from training provider", status: "open", assignedTo: "João Analista", comments: [], timeline: [{ id: 20, action: "Exception created", actor: "Agent", actorType: "agent", timestamp: "Apr 5, 14:28" }], justification: undefined },
  { id: 2, worker: "Lucia Ferreira", workerId: 6, contract: "Pipeline Construction", contractId: 2, document: "eSocial Submission", documentId: 6, error: "Client platform rejected - invalid format", risk: "high", deadline: "2024-04-10", resolution: "Resubmit with corrected XML format", status: "open", assignedTo: "", comments: [], timeline: [{ id: 21, action: "Exception created from platform rejection", actor: "System", actorType: "system", timestamp: "Apr 5, 14:00" }] },
  { id: 3, worker: "Pedro Mendes", workerId: 5, contract: "Gas Plant Upgrade", contractId: 4, document: "FGTS Payment Proof", documentId: 5, error: "Document not received within deadline", risk: "high", deadline: "2024-04-08", resolution: "Contact HR department for document", status: "in_progress", assignedTo: "Maria Coordenadora", comments: [{ id: 10, author: "Maria Coordenadora", text: "HR contacted, awaiting response", timestamp: "Apr 5, 13:00" }], timeline: [] },
  { id: 4, worker: "Roberto Dias", workerId: 9, contract: "Refinery Maintenance 2024", contractId: 1, document: "Medical Certificate", documentId: 9, error: "Unreadable scan - low resolution", risk: "medium", deadline: "2024-04-20", resolution: "Request new scan with minimum 300 DPI", status: "open", assignedTo: "", comments: [], timeline: [] },
  { id: 5, worker: "Amanda Rocha", workerId: 10, contract: "Offshore Maintenance", contractId: 5, document: "NR-35 Training", documentId: 10, error: "Name mismatch between document and registration", risk: "medium", deadline: "2024-04-25", resolution: "Verify worker registration data", status: "open", assignedTo: "", comments: [], timeline: [] },
];

export const initialPendingItems: PendingItem[] = [
  { id: 1, type: "expired", documentId: 3, documentName: "NR-10 Certificate - João Oliveira", workerId: 3, workerName: "João Oliveira", clientId: 1, clientName: "Petrobras", contractId: 3, contractName: "Platform Inspection", description: "Certificate expired, needs renewal", priority: "critical", status: "open", assignedTo: "João Analista", slaDeadline: "2024-04-15", createdAt: "Apr 5, 14:28", comments: [], timeline: [] },
  { id: 2, type: "rejected", documentId: 6, documentName: "eSocial - Lucia Ferreira", workerId: 6, workerName: "Lucia Ferreira", clientId: 2, clientName: "Shell Brasil", contractId: 2, contractName: "Pipeline Construction", description: "Rejected by platform - invalid XML format", priority: "high", status: "open", assignedTo: "", slaDeadline: "2024-04-10", createdAt: "Apr 5, 14:00", comments: [], timeline: [] },
  { id: 3, type: "missing_doc", documentId: 5, documentName: "FGTS - Pedro Mendes", workerId: 5, workerName: "Pedro Mendes", clientId: 3, clientName: "TotalEnergies", contractId: 4, contractName: "Gas Plant Upgrade", description: "FGTS payment proof not received", priority: "high", status: "in_progress", assignedTo: "Maria Coordenadora", slaDeadline: "2024-04-08", createdAt: "Apr 5, 08:00", comments: [], timeline: [] },
  { id: 4, type: "correction", documentId: 9, documentName: "Medical Certificate - Roberto Dias", workerId: 9, workerName: "Roberto Dias", clientId: 1, clientName: "Petrobras", contractId: 1, contractName: "Refinery Maintenance 2024", description: "Scan quality too low, need 300 DPI minimum", priority: "medium", status: "open", assignedTo: "", slaDeadline: "2024-04-20", createdAt: "Apr 5, 13:30", comments: [], timeline: [] },
  { id: 5, type: "exception", documentId: 10, documentName: "NR-35 - Amanda Rocha", workerId: 10, workerName: "Amanda Rocha", clientId: 4, clientName: "Equinor", contractId: 5, contractName: "Offshore Maintenance", description: "Name mismatch between document and registration", priority: "medium", status: "open", assignedTo: "", slaDeadline: "2024-04-25", createdAt: "Apr 5, 11:00", comments: [], timeline: [] },
];

export const initialClients: Client[] = [
  { id: 1, name: "Petrobras", cnpj: "33.000.167/0001-01", contracts: 4, activeWorkers: 156, compliance: 87, docs: ["ASO", "NR-10", "NR-33", "NR-35", "Payroll", "FGTS", "eSocial"], active: true, contactEmail: "compliance@petrobras.com", contactPhone: "+55 21 3224-1234" },
  { id: 2, name: "Shell Brasil", cnpj: "33.453.598/0001-23", contracts: 2, activeWorkers: 78, compliance: 92, docs: ["ASO", "NR-10", "NR-35", "Payroll", "FGTS"], active: true, contactEmail: "docs@shell.com.br", contactPhone: "+55 21 3984-5678" },
  { id: 3, name: "TotalEnergies", cnpj: "02.032.297/0001-89", contracts: 1, activeWorkers: 34, compliance: 95, docs: ["ASO", "NR-10", "NR-33", "Payroll", "FGTS", "eSocial"], active: true, contactEmail: "compliance@total.com.br", contactPhone: "+55 21 3456-7890" },
  { id: 4, name: "Equinor", cnpj: "02.272.294/0001-56", contracts: 2, activeWorkers: 45, compliance: 89, docs: ["ASO", "NR-10", "NR-33", "NR-35", "Payroll"], active: true, contactEmail: "brazil@equinor.com", contactPhone: "+55 21 2111-2233" },
];

export const initialContracts: Contract[] = [
  { id: 1, name: "Refinery Maintenance 2024", clientId: 1, clientName: "Petrobras", siteId: 1, siteName: "REPLAN Paulínia", status: "active", startDate: "2024-01-01", endDate: "2024-12-31", workers: 82, compliance: 88 },
  { id: 2, name: "Pipeline Construction", clientId: 2, clientName: "Shell Brasil", siteId: 2, siteName: "Terminal Santos", status: "active", startDate: "2024-03-01", endDate: "2025-02-28", workers: 45, compliance: 91 },
  { id: 3, name: "Platform Inspection", clientId: 1, clientName: "Petrobras", siteId: 3, siteName: "P-76 Platform", status: "active", startDate: "2024-02-01", endDate: "2024-08-31", workers: 28, compliance: 82 },
  { id: 4, name: "Gas Plant Upgrade", clientId: 3, clientName: "TotalEnergies", siteId: 4, siteName: "UTGCA Caraguatatuba", status: "active", startDate: "2024-01-15", endDate: "2025-01-14", workers: 34, compliance: 95 },
  { id: 5, name: "Offshore Maintenance", clientId: 4, clientName: "Equinor", siteId: 5, siteName: "Peregrino FPSO", status: "active", startDate: "2024-04-01", endDate: "2025-03-31", workers: 45, compliance: 89 },
  { id: 6, name: "REVAP Upgrade", clientId: 1, clientName: "Petrobras", siteId: 6, siteName: "REVAP São José", status: "active", startDate: "2024-06-01", endDate: "2025-05-31", workers: 36, compliance: 85 },
];

export const initialSites: Site[] = [
  { id: 1, name: "REPLAN Paulínia", clientId: 1, clientName: "Petrobras", address: "Paulínia, SP", contracts: 1, workers: 82, active: true },
  { id: 2, name: "Terminal Santos", clientId: 2, clientName: "Shell Brasil", address: "Santos, SP", contracts: 1, workers: 45, active: true },
  { id: 3, name: "P-76 Platform", clientId: 1, clientName: "Petrobras", address: "Bacia de Santos", contracts: 1, workers: 28, active: true },
  { id: 4, name: "UTGCA Caraguatatuba", clientId: 3, clientName: "TotalEnergies", address: "Caraguatatuba, SP", contracts: 1, workers: 34, active: true },
  { id: 5, name: "Peregrino FPSO", clientId: 4, clientName: "Equinor", address: "Bacia de Campos", contracts: 1, workers: 45, active: true },
  { id: 6, name: "REVAP São José", clientId: 1, clientName: "Petrobras", address: "São José dos Campos, SP", contracts: 1, workers: 36, active: true },
];

export const initialWorkers: Worker[] = [
  { id: 1, name: "Carlos Silva", cpf: "***.***.***-12", role: "Mechanical Technician", clientId: 1, clientName: "Petrobras", contractId: 1, contractName: "Refinery Maintenance 2024", status: "active", documents: 5, pendingDocs: 1, compliance: 90 },
  { id: 2, name: "Maria Santos", cpf: "***.***.***-34", role: "Safety Inspector", clientId: 2, clientName: "Shell Brasil", contractId: 2, contractName: "Pipeline Construction", status: "active", documents: 4, pendingDocs: 0, compliance: 100 },
  { id: 3, name: "João Oliveira", cpf: "***.***.***-56", role: "Electrician NR-10", clientId: 1, clientName: "Petrobras", contractId: 3, contractName: "Platform Inspection", status: "blocked", documents: 3, pendingDocs: 2, compliance: 65 },
  { id: 4, name: "Ana Costa", cpf: "***.***.***-78", role: "Administrative Assistant", clientId: 1, clientName: "Petrobras", contractId: 1, contractName: "Refinery Maintenance 2024", status: "active", documents: 6, pendingDocs: 0, compliance: 100 },
  { id: 5, name: "Pedro Mendes", cpf: "***.***.***-90", role: "Welder", clientId: 3, clientName: "TotalEnergies", contractId: 4, contractName: "Gas Plant Upgrade", status: "active", documents: 4, pendingDocs: 1, compliance: 85 },
  { id: 6, name: "Lucia Ferreira", cpf: "***.***.***-11", role: "HR Coordinator", clientId: 2, clientName: "Shell Brasil", contractId: 2, contractName: "Pipeline Construction", status: "active", documents: 3, pendingDocs: 1, compliance: 78 },
  { id: 7, name: "Rafael Almeida", cpf: "***.***.***-22", role: "Confined Space Tech", clientId: 4, clientName: "Equinor", contractId: 5, contractName: "Offshore Maintenance", status: "active", documents: 4, pendingDocs: 1, compliance: 88 },
  { id: 8, name: "Fernanda Lima", cpf: "***.***.***-33", role: "Nurse", clientId: 1, clientName: "Petrobras", contractId: 1, contractName: "Refinery Maintenance 2024", status: "active", documents: 5, pendingDocs: 0, compliance: 100 },
  { id: 9, name: "Roberto Dias", cpf: "***.***.***-44", role: "Mechanical Engineer", clientId: 1, clientName: "Petrobras", contractId: 1, contractName: "Refinery Maintenance 2024", status: "blocked", documents: 2, pendingDocs: 2, compliance: 55 },
  { id: 10, name: "Amanda Rocha", cpf: "***.***.***-55", role: "Scaffolding Tech", clientId: 4, clientName: "Equinor", contractId: 5, contractName: "Offshore Maintenance", status: "active", documents: 3, pendingDocs: 1, compliance: 80 },
];

export const initialProviders: Provider[] = [
  { id: 1, name: "TechServ Engenharia", cnpj: "12.345.678/0001-01", type: "provider", clientId: 1, clientName: "Petrobras", workers: 45, compliance: 88, active: true, contactEmail: "docs@techserv.com.br" },
  { id: 2, name: "SafeWork Consultoria", cnpj: "23.456.789/0001-02", type: "provider", clientId: 2, clientName: "Shell Brasil", workers: 22, compliance: 94, active: true, contactEmail: "compliance@safework.com.br" },
  { id: 3, name: "Montagens Industriais SA", cnpj: "34.567.890/0001-03", type: "subcontractor", clientId: 1, clientName: "Petrobras", workers: 38, compliance: 82, active: true, contactEmail: "admin@montagens.com.br" },
  { id: 4, name: "Offshore Solutions", cnpj: "45.678.901/0001-04", type: "subcontractor", clientId: 4, clientName: "Equinor", workers: 28, compliance: 91, active: true, contactEmail: "ops@offshore.com.br" },
  { id: 5, name: "Serv Industrial Ltda", cnpj: "56.789.012/0001-05", type: "provider", clientId: 3, clientName: "TotalEnergies", workers: 15, compliance: 96, active: true, contactEmail: "admin@servindustrial.com.br" },
];

export const initialDocTypes: DocTypeConfig[] = [
  { id: 1, name: "Medical Certificate (ASO)", category: "Health & Safety", criticality: "high", validity: "12 months", recurrence: "Annual", acceptedFormats: ["PDF", "JPG", "PNG"], mandatory: true, active: true },
  { id: 2, name: "PCMSO Report", category: "Health & Safety", criticality: "high", validity: "12 months", recurrence: "Annual", acceptedFormats: ["PDF"], mandatory: true, active: true },
  { id: 3, name: "NR-10 Certificate", category: "Training", criticality: "critical", validity: "24 months", recurrence: "Biennial", acceptedFormats: ["PDF"], mandatory: true, active: true },
  { id: 4, name: "NR-33 Certificate", category: "Training", criticality: "critical", validity: "12 months", recurrence: "Annual", acceptedFormats: ["PDF"], mandatory: true, active: true },
  { id: 5, name: "NR-35 Training", category: "Training", criticality: "critical", validity: "24 months", recurrence: "Biennial", acceptedFormats: ["PDF"], mandatory: true, active: true },
  { id: 6, name: "Payroll Receipt", category: "Labor", criticality: "medium", validity: "Monthly", recurrence: "Monthly", acceptedFormats: ["PDF", "JPG"], mandatory: true, active: true },
  { id: 7, name: "FGTS Payment Proof", category: "Labor", criticality: "high", validity: "Monthly", recurrence: "Monthly", acceptedFormats: ["PDF"], mandatory: true, active: true },
  { id: 8, name: "eSocial Submission", category: "Compliance", criticality: "high", validity: "Monthly", recurrence: "Monthly", acceptedFormats: ["XML", "PDF"], mandatory: true, active: true },
  { id: 9, name: "Work Contract", category: "Labor", criticality: "medium", validity: "Contract duration", recurrence: "Once", acceptedFormats: ["PDF"], mandatory: true, active: true },
  { id: 10, name: "CREA/CRF Registration", category: "Professional", criticality: "medium", validity: "12 months", recurrence: "Annual", acceptedFormats: ["PDF", "JPG"], mandatory: false, active: true },
];

export const initialRules: ComplianceRule[] = [
  { id: 1, name: "ASO Petrobras", clientId: 1, clientName: "Petrobras", contractId: null, contractName: "All", docTypeId: 1, docTypeName: "Medical Certificate (ASO)", required: true, expiration: "12 months", frequency: "Annual", validation: "Signature + Date + Name match", deadline: "30 days before expiry", priority: "high", impact: "Blocks site access", blocksAccess: true, blocksPayment: false, active: true },
  { id: 2, name: "NR-10 Petrobras Refinery", clientId: 1, clientName: "Petrobras", contractId: 1, contractName: "Refinery Maintenance", docTypeId: 3, docTypeName: "NR-10 Certificate", required: true, expiration: "24 months", frequency: "Biennial", validation: "Certificate number + Training provider", deadline: "60 days before expiry", priority: "critical", impact: "Blocks access + payment", blocksAccess: true, blocksPayment: true, active: true },
  { id: 3, name: "NR-35 Shell", clientId: 2, clientName: "Shell Brasil", contractId: null, contractName: "All", docTypeId: 5, docTypeName: "NR-35 Training", required: true, expiration: "24 months", frequency: "Biennial", validation: "Certificate + Signature + Provider", deadline: "45 days before expiry", priority: "high", impact: "Blocks site access", blocksAccess: true, blocksPayment: false, active: true },
  { id: 4, name: "Payroll General", clientId: null, clientName: "All", contractId: null, contractName: "All", docTypeId: 6, docTypeName: "Payroll Receipt", required: true, expiration: "Monthly", frequency: "Monthly", validation: "Worker name + CPF + Period", deadline: "10th of following month", priority: "medium", impact: "Compliance warning", blocksAccess: false, blocksPayment: false, active: true },
  { id: 5, name: "FGTS General", clientId: null, clientName: "All", contractId: null, contractName: "All", docTypeId: 7, docTypeName: "FGTS Payment Proof", required: true, expiration: "Monthly", frequency: "Monthly", validation: "Company CNPJ + Period + Amount", deadline: "48 hours after due date", priority: "high", impact: "Blocks payment", blocksAccess: false, blocksPayment: true, active: true },
  { id: 6, name: "NR-33 TotalEnergies", clientId: 3, clientName: "TotalEnergies", contractId: 4, contractName: "Gas Plant Upgrade", docTypeId: 4, docTypeName: "NR-33 Certificate", required: true, expiration: "12 months", frequency: "Annual", validation: "Certificate + Provider + Hours", deadline: "30 days before expiry", priority: "critical", impact: "Blocks access + payment", blocksAccess: true, blocksPayment: true, active: true },
];

export const initialAuditLogs: AuditLog[] = [
  { id: 1, timestamp: "2024-04-05 14:32:15", action: "Document validated", actor: "Agent", actorType: "agent", module: "Documents", entity: "document", entityId: 1, document: "ASO - Carlos Silva", result: "Approved" },
  { id: 2, timestamp: "2024-04-05 14:28:03", action: "Document rejected", actor: "Agent", actorType: "agent", module: "Documents", entity: "document", entityId: 3, document: "NR-10 - João Oliveira", result: "Expired certificate" },
  { id: 3, timestamp: "2024-04-05 14:15:44", action: "Correction requested", actor: "Agent", actorType: "agent", module: "Documents", entity: "document", entityId: 6, document: "eSocial - Lucia Ferreira", result: "Format error" },
  { id: 4, timestamp: "2024-04-05 13:58:21", action: "Document uploaded", actor: "Maria Santos", actorType: "human", module: "Documents", entity: "document", entityId: 2, document: "NR-35 Training", result: "Queued for validation" },
  { id: 5, timestamp: "2024-04-05 13:45:10", action: "Submitted to platform", actor: "Agent", actorType: "agent", module: "Documents", entity: "document", entityId: 4, document: "Payroll - Ana Costa", result: "Accepted" },
  { id: 6, timestamp: "2024-04-05 13:30:55", action: "Exception escalated", actor: "Admin User", actorType: "human", module: "Exceptions", entity: "exception", entityId: 3, document: "FGTS - Pedro Mendes", result: "Assigned to HR team" },
  { id: 7, timestamp: "2024-04-05 13:12:08", action: "Client response received", actor: "System", actorType: "agent", module: "Integrations", entity: "document", entityId: 8, document: "ASO - Fernanda Lima", result: "Accepted" },
  { id: 8, timestamp: "2024-04-05 12:55:33", action: "Validation override", actor: "Compliance Manager", actorType: "human", module: "Documents", entity: "document", entityId: 7, document: "NR-33 - Rafael Almeida", result: "Approved with note" },
  { id: 9, timestamp: "2024-04-05 12:40:19", action: "Batch submission", actor: "Agent", actorType: "agent", module: "Documents", entity: "batch", entityId: 0, document: "12 documents - Shell Brasil", result: "11 accepted, 1 rejected" },
  { id: 10, timestamp: "2024-04-05 12:22:47", action: "Rule updated", actor: "Admin User", actorType: "human", module: "Rules", entity: "rule", entityId: 2, document: "NR-10 expiration rule", result: "Changed to 90 days" },
];

export const initialIntegrations: Integration[] = [
  { id: 1, name: "Petrobras SGIP", type: "Client Platform", status: "active", lastSync: "2 min ago", documentsProcessed: 1245, errorRate: 1.2 },
  { id: 2, name: "Shell DocManager", type: "Client Platform", status: "active", lastSync: "15 min ago", documentsProcessed: 456, errorRate: 2.8 },
  { id: 3, name: "eSocial Gov", type: "Government", status: "active", lastSync: "1 hour ago", documentsProcessed: 890, errorRate: 0.5 },
  { id: 4, name: "Email Gateway", type: "Communication", status: "active", lastSync: "5 min ago", documentsProcessed: 3200, errorRate: 0.1 },
  { id: 5, name: "OCR Service", type: "Processing", status: "error", lastSync: "3 hours ago", documentsProcessed: 15600, errorRate: 5.2 },
  { id: 6, name: "TotalEnergies Portal", type: "Client Platform", status: "inactive", lastSync: "2 days ago", documentsProcessed: 120, errorRate: 0 },
];

export const initialAutomations: Automation[] = [
  { id: 1, name: "Auto-validate ASO", description: "Automatically validate ASO documents when all checks pass", trigger: "Document received (ASO type)", action: "Run validation pipeline", status: "active", executions: 456, lastRun: "5 min ago", successRate: 94.2 },
  { id: 2, name: "Expiry Alert 30d", description: "Send alert when document expires within 30 days", trigger: "Daily scan at 08:00", action: "Send email notification", status: "active", executions: 1200, lastRun: "Today 08:00", successRate: 100 },
  { id: 3, name: "Auto-submit Petrobras", description: "Auto-submit validated documents to Petrobras platform", trigger: "Document status = ready", action: "Submit to SGIP API", status: "active", executions: 890, lastRun: "15 min ago", successRate: 96.8 },
  { id: 4, name: "Exception Escalation", description: "Escalate unresolved exceptions after 48h", trigger: "Exception age > 48h", action: "Notify coordinator + escalate", status: "active", executions: 34, lastRun: "Yesterday 18:00", successRate: 100 },
  { id: 5, name: "Batch Payroll Check", description: "Monthly batch validation of payroll receipts", trigger: "1st business day of month", action: "Validate all pending payroll docs", status: "inactive", executions: 12, lastRun: "Apr 1, 08:00", successRate: 88.5 },
];

export const initialProcesses: Process[] = [
  { id: 1, name: "Monthly Compliance - Petrobras", clientName: "Petrobras", type: "Monthly Compliance", status: "active", documents: 156, progress: 78, deadline: "2024-04-30" },
  { id: 2, name: "Worker Onboarding - Shell", clientName: "Shell Brasil", type: "Onboarding", status: "active", documents: 24, progress: 45, deadline: "2024-04-15" },
  { id: 3, name: "Annual NR Renewal", clientName: "All", type: "Renewal", status: "active", documents: 89, progress: 62, deadline: "2024-06-30" },
  { id: 4, name: "Quarterly Audit - Equinor", clientName: "Equinor", type: "Audit", status: "active", documents: 45, progress: 90, deadline: "2024-04-10" },
  { id: 5, name: "FGTS Monthly - March", clientName: "All", type: "Monthly Compliance", status: "completed", documents: 312, progress: 100, deadline: "2024-03-31" },
];

export const initialUsers: AppUser[] = [
  { id: "u1", name: "Admin User", email: "admin@demo.com", role: "admin", active: true, lastAccess: "2024-04-05 14:30", createdAt: "2024-01-01" },
  { id: "u2", name: "Maria Coordenadora", email: "coordenador@demo.com", role: "coordinator", active: true, lastAccess: "2024-04-05 13:45", createdAt: "2024-01-15" },
  { id: "u3", name: "João Analista", email: "analista@demo.com", role: "analyst", active: true, lastAccess: "2024-04-05 14:20", createdAt: "2024-02-01" },
  { id: "u4", name: "TechServ Ltda", email: "fornecedor@demo.com", role: "provider", active: true, lastAccess: "2024-04-04 16:00", createdAt: "2024-02-15" },
  { id: "u5", name: "Carlos Auditor", email: "auditor@company.com", role: "auditor", active: true, lastAccess: "2024-04-03 10:00", createdAt: "2024-03-01" },
  { id: "u6", name: "Paula Viewer", email: "paula@company.com", role: "viewer", active: false, lastAccess: "2024-03-20 09:00", createdAt: "2024-03-15" },
];

export const activityTimeline = [
  { time: "2 min ago", action: "Agent validated Medical Certificate for Carlos Silva", type: "agent" as const },
  { time: "15 min ago", action: "NR-35 Training for Maria Santos marked as ready", type: "agent" as const },
  { time: "30 min ago", action: "eSocial submission rejected by Shell platform", type: "system" as const },
  { time: "1 hour ago", action: "Exception escalated: NR-10 expired for João Oliveira", type: "agent" as const },
  { time: "2 hours ago", action: "Analyst approved override for NR-33 certificate", type: "human" as const },
  { time: "3 hours ago", action: "Batch of 12 payroll receipts submitted to Petrobras", type: "agent" as const },
  { time: "4 hours ago", action: "New compliance rule added: FGTS 48h deadline", type: "human" as const },
];
