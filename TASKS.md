# Compliance Control Center — Task Board MVP (Revisado)

> **Prazo Final:** 22/03/2026  
> **Feature Freeze:** 19/03/2026  
> **Último dia útil:** 20/03/2026 (Sex)  
> **Período de trabalho:** Seg–Sex | 10/03 – 20/03/2026  
> **Equipe:** Igor · Léo · Atos · Raul

---

## Arquitetura

| Camada | Tecnologia |
|--------|------------|
| Frontend | React |
| CMS / Auth | Strapi |
| Business Logic API | FastAPI |
| Automation | n8n |
| Infra | VPS + Docker + PostgreSQL |

---

## Fluxo Principal do MVP

```
1. Login
2. Cadastro de cliente / contrato / trabalhador
3. Upload de documento
4. Documento entra na fila
5. FastAPI valida documento
6. Regra de compliance aplicada
7. Documento aprovado ou pendência criada
8. Dashboard atualizado
9. Relatório gerado
```

> Este fluxo orienta todas as tasks. Deve funcionar end-to-end até 20/03.

---

## Legenda

| Símbolo | Significado |
|---------|-------------|
| 🔴 | Prioridade Alta |
| 🟡 | Prioridade Média |
| 🟢 | Prioridade Baixa |
| ⬜ | Não iniciada |
| 🟦 | Em andamento |
| ✅ | Concluída |

---

## Igor — Backend · Strapi · n8n · DevOps
> **Papel:** Líder Técnico back-end — infraestrutura, CMS e automações.

### 📅 Semana 1 (10/03 – 13/03)

| # | Status | Prio | Task | Detalhes | Prazo |
|---|--------|------|------|----------|-------|
| I-01 | ⬜ | 🔴 | Provisionar infraestrutura base | VPS · Docker · Firewall · Domínio · SSL · docker-compose (Strapi, FastAPI, PostgreSQL, Redis, n8n) | 10/03 (Ter) |
| I-02 | ⬜ | 🔴 | Inicializar backend CMS | Iniciar Strapi · conectar PostgreSQL · configurar admin, CORS e JWT | 10/03 (Ter) |
| I-03 | ⬜ | 🔴 | Modelagem de entidades administrativas | Content Types: `Client`, `Contract`, `Worker`, `Provider`, `Subcontractor` · Relações: Client→Contracts, Contract→Workers | 11/03 (Qua) |
| I-04 | ⬜ | 🔴 | Modelagem documental | Content Types: `Document`, `DocumentType`, `ComplianceRule`, `Exception`, `Validation`, `AuditLog` | 11/03 (Qua) |
| I-05 | ⬜ | 🔴 | Sistema de autenticação | Login · Signup · Refresh token · Roles: `Admin`, `Operator`, `PortalUser` | 12/03 (Qui) |
| I-06 | ⬜ | 🟡 | Configurar locales | i18n: `pt-BR`, `en-US`, `es-ES` | 12/03 (Qui) |
| I-07 | ⬜ | 🟡 | Configurar permissões RBAC | Admin · Operator · PortalUser | 13/03 (Sex) |
| I-08 | ⬜ | 🟡 | Upload de documentos | Media Library · limites de upload · tipos aceitos: PDF, JPG, PNG | 13/03 (Sex) |

### 📅 Semana 2 (16/03 – 20/03)

