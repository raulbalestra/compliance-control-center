import React, { createContext, useContext, useState, useCallback } from "react";
import type { Document, PendingItem, Exception, AuditLog, Client, Contract, Site, Worker, Provider, DocTypeConfig, ComplianceRule, Integration, Automation, Process, Comment, TimelineEntry, AppUser } from "@/types";
import { initialDocuments, initialExceptions, initialPendingItems, initialClients, initialContracts, initialSites, initialWorkers, initialProviders, initialDocTypes, initialRules, initialAuditLogs, initialIntegrations, initialAutomations, initialProcesses, initialUsers } from "@/lib/mockData";

interface AppState {
  documents: Document[];
  exceptions: Exception[];
  pendingItems: PendingItem[];
  clients: Client[];
  contracts: Contract[];
  sites: Site[];
  workers: Worker[];
  providers: Provider[];
  docTypes: DocTypeConfig[];
  rules: ComplianceRule[];
  auditLogs: AuditLog[];
  integrations: Integration[];
  automations: Automation[];
  processes: Process[];
  users: AppUser[];
}

interface AppActions {
  // Document actions
  approveDocument: (id: number, note?: string) => void;
  rejectDocument: (id: number, reason: string) => void;
  requestCorrection: (id: number, note: string) => void;
  reprocessDocument: (id: number) => void;
  markException: (id: number, reason: string) => void;
  addDocumentComment: (id: number, author: string, text: string) => void;
  assignDocument: (id: number, assignee: string) => void;
  changeDocumentStatus: (id: number, status: Document["status"]) => void;
  uploadDocument: (doc: Partial<Document>) => void;
  // Exception actions
  resolveException: (id: number) => void;
  escalateException: (id: number) => void;
  assignException: (id: number, assignee: string) => void;
  // Pending actions
  resolvePending: (id: number) => void;
  changePendingPriority: (id: number, priority: PendingItem["priority"]) => void;
  changePendingStatus: (id: number, status: PendingItem["status"]) => void;
  assignPending: (id: number, assignee: string) => void;
  addPendingComment: (id: number, author: string, text: string) => void;
  // Admin actions
  addUser: (user: AppUser) => void;
  updateUser: (id: string, updates: Partial<AppUser>) => void;
  toggleUserActive: (id: string) => void;
  addDocType: (dt: DocTypeConfig) => void;
  updateDocType: (id: number, updates: Partial<DocTypeConfig>) => void;
  addRule: (rule: ComplianceRule) => void;
  updateRule: (id: number, updates: Partial<ComplianceRule>) => void;
  toggleRuleActive: (id: number) => void;
  // Client/Contract
  addClient: (client: Client) => void;
  updateClient: (id: number, updates: Partial<Client>) => void;
  addContract: (contract: Contract) => void;
  updateContract: (id: number, updates: Partial<Contract>) => void;
  // Audit
  addAuditLog: (log: Omit<AuditLog, "id">) => void;
  // Counts
  counts: {
    totalDocs: number;
    approvedDocs: number;
    rejectedDocs: number;
    pendingDocs: number;
    openExceptions: number;
    criticalExceptions: number;
    openPending: number;
    blockedWorkers: number;
  };
}

const AppContext = createContext<(AppState & AppActions) | null>(null);

let nextAuditId = 100;
let nextCommentId = 1000;
let nextTimelineId = 2000;
let nextDocId = 100;

function makeTimeline(action: string, actor: string, actorType: "agent" | "human" | "system" = "human"): TimelineEntry {
  return { id: nextTimelineId++, action, actor, actorType, timestamp: new Date().toLocaleString() };
}

