export type UserRole = "admin" | "coordinator" | "analyst" | "provider" | "auditor" | "viewer";

export interface AppUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  active: boolean;
  lastAccess: string;
  createdAt: string;
}

export type DocStatus = "waiting" | "received" | "uploaded" | "processing" | "processed" | "validating" | "validation_failed" | "approved" | "ready" | "submitted" | "rejected" | "correction_requested" | "needs_correction" | "reprocessing" | "exception";
export type Priority = "critical" | "high" | "medium" | "low";
export type ValidationResult = "pass" | "fail" | "warning" | "pending";

export interface Document {
  id: number;
  worker: string;
  workerId: number;
  contract: string;
  contractId: number;
  client: string;
  clientId: number;
  docType: string;
  docTypeId: number;
  status: DocStatus;
  validation: ValidationResult;
  expiration: string;
  submission: string;
  priority: Priority;
  lastUpdate: string;
  origin: string;
  version: number;
  validationScore: number;
  comments: Comment[];
  timeline: TimelineEntry[];
  assignedTo?: string;
  rejectionReason?: string;
  exceptionReason?: string;
  agentRecommendation?: string;
  agentRecommendationPt?: string;
}

export interface Comment {
  id: number;
  author: string;
  text: string;
  timestamp: string;
}

export interface TimelineEntry {
  id: number;
  action: string;
  actor: string;
  actorType: "agent" | "human" | "system";
  timestamp: string;
}

export interface Client {
  id: number;
  name: string;
  cnpj: string;
  contracts: number;
  activeWorkers: number;
  compliance: number;
  docs: string[];
  active: boolean;
  contactEmail: string;
  contactPhone: string;
}

export interface Contract {
  id: number;
  name: string;
  clientId: number;
  clientName: string;
  siteId: number;
  siteName: string;
  status: "active" | "inactive" | "suspended";
  startDate: string;
  endDate: string;
  workers: number;
  compliance: number;
}

export interface Site {
  id: number;
  name: string;
  clientId: number;
  clientName: string;
  address: string;
  contracts: number;
  workers: number;
  active: boolean;
}

export interface Worker {
  id: number;
  name: string;
  cpf: string;
  role: string;
  clientId: number;
  clientName: string;
  contractId: number;
  contractName: string;
  workerStatus: "active" | "blocked" | "inactive";
  documents: number;
  pendingDocs: number;
  compliance: number;
}

export interface Provider {
  id: number;
  name: string;
  cnpj: string;
  type: "provider" | "subcontractor";
  clientId: number;
  clientName: string;
  workers: number;
  compliance: number;
  active: boolean;
  contactEmail: string;
}

export interface DocTypeConfig {
  id: number;
  name: string;
  category: string;
  criticality: Priority;
  validity: string;
  recurrence: string;
  acceptedFormats: string[];
  mandatory: boolean;
  active: boolean;
}

export interface ComplianceRule {
  id: number;
  name: string;
  clientId: number | null;
  clientName: string;
  contractId: number | null;
  contractName: string;
  docTypeId: number;
  docTypeName: string;
  required: boolean;
  expiration: string;
  frequency: string;
  validation: string;
  deadline: string;
  priority: Priority;
  impact: string;
  blocksAccess: boolean;
  blocksPayment: boolean;
  active: boolean;
}

export interface PendingItem {
  id: number;
  type: "correction" | "missing_doc" | "expired" | "rejected" | "exception";
  documentId: number | null;
  documentName: string;
  workerId: number;
  workerName: string;
  clientId: number;
  clientName: string;
  contractId: number;
  contractName: string;
  description: string;
  priority: Priority;
  status: "open" | "in_progress" | "resolved" | "escalated";
  assignedTo: string;
  slaDeadline: string;
  createdAt: string;
  comments: Comment[];
  timeline: TimelineEntry[];
}

export interface Exception {
  id: number;
  worker: string;
  workerId: number;
  contract: string;
  contractId: number;
  document: string;
  documentId: number;
  error: string;
  risk: Priority;
  deadline: string;
  resolution: string;
  status: "open" | "in_progress" | "resolved" | "escalated";
  assignedTo: string;
  justification?: string;
  comments: Comment[];
  timeline: TimelineEntry[];
}

export interface AuditLog {
  id: number;
  timestamp: string;
  action: string;
  actor: string;
  actorType: "agent" | "human" | "system";
  module: string;
  entity: string;
  entityId: number;
  document: string;
  result: string;
  details?: string;
}

export interface Integration {
  id: number;
  name: string;
  type: string;
  status: "active" | "error" | "inactive";
  lastSync: string;
  documentsProcessed: number;
  errorRate: number;
}

export interface Automation {
  id: number;
  name: string;
  description: string;
  trigger: string;
  action: string;
  status: "active" | "inactive";
  executions: number;
  lastRun: string;
  successRate: number;
}

export interface Process {
  id: number;
  name: string;
  clientName: string;
  type: string;
  status: "active" | "completed" | "suspended";
  documents: number;
  progress: number;
  deadline: string;
}

export interface RolePermission {
  role: UserRole;
  roleName: string;
  modules: { name: string; read: boolean; write: boolean; delete: boolean }[];
}

export const ROLE_LABELS: Record<UserRole, { en: string; pt: string }> = {
  admin: { en: "Administrator", pt: "Administrador" },
  coordinator: { en: "Coordinator", pt: "Coordenador" },
  analyst: { en: "Analyst", pt: "Analista" },
  provider: { en: "Provider", pt: "Fornecedor" },
  auditor: { en: "Auditor", pt: "Auditor" },
  viewer: { en: "Viewer", pt: "Visualizador" },
};

export const DEMO_USERS: { email: string; password: string; role: UserRole; name: string }[] = [
  { email: "admin@demo.com", password: "123456", role: "admin", name: "Admin User" },
  { email: "coordenador@demo.com", password: "123456", role: "coordinator", name: "Maria Coordenadora" },
  { email: "analista@demo.com", password: "123456", role: "analyst", name: "João Analista" },
  { email: "fornecedor@demo.com", password: "123456", role: "provider", name: "TechServ Ltda" },
];