| # | Status | Prio | Task | Detalhes | Prazo |
|---|--------|------|------|----------|-------|
| I-09 | ⬜ | 🔴 | Automação de validação | n8n workflow · Trigger: FastAPI webhook · Fluxo: `document_received` → `validation_started` | 16/03 (Seg) |
| I-10 | ⬜ | 🔴 | Automação de vencimentos | n8n `daily_job` · verificar documentos vencidos · enviar notificações | 17/03 (Ter) |
| I-11 | ⬜ | 🟡 | Automação de relatórios | n8n `weekly_report` · enviar relatório por e-mail | 18/03 (Qua) |
| I-12 | ⬜ | 🟡 | Deploy produção (Strapi) | Configurar env · domínio · reverse proxy | 19/03 (Qui) |
| I-13 | ⬜ | 🟡 | Deploy n8n | Configurar webhooks · testar automações em produção | 19/03 (Qui) |
| I-14 | ⬜ | 🟢 | Documentação API | Postman collection · endpoints · exemplos de request/response | 20/03 (Sex) |
| I-15 | ⬜ | 🟢 | Observabilidade | Logs · health checks · monitoramento básico | 20/03 (Sex) |

---

## Atos — Python · FastAPI
> **Papel:** Cérebro da equipe — lógica de negócio, engine de compliance e APIs.

### 📅 Semana 1 (10/03 – 13/03)

| # | Status | Prio | Task | Detalhes | Prazo |
|---|--------|------|------|----------|-------|
| A-01 | ⬜ | 🔴 | Estrutura base da API | Criar: `app/`, `routers/`, `services/`, `schemas/`, `models/`, `core/`, `workers/` | 10/03 (Ter) |
| A-02 | ⬜ | 🔴 | Conexão com banco | SQLAlchemy · asyncpg · Alembic migrations | 10/03 (Ter) |
| A-03 | ⬜ | 🔴 | Middleware de autenticação | Validar JWT emitido pelo Strapi | 11/03 (Qua) |
| A-04 | ⬜ | 🔴 | CRUD Workers | `GET /workers` · `POST /workers` · `PATCH /workers/{id}` | 11/03 (Qua) |
| A-05 | ⬜ | 🔴 | CRUD Compliance Rules | `create_rule` · `update_rule` · `evaluate_rule` | 12/03 (Qui) |
| A-06 | ⬜ | 🟡 | Sistema de exceções | `create_exception` · `approve_exception` · `reject_exception` | 12/03 (Qui) |
| A-07 | ⬜ | 🟡 | Validações | `submit_validation` · `get_validation_status` | 13/03 (Sex) |
| A-08 | ⬜ | 🟡 | Fila documental | Status: `document_received` → `processing` → `validated` / `rejected` | 13/03 (Sex) |

### 📅 Semana 2 (16/03 – 20/03)

| # | Status | Prio | Task | Detalhes | Prazo |
|---|--------|------|------|----------|-------|
| A-09 | ⬜ | 🔴 | Engine de compliance | Avaliar regras · gerar inconsistências · vincular a Workers/Contractors | 16/03 (Seg) |
| A-10 | ⬜ | 🔴 | Relatórios | `report_by_client` · `report_by_contract` · `report_by_period` | 17/03 (Ter) |
| A-11 | ⬜ | 🟡 | Integração com n8n | Disparar eventos: `document_received`, `document_validated` via webhook | 17/03 (Ter) |
| A-12 | ⬜ | 🟡 | Audit Logs | Registrar: `user` · `action` · `timestamp` | 18/03 (Qua) |
| A-13 | ⬜ | 🟡 | Processes e Sites | Endpoints: `/processes`, `/sites` | 18/03 (Qua) |
| A-14 | ⬜ | 🟡 | Filtros e paginação | `limit` · `offset` · `search` nos endpoints principais | 19/03 (Qui) |
| A-15 | ⬜ | 🟢 | Testes unitários | pytest nos serviços e na engine de compliance | 19/03 (Qui) |
| A-16 | ⬜ | 🟢 | Dockerização | Dockerfile · integração no docker-compose (coordenar com Igor) | 20/03 (Sex) |
| A-17 | ⬜ | 🟢 | Documentação | OpenAPI (Swagger) · Postman Collection | 20/03 (Sex) |

---

## Léo — Frontend
> **Papel:** Integração da UI com APIs, mocks, ajustes finos de UI/UX e suporte à equipe.

