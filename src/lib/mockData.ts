export const documents = [
  { id: 1, worker: "Carlos Silva", contract: "Refinery Maintenance 2024", client: "Petrobras", docType: "Medical Certificate (ASO)", status: "validating" as const, validation: "pending", expiration: "2024-06-15", submission: "Pending", priority: "high" as const, lastUpdate: "2 min ago" },
  { id: 2, worker: "Maria Santos", contract: "Pipeline Construction", client: "Shell Brasil", docType: "NR-35 Training", status: "ready" as const, validation: "pass", expiration: "2025-01-20", submission: "Ready", priority: "medium" as const, lastUpdate: "15 min ago" },
  { id: 3, worker: "João Oliveira", contract: "Platform Inspection", client: "Petrobras", docType: "NR-10 Certificate", status: "validation_failed" as const, validation: "fail", expiration: "2024-03-01", submission: "Blocked", priority: "critical" as const, lastUpdate: "1 hour ago" },
  { id: 4, worker: "Ana Costa", contract: "Refinery Maintenance 2024", client: "Petrobras", docType: "Payroll Receipt", status: "submitted" as const, validation: "pass", expiration: "2024-12-31", submission: "Submitted", priority: "low" as const, lastUpdate: "3 hours ago" },
  { id: 5, worker: "Pedro Mendes", contract: "Gas Plant Upgrade", client: "TotalEnergies", docType: "FGTS Payment Proof", status: "waiting" as const, validation: "pending", expiration: "2024-07-30", submission: "Pending", priority: "high" as const, lastUpdate: "5 hours ago" },
  { id: 6, worker: "Lucia Ferreira", contract: "Pipeline Construction", client: "Shell Brasil", docType: "eSocial Submission", status: "rejected" as const, validation: "fail", expiration: "2024-08-15", submission: "Rejected", priority: "critical" as const, lastUpdate: "30 min ago" },
  { id: 7, worker: "Rafael Almeida", contract: "Offshore Maintenance", client: "Equinor", docType: "Safety Training NR-33", status: "received" as const, validation: "pending", expiration: "2025-03-10", submission: "Pending", priority: "medium" as const, lastUpdate: "1 hour ago" },
  { id: 8, worker: "Fernanda Lima", contract: "Refinery Maintenance 2024", client: "Petrobras", docType: "Medical Certificate (ASO)", status: "ready" as const, validation: "pass", expiration: "2025-06-20", submission: "Ready", priority: "low" as const, lastUpdate: "4 hours ago" },
];

export const exceptions = [
  { id: 1, worker: "João Oliveira", contract: "Platform Inspection", document: "NR-10 Certificate", error: "Certificate expired 45 days ago", risk: "critical" as const, deadline: "2024-04-15", resolution: "Request updated certificate from training provider" },
  { id: 2, worker: "Lucia Ferreira", contract: "Pipeline Construction", document: "eSocial Submission", error: "Client platform rejected - invalid format", risk: "high" as const, deadline: "2024-04-10", resolution: "Resubmit with corrected XML format" },
  { id: 3, worker: "Pedro Mendes", contract: "Gas Plant Upgrade", document: "FGTS Payment Proof", error: "Document not received within deadline", risk: "high" as const, deadline: "2024-04-08", resolution: "Contact HR department for document" },
  { id: 4, worker: "Roberto Dias", contract: "Refinery Maintenance 2024", document: "Medical Certificate", error: "Unreadable scan - low resolution", risk: "medium" as const, deadline: "2024-04-20", resolution: "Request new scan with minimum 300 DPI" },
  { id: 5, worker: "Amanda Rocha", contract: "Offshore Maintenance", document: "NR-35 Training", error: "Name mismatch between document and registration", risk: "medium" as const, deadline: "2024-04-25", resolution: "Verify worker registration data" },
];

export const clients = [
  { id: 1, name: "Petrobras", contracts: 4, activeWorkers: 156, compliance: 87, docs: ["ASO", "NR-10", "NR-33", "NR-35", "Payroll", "FGTS", "eSocial"] },
  { id: 2, name: "Shell Brasil", contracts: 2, activeWorkers: 78, compliance: 92, docs: ["ASO", "NR-10", "NR-35", "Payroll", "FGTS"] },
  { id: 3, name: "TotalEnergies", contracts: 1, activeWorkers: 34, compliance: 95, docs: ["ASO", "NR-10", "NR-33", "Payroll", "FGTS", "eSocial"] },
  { id: 4, name: "Equinor", contracts: 2, activeWorkers: 45, compliance: 89, docs: ["ASO", "NR-10", "NR-33", "NR-35", "Payroll"] },
];

export const auditLogs = [
  { id: 1, timestamp: "2024-04-05 14:32:15", action: "Document validated", actor: "Agent", actorType: "agent" as const, document: "ASO - Carlos Silva", result: "Approved" },
  { id: 2, timestamp: "2024-04-05 14:28:03", action: "Document rejected", actor: "Agent", actorType: "agent" as const, document: "NR-10 - João Oliveira", result: "Expired certificate" },
  { id: 3, timestamp: "2024-04-05 14:15:44", action: "Correction requested", actor: "Agent", actorType: "agent" as const, document: "eSocial - Lucia Ferreira", result: "Format error" },
  { id: 4, timestamp: "2024-04-05 13:58:21", action: "Document uploaded", actor: "Maria Santos", actorType: "human" as const, document: "NR-35 Training", result: "Queued for validation" },
  { id: 5, timestamp: "2024-04-05 13:45:10", action: "Submitted to platform", actor: "Agent", actorType: "agent" as const, document: "Payroll - Ana Costa", result: "Accepted" },
  { id: 6, timestamp: "2024-04-05 13:30:55", action: "Exception escalated", actor: "Admin User", actorType: "human" as const, document: "FGTS - Pedro Mendes", result: "Assigned to HR team" },
  { id: 7, timestamp: "2024-04-05 13:12:08", action: "Client response received", actor: "System", actorType: "agent" as const, document: "ASO - Fernanda Lima", result: "Accepted" },
  { id: 8, timestamp: "2024-04-05 12:55:33", action: "Validation override", actor: "Compliance Manager", actorType: "human" as const, document: "NR-33 - Rafael Almeida", result: "Approved with note" },
  { id: 9, timestamp: "2024-04-05 12:40:19", action: "Batch submission", actor: "Agent", actorType: "agent" as const, document: "12 documents - Shell Brasil", result: "11 accepted, 1 rejected" },
  { id: 10, timestamp: "2024-04-05 12:22:47", action: "Rule updated", actor: "Admin User", actorType: "human" as const, document: "NR-10 expiration rule", result: "Changed to 90 days" },
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