function makeComment(author: string, text: string): Comment {
  return { id: nextCommentId++, author, text, timestamp: new Date().toLocaleString() };
}

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [documents, setDocuments] = useState<Document[]>(initialDocuments);
  const [exceptions, setExceptions] = useState<Exception[]>(initialExceptions);
  const [pendingItems, setPendingItems] = useState<PendingItem[]>(initialPendingItems);
  const [clients, setClients] = useState<Client[]>(initialClients);
  const [contracts, setContracts] = useState<Contract[]>(initialContracts);
  const [sites, setSites] = useState<Site[]>(initialSites);
  const [workers, setWorkers] = useState<Worker[]>(initialWorkers);
  const [providers, setProviders] = useState<Provider[]>(initialProviders);
  const [docTypes, setDocTypes] = useState<DocTypeConfig[]>(initialDocTypes);
  const [rules, setRules] = useState<ComplianceRule[]>(initialRules);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(initialAuditLogs);
  const [integrations] = useState<Integration[]>(initialIntegrations);
  const [automations] = useState<Automation[]>(initialAutomations);
  const [processes] = useState<Process[]>(initialProcesses);
  const [users, setUsers] = useState<AppUser[]>(initialUsers);

  const addAuditLog = useCallback((log: Omit<AuditLog, "id">) => {
    setAuditLogs(prev => [{ ...log, id: nextAuditId++ }, ...prev]);
  }, []);

  // Document actions
  const approveDocument = useCallback((id: number, note?: string) => {
    setDocuments(prev => prev.map(d => d.id === id ? {
      ...d, status: "approved" as const, validation: "pass" as const, lastUpdate: "Just now",
      timeline: [...d.timeline, makeTimeline(`Document approved${note ? `: ${note}` : ""}`, "Current User")],
      comments: note ? [...d.comments, makeComment("Current User", `Approved: ${note}`)] : d.comments,
    } : d));
    addAuditLog({ timestamp: new Date().toLocaleString(), action: "Document approved", actor: "Current User", actorType: "human", module: "Documents", entity: "document", entityId: id, document: `Doc #${id}`, result: "Approved" });
  }, [addAuditLog]);

  const rejectDocument = useCallback((id: number, reason: string) => {
    setDocuments(prev => prev.map(d => d.id === id ? {
      ...d, status: "rejected" as const, validation: "fail" as const, lastUpdate: "Just now", rejectionReason: reason,
      timeline: [...d.timeline, makeTimeline(`Document rejected: ${reason}`, "Current User")],
      comments: [...d.comments, makeComment("Current User", `Rejected: ${reason}`)],
    } : d));
    setPendingItems(prev => [...prev, {
      id: Date.now(), type: "rejected", documentId: id, documentName: `Doc #${id}`, workerId: 0, workerName: "", clientId: 0, clientName: "", contractId: 0, contractName: "",
      description: `Document rejected: ${reason}`, priority: "high", status: "open", assignedTo: "", slaDeadline: "", createdAt: new Date().toLocaleString(), comments: [], timeline: [],
    }]);
    addAuditLog({ timestamp: new Date().toLocaleString(), action: "Document rejected", actor: "Current User", actorType: "human", module: "Documents", entity: "document", entityId: id, document: `Doc #${id}`, result: reason });
  }, [addAuditLog]);

  const requestCorrection = useCallback((id: number, note: string) => {
    setDocuments(prev => prev.map(d => d.id === id ? {
      ...d, status: "correction_requested" as const, lastUpdate: "Just now",
      timeline: [...d.timeline, makeTimeline(`Correction requested: ${note}`, "Current User")],
      comments: [...d.comments, makeComment("Current User", `Correction: ${note}`)],
    } : d));
    setPendingItems(prev => [...prev, {
      id: Date.now(), type: "correction", documentId: id, documentName: `Doc #${id}`, workerId: 0, workerName: "", clientId: 0, clientName: "", contractId: 0, contractName: "",
      description: note, priority: "medium", status: "open", assignedTo: "", slaDeadline: "", createdAt: new Date().toLocaleString(), comments: [], timeline: [],
    }]);
    addAuditLog({ timestamp: new Date().toLocaleString(), action: "Correction requested", actor: "Current User", actorType: "human", module: "Documents", entity: "document", entityId: id, document: `Doc #${id}`, result: note });
  }, [addAuditLog]);

  const reprocessDocument = useCallback((id: number) => {
    setDocuments(prev => prev.map(d => d.id === id ? {
      ...d, status: "reprocessing" as const, lastUpdate: "Just now", version: d.version + 1,
      timeline: [...d.timeline, makeTimeline("Document sent for reprocessing", "Current User")],
    } : d));
    setTimeout(() => {
      setDocuments(prev => prev.map(d => d.id === id && d.status === "reprocessing" ? { ...d, status: "validating" as const, lastUpdate: "Just now" } : d));
    }, 2000);
    addAuditLog({ timestamp: new Date().toLocaleString(), action: "Document reprocessed", actor: "Current User", actorType: "human", module: "Documents", entity: "document", entityId: id, document: `Doc #${id}`, result: "Reprocessing" });
  }, [addAuditLog]);

  const markException = useCallback((id: number, reason: string) => {
    setDocuments(prev => prev.map(d => d.id === id ? {
      ...d, status: "exception" as const, exceptionReason: reason, lastUpdate: "Just now",
      timeline: [...d.timeline, makeTimeline(`Marked as exception: ${reason}`, "Current User")],
    } : d));
    addAuditLog({ timestamp: new Date().toLocaleString(), action: "Document marked as exception", actor: "Current User", actorType: "human", module: "Documents", entity: "document", entityId: id, document: `Doc #${id}`, result: reason });
  }, [addAuditLog]);

  const addDocumentComment = useCallback((id: number, author: string, text: string) => {
    setDocuments(prev => prev.map(d => d.id === id ? {
      ...d, comments: [...d.comments, makeComment(author, text)],
      timeline: [...d.timeline, makeTimeline(`Comment: ${text.substring(0, 50)}`, author)],
    } : d));
  }, []);

  const assignDocument = useCallback((id: number, assignee: string) => {
    setDocuments(prev => prev.map(d => d.id === id ? {
      ...d, assignedTo: assignee, lastUpdate: "Just now",
      timeline: [...d.timeline, makeTimeline(`Assigned to ${assignee}`, "Current User")],
    } : d));
  }, []);

  const changeDocumentStatus = useCallback((id: number, status: Document["status"]) => {
    setDocuments(prev => prev.map(d => d.id === id ? {
      ...d, status, lastUpdate: "Just now",
      timeline: [...d.timeline, makeTimeline(`Status changed to ${status}`, "Current User")],
    } : d));
  }, []);

  const uploadDocument = useCallback((doc: Partial<Document>) => {
    const newDoc: Document = {
      id: nextDocId++,
      worker: doc.worker || "Unknown",
      workerId: doc.workerId || 0,
      contract: doc.contract || "Unknown",
      contractId: doc.contractId || 0,
      client: doc.client || "Unknown",
      clientId: doc.clientId || 0,
      docType: doc.docType || "Unknown",
      docTypeId: doc.docTypeId || 0,
      status: "received",
      validation: "pending",
      expiration: doc.expiration || "2025-12-31",
      submission: "Pending",
      priority: doc.priority || "medium",
      lastUpdate: "Just now",
      origin: "Upload",
      version: 1,
      validationScore: 0,
      comments: [],
      timeline: [makeTimeline("Document uploaded", "Current User")],
      assignedTo: undefined,
    };
    setDocuments(prev => [newDoc, ...prev]);
    addAuditLog({ timestamp: new Date().toLocaleString(), action: "Document uploaded", actor: "Current User", actorType: "human", module: "Documents", entity: "document", entityId: newDoc.id, document: `${newDoc.docType} - ${newDoc.worker}`, result: "Queued" });
    return newDoc;
  }, [addAuditLog]);

  // Exception actions
  const resolveException = useCallback((id: number) => {
    setExceptions(prev => prev.map(e => e.id === id ? { ...e, status: "resolved" as const, timeline: [...e.timeline, makeTimeline("Exception resolved", "Current User")] } : e));
    addAuditLog({ timestamp: new Date().toLocaleString(), action: "Exception resolved", actor: "Current User", actorType: "human", module: "Exceptions", entity: "exception", entityId: id, document: `Exception #${id}`, result: "Resolved" });
  }, [addAuditLog]);

  const escalateException = useCallback((id: number) => {
    setExceptions(prev => prev.map(e => e.id === id ? { ...e, status: "escalated" as const, timeline: [...e.timeline, makeTimeline("Exception escalated", "Current User")] } : e));
  }, []);

  const assignException = useCallback((id: number, assignee: string) => {
    setExceptions(prev => prev.map(e => e.id === id ? { ...e, assignedTo: assignee, status: "in_progress" as const } : e));
  }, []);

  // Pending actions
  const resolvePending = useCallback((id: number) => {
    setPendingItems(prev => prev.map(p => p.id === id ? { ...p, status: "resolved" as const, timeline: [...p.timeline, makeTimeline("Pending resolved", "Current User")] } : p));
  }, []);

  const changePendingPriority = useCallback((id: number, priority: PendingItem["priority"]) => {
    setPendingItems(prev => prev.map(p => p.id === id ? { ...p, priority } : p));
  }, []);

  const changePendingStatus = useCallback((id: number, status: PendingItem["status"]) => {
    setPendingItems(prev => prev.map(p => p.id === id ? { ...p, status } : p));
  }, []);

  const assignPending = useCallback((id: number, assignee: string) => {
    setPendingItems(prev => prev.map(p => p.id === id ? { ...p, assignedTo: assignee, status: "in_progress" as const } : p));
  }, []);

  const addPendingComment = useCallback((id: number, author: string, text: string) => {
    setPendingItems(prev => prev.map(p => p.id === id ? { ...p, comments: [...p.comments, makeComment(author, text)] } : p));
  }, []);

  // Admin actions
  const addUser = useCallback((user: AppUser) => setUsers(prev => [...prev, user]), []);
  const updateUser = useCallback((id: string, updates: Partial<AppUser>) => setUsers(prev => prev.map(u => u.id === id ? { ...u, ...updates } : u)), []);
  const toggleUserActive = useCallback((id: string) => setUsers(prev => prev.map(u => u.id === id ? { ...u, active: !u.active } : u)), []);

  const addDocType = useCallback((dt: DocTypeConfig) => setDocTypes(prev => [...prev, dt]), []);
  const updateDocType = useCallback((id: number, updates: Partial<DocTypeConfig>) => setDocTypes(prev => prev.map(d => d.id === id ? { ...d, ...updates } : d)), []);

  const addRule = useCallback((rule: ComplianceRule) => setRules(prev => [...prev, rule]), []);
  const updateRule = useCallback((id: number, updates: Partial<ComplianceRule>) => setRules(prev => prev.map(r => r.id === id ? { ...r, ...updates } : r)), []);
  const toggleRuleActive = useCallback((id: number) => setRules(prev => prev.map(r => r.id === id ? { ...r, active: !r.active } : r)), []);

  const addClient = useCallback((client: Client) => setClients(prev => [...prev, client]), []);
  const updateClient = useCallback((id: number, updates: Partial<Client>) => setClients(prev => prev.map(c => c.id === id ? { ...c, ...updates } : c)), []);
  const addContract = useCallback((contract: Contract) => setContracts(prev => [...prev, contract]), []);
  const updateContract = useCallback((id: number, updates: Partial<Contract>) => setContracts(prev => prev.map(c => c.id === id ? { ...c, ...updates } : c)), []);

  const counts = {
    totalDocs: documents.length,
    approvedDocs: documents.filter(d => d.status === "approved" || d.status === "ready" || d.status === "submitted").length,
    rejectedDocs: documents.filter(d => d.status === "rejected" || d.status === "validation_failed").length,
    pendingDocs: documents.filter(d => d.status === "waiting" || d.status === "received" || d.status === "validating").length,
    openExceptions: exceptions.filter(e => e.status === "open" || e.status === "in_progress").length,
    criticalExceptions: exceptions.filter(e => e.risk === "critical" && (e.status === "open" || e.status === "in_progress")).length,
    openPending: pendingItems.filter(p => p.status === "open" || p.status === "in_progress").length,
    blockedWorkers: workers.filter(w => w.status === "blocked").length,
  };

  return (
    <AppContext.Provider value={{
      documents, exceptions, pendingItems, clients, contracts, sites, workers, providers, docTypes, rules, auditLogs, integrations, automations, processes, users, counts,
      approveDocument, rejectDocument, requestCorrection, reprocessDocument, markException, addDocumentComment, assignDocument, changeDocumentStatus, uploadDocument,
      resolveException, escalateException, assignException,
      resolvePending, changePendingPriority, changePendingStatus, assignPending, addPendingComment,
      addUser, updateUser, toggleUserActive, addDocType, updateDocType, addRule, updateRule, toggleRuleActive,
      addClient, updateClient, addContract, updateContract, addAuditLog,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