### 📅 Semana 1 (10/03 – 13/03)

| # | Status | Prio | Task | Detalhes | Prazo |
|---|--------|------|------|----------|-------|
| L-01 | ⬜ | 🔴 | Ajustar mocks | `mockData.ts` alinhado à estrutura real dos Content Types do Strapi | 10/03 (Ter) |
| L-02 | ⬜ | 🔴 | Cliente HTTP | axios · interceptors · injeção de JWT · refresh token · tratamento de erros | 10/03 (Ter) |
| L-03 | ⬜ | 🔴 | Login | Integrar `Login.tsx` com API Strapi (JWT + armazenamento seguro) | 11/03 (Qua) |
| L-04 | ⬜ | 🔴 | Rotas protegidas | `ProtectedRoute.tsx` validando roles do JWT | 11/03 (Qua) |
| L-05 | ⬜ | 🟡 | Clients | CRUD conectado: `Clients.tsx` + `ClientDetail.tsx` | 12/03 (Qui) |
| L-06 | ⬜ | 🟡 | Contracts | CRUD conectado: `Contracts.tsx` + `ContractDetail.tsx` | 12/03 (Qui) |
| L-07 | ⬜ | 🟡 | Workers | CRUD conectado: `Workers.tsx` + `WorkerDetail.tsx` | 13/03 (Sex) |
| L-08 | ⬜ | 🟡 | Providers & Subcontractors | CRUD conectado: `Providers.tsx` + `Subcontractors.tsx` | 13/03 (Sex) |

### 📅 Semana 2 (16/03 – 20/03)

| # | Status | Prio | Task | Detalhes | Prazo |
|---|--------|------|------|----------|-------|
| L-09 | ⬜ | 🔴 | Upload documentos | `DocumentQueue.tsx` + `Upload.tsx` → Strapi Media Library | 16/03 (Seg) |
| L-10 | ⬜ | 🔴 | Compliance UI | `ComplianceRules.tsx` · `Exceptions.tsx` · `Validations.tsx` conectados ao backend | 17/03 (Ter) |
| L-11 | ⬜ | 🟡 | Dashboards | `Dashboard.tsx` + `OperationalDashboard.tsx` com dados reais | 17/03 (Ter) |
| L-12 | ⬜ | 🟡 | Reports UI | `Reports.tsx` · geração e download de relatórios | 18/03 (Qua) |
| L-13 | ⬜ | 🟡 | Portal externo | `PortalDashboard.tsx` + `PortalUpload.tsx` com autenticação `PortalUser` | 18/03 (Qua) |
| L-14 | ⬜ | 🟡 | UX ajustes | Loading skeletons · mensagens de erro · feedback ao usuário · responsividade | 19/03 (Qui) |
| L-15 | ⬜ | 🟡 | i18n | Conectar `translations.ts` ao Strapi para traduções dinâmicas (pt-BR / en-US / es-ES) | 19/03 (Qui) |
| L-16 | ⬜ | 🟢 | Testes | vitest nos fluxos e páginas principais | 20/03 (Sex) |
| L-17 | ⬜ | 🟢 | QA visual | Cross-browser · acessibilidade (a11y) · polimento de UI | 20/03 (Sex) |

---

## Raul — Tech Lead & Arquitetura
> **Papel:** Primeiro líder técnico — define arquitetura, valida entregas e garante qualidade do MVP.

### 📅 Semana 1 (10/03 – 13/03)

| # | Status | Prio | Task | Prazo |
|---|--------|------|------|-------|
| R-01 | ⬜ | 🔴 | Definir arquitetura do sistema: Strapi ↔ FastAPI ↔ Front-end ↔ n8n | 10/03 (Ter) |
| R-02 | ⬜ | 🔴 | Definir contratos de API: schemas/types compartilhados | 11/03 (Qua) |
| R-03 | ⬜ | 🟡 | Revisão do scaffold backend (I-01→I-04, A-01→A-04) | 12/03 (Qui) |
| R-04 | ⬜ | 🟡 | Alinhar mapeamento de roles entre Strapi e front-end | 13/03 (Sex) |

### 📅 Semana 2 (16/03 – 20/03)

| # | Status | Prio | Task | Prazo |
|---|--------|------|------|-------|
| R-05 | ⬜ | 🔴 | Code review das integrações críticas: JWT, compliance engine, upload | 17/03 (Ter) |
| R-06 | ⬜ | 🟡 | Validar deploy completo em produção (todos os serviços) | 19/03 (Qui) |
| R-07 | ⬜ | 🟡 | Teste E2E: login → upload → validação → relatório | 20/03 (Sex) |
| R-08 | ⬜ | 🟢 | Preparar roteiro de demonstração do MVP (22/03) | 20/03 (Sex) |

---

## Marcos & Datas Críticas

| Data | Dia | Marco |
|------|-----|-------|
| 10/03 | Ter | VPS provisionada · Strapi rodando · FastAPI scaffolded |
| 11/03 | Qua | Content Types criados · CRUD base Workers/Clients na FastAPI |
| 12/03 | Qui | ✅ Autenticação JWT end-to-end (Strapi → FastAPI → Front) |
| 13/03 | Sex | Roles configurados · mocks do front alinhados com API real |
| 16/03 | Seg | Workflows n8n iniciados · engine de compliance em desenvolvimento |
| 17/03 | Ter | Integrações front-end com backend nas entidades principais concluídas |
| 18/03 | Qua | Reports · Portal externo · AuditLogs implementados |
| 19/03 | Qui | ⛔ **Feature Freeze** — sem novas funcionalidades |
| 20/03 | Sex | Deploy validado · smoke tests · revisão final |
| 22/03 | Dom | 🏁 **Entrega do MVP** |

---

## Totais por Membro

| Membro | Papel | Total | Alta 🔴 | Média 🟡 | Baixa 🟢 |
|--------|-------|-------|---------|---------|---------|
| Igor | Backend / DevOps | 15 | 5 | 7 | 3 |
| Atos | FastAPI / Lógica | 17 | 5 | 8 | 4 |
| Léo | Frontend | 17 | 4 | 9 | 4 |
| Raul | Tech Lead | 8 | 3 | 4 | 1 |
| **Total** | | **57** | **17** | **28** | **12** |

---

## Igor — Backend · Strapi · N8n · DevOps
> **Papel:** Líder Técnico (back-end), responsável pelo Strapi (autenticação, content types, locales), automações N8n e configuração da VPS.

### 📅 Semana 1 (10/03 – 13/03)

| # | Status | Prioridade | Task | Prazo |
|---|--------|------------|------|-------|
| I-01 | ⬜ | 🔴 | Provisionar VPS: configurar servidor, DNS, SSL e domínio | 10/03 (Ter) |
| I-02 | ⬜ | 🔴 | Instalar e inicializar o projeto Strapi com banco de dados (PostgreSQL) | 10/03 (Ter) |
| I-03 | ⬜ | 🔴 | Criar Content Types: `Client`, `Contract`, `Worker`, `Subcontractor`, `Provider` | 11/03 (Qua) |
| I-04 | ⬜ | 🔴 | Criar Content Types: `Document`, `ComplianceRule`, `Exception`, `Validation`, `AuditLog` | 11/03 (Qua) |
| I-05 | ⬜ | 🔴 | Configurar autenticação no Strapi: JWT, login, signup e refresh token | 12/03 (Qui) |
| I-06 | ⬜ | 🟡 | Configurar locales no Strapi: `pt-BR`, `en-US`, `es-ES` | 12/03 (Qui) |
| I-07 | ⬜ | 🟡 | Configurar roles e permissões no Strapi: `Admin`, `Operator`, `Portal User` | 13/03 (Sex) |
| I-08 | ⬜ | 🟡 | Configurar Strapi Media Library para upload de documentos (PDF, imagens) | 13/03 (Sex) |

### 📅 Semana 2 (16/03 – 20/03)

| # | Status | Prioridade | Task | Prazo |
|-------|--------|------------|------|-------|
| I-09 | ⬜ | 🔴 | Criar workflow N8n: notificação automática de documentos próximos ao vencimento | 16/03 (Seg) |
| I-10 | ⬜ | 🔴 | Criar workflow N8n: automação do fluxo de validação de documentos (trigger via webhook) | 17/03 (Ter) |
| I-11 | ⬜ | 🟡 | Criar workflow N8n: envio de relatórios periódicos por e-mail | 18/03 (Qua) |
| I-12 | ⬜ | 🟡 | Deploy final do Strapi em produção com variáveis de ambiente (.env) | 19/03 (Qui) |
| I-13 | ⬜ | 🟡 | Deploy do N8n em produção e configuração dos webhooks de integração | 19/03 (Qui) |
| I-14 | ⬜ | 🟢 | Documentar endpoints da API do Strapi (Postman Collection ou Swagger) | 20/03 (Sex) |
| I-15 | ⬜ | 🟢 | Smoke tests na VPS em produção: health checks, logs e monitoramento básico | 20/03 (Sex) |

---

## Léo — Frontend
> **Papel:** Responsável pelo front-end React/TypeScript, mocks, integração com APIs, ajustes finos de UI/UX e suporte geral à equipe.

### 📅 Semana 1 (10/03 – 13/03)

| # | Status | Prioridade | Task | Prazo |
|---|--------|------------|------|-------|
| L-01 | ⬜ | 🔴 | Revisar e atualizar `mockData.ts` para espelhar a estrutura real dos Content Types do Strapi | 10/03 (Ter) |
| L-02 | ⬜ | 🔴 | Configurar cliente HTTP (axios) com interceptors: injeção de token JWT e tratamento de erros | 10/03 (Ter) |
| L-03 | ⬜ | 🔴 | Integrar página de Login (`Login.tsx`) com API do Strapi (JWT + armazenamento seguro do token) | 11/03 (Qua) |
| L-04 | ⬜ | 🔴 | Atualizar `ProtectedRoute.tsx` para validar roles vindos do token JWT | 11/03 (Qua) |
| L-05 | ⬜ | 🟡 | Conectar página `Clients.tsx` e `ClientDetail.tsx` ao endpoint Strapi (CRUD) | 12/03 (Qui) |
| L-06 | ⬜ | 🟡 | Conectar página `Contracts.tsx` e `ContractDetail.tsx` ao endpoint Strapi | 12/03 (Qui) |
| L-07 | ⬜ | 🟡 | Conectar página `Workers.tsx` e `WorkerDetail.tsx` ao endpoint Strapi | 13/03 (Sex) |
| L-08 | ⬜ | 🟡 | Conectar páginas `Subcontractors.tsx` e `Providers.tsx` ao endpoint Strapi | 13/03 (Sex) |

### 📅 Semana 2 (16/03 – 20/03)

| # | Status | Prioridade | Task | Prazo |
|---|--------|------------|------|-------|
| L-09 | ⬜ | 🔴 | Implementar upload de documentos (`DocumentQueue.tsx` + `Upload.tsx`) integrado ao Strapi Media Library | 16/03 (Seg) |
| L-10 | ⬜ | 🔴 | Conectar `ComplianceRules.tsx`, `Exceptions.tsx` e `Validations.tsx` ao backend (FastAPI + Strapi) | 17/03 (Ter) |
| L-11 | ⬜ | 🟡 | Conectar `Dashboard.tsx` e `OperationalDashboard.tsx` a dados reais da API | 17/03 (Ter) |
| L-12 | ⬜ | 🟡 | Conectar módulo de `Reports.tsx` (geração e download de relatórios) | 18/03 (Qua) |
| L-13 | ⬜ | 🟡 | Implementar Portal externo (`PortalDashboard.tsx` + `PortalUpload.tsx`) com autenticação de Portal User | 18/03 (Qua) |
| L-14 | ⬜ | 🟡 | Ajustes finos de UI/UX: responsividade, estados de loading (skeleton), mensagens de erro e feedback ao usuário | 19/03 (Qui) |
| L-15 | ⬜ | 🟡 | Implementar i18n: conectar `translations.ts` ao Strapi para carregar traduções dinâmicas (pt-BR / en-US / es-ES) | 19/03 (Qui) |
| L-16 | ⬜ | 🟢 | Testes de integração (vitest) nas páginas e fluxos principais | 20/03 (Sex) |
| L-17 | ⬜ | 🟢 | Revisão visual final: cross-browser, acessibilidade (a11y) e polimento de UI | 20/03 (Sex) |

---

## Atos — Python · FastAPI
> **Papel:** Cérebro da equipe em lógica de negócio, responsável por toda a API Python com FastAPI — endpoints, validações, regras de compliance, relatórios e integração com N8n e Strapi.

### 📅 Semana 1 (10/03 – 13/03)

| # | Status | Prioridade | Task | Prazo |
|---|--------|------------|------|-------|
| A-01 | ⬜ | 🔴 | Criar estrutura base do projeto FastAPI: `routers/`, `schemas/`, `models/`, `services/`, `core/` | 10/03 (Ter) |
| A-02 | ⬜ | 🔴 | Configurar conexão com banco de dados (SQLAlchemy/asyncpg) e migrations (Alembic) | 10/03 (Ter) |
| A-03 | ⬜ | 🔴 | Implementar autenticação/autorização: validação de JWT emitido pelo Strapi via middleware | 11/03 (Qua) |
| A-04 | ⬜ | 🔴 | Criar endpoints CRUD: `Workers` (criação, listagem, detalhe, atualização de status) | 11/03 (Qua) |
| A-05 | ⬜ | 🔴 | Criar endpoints de `ComplianceRules` (definição e avaliação de regras de negócio) | 12/03 (Qui) |
| A-06 | ⬜ | 🟡 | Criar endpoints de `Exceptions` (abertura, aprovação e rejeição de exceções) | 12/03 (Qui) |
| A-07 | ⬜ | 🟡 | Criar endpoints de `Validations` (submissão e rastreamento de status de validação) | 13/03 (Sex) |
| A-08 | ⬜ | 🟡 | Criar endpoints de `Documents` (metadados, status de processamento, fila) | 13/03 (Sex) |

### 📅 Semana 2 (16/03 – 20/03)

| # | Status | Prioridade | Task | Prazo |
|---|--------|------------|------|-------|
| A-09 | ⬜ | 🔴 | Implementar engine de validação de compliance: aplicar `ComplianceRules` sobre dados de Workers/Contractors | 16/03 (Seg) |
| A-10 | ⬜ | 🔴 | Criar endpoints de `Reports` (geração de relatório consolidado por cliente/contrato/período) | 17/03 (Ter) |
| A-11 | ⬜ | 🟡 | Integrar FastAPI com N8n via webhooks (disparar automações a partir de eventos da API) | 17/03 (Ter) |
| A-12 | ⬜ | 🟡 | Criar endpoints de `AuditLogs` (registro de ações críticas: quem fez, o quê e quando) | 18/03 (Qua) |
| A-13 | ⬜ | 🟡 | Criar endpoints de `Processes` e `Sites` | 18/03 (Qua) |
| A-14 | ⬜ | 🟡 | Implementar paginação, filtros e busca full-text nos endpoints principais | 19/03 (Qui) |
| A-15 | ⬜ | 🟢 | Escrever testes unitários (pytest) nos serviços e na engine de compliance | 19/03 (Qui) |
| A-16 | ⬜ | 🟢 | Dockerizar a API FastAPI e fazer deploy em produção na VPS (coordenar com Igor) | 20/03 (Sex) |
| A-17 | ⬜ | 🟢 | Revisar e exportar documentação OpenAPI (Swagger) + Postman Collection | 20/03 (Sex) |

---

## Raul — Tech Lead & Arquitetura
> **Papel:** Primeiro líder técnico — define a arquitetura, garante alinhamento entre as entregas das squads, realiza code reviews críticos e valida o MVP antes da entrega.

### 📅 Semana 1 (10/03 – 13/03)

| # | Status | Prioridade | Task | Prazo |
|---|--------|------------|------|-------|
| R-01 | ⬜ | 🔴 | Definir e documentar arquitetura geral do MVP: Strapi ↔ FastAPI ↔ Front-end ↔ N8n | 10/03 (Ter) |
| R-02 | ⬜ | 🔴 | Definir contratos de API: schemas/types compartilhados entre Strapi e FastAPI | 11/03 (Qua) |
| R-03 | ⬜ | 🟡 | Revisar scaffold do Strapi (I-01 a I-04) e do FastAPI (A-01 a A-04) | 12/03 (Qui) |
| R-04 | ⬜ | 🟡 | Alinhar mapeamento de roles/permissões entre back-end (Strapi) e front-end (Léo) | 13/03 (Sex) |

### 📅 Semana 2 (16/03 – 20/03)

| # | Status | Prioridade | Task | Prazo |
|---|--------|------------|------|-------|
| R-05 | ⬜ | 🔴 | Code review das integrações críticas: autenticação JWT, compliance engine e upload de documentos | 17/03 (Ter) |
| R-06 | ⬜ | 🟡 | Validar deploy completo em produção: Strapi + FastAPI + Front-end + N8n funcionando de ponta a ponta | 19/03 (Qui) |
| R-07 | ⬜ | 🟡 | Revisão final do MVP: testes E2E dos fluxos principais (login → upload → validação → relatório) | 20/03 (Sex) |
| R-08 | ⬜ | 🟢 | Preparar roteiro de demonstração e apresentação do MVP para a entrega (22/03) | 20/03 (Sex) |

---

## Marcos & Datas Críticas

| Data | Dia | Marco |
|------|-----|-------|
| 10/03 | Ter | Infraestrutura base iniciada: VPS provisionada, Strapi rodando, FastAPI scaffolded |
| 11/03 | Qua | Content Types criados no Strapi; CRUD base de Workers/Clients na FastAPI |
| 12/03 | Qui | ✅ Autenticação JWT funcionando end-to-end (Strapi → FastAPI → Front) |
| 13/03 | Sex | Roles configurados; mocks do front alinhados com estrutura real da API |
| 16/03 | Seg | Workflows N8n iniciados; engine de compliance em desenvolvimento |
| 17/03 | Ter | Integrações front-end com backend nas entidades principais concluídas |
| 18/03 | Qua | Reports, Portal externo e AuditLogs implementados |
| 19/03 | Qui | ⛔ **Feature Freeze** — sem novas funcionalidades a partir daqui |
| 20/03 | Sex | Deploy em produção validado + smoke tests + revisão final |
| 22/03 | Dom | 🏁 **Entrega do MVP** |

---

## Totais por Membro

| Membro | Papel | Total de Tasks | Alta 🔴 | Média 🟡 | Baixa 🟢 |
|--------|-------|---------------|---------|---------|---------|
| Igor | Backend / DevOps | 15 | 5 | 7 | 3 |
| Léo | Frontend | 17 | 4 | 9 | 4 |
| Atos | FastAPI / Lógica | 17 | 5 | 8 | 4 |
| Raul | Tech Lead | 8 | 3 | 4 | 1 |
| **Total** | | **57** | **17** | **28** | **12** |
