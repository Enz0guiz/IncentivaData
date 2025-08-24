# Incentiva Data

**Plataforma de intermediação de doações — MVP**

Resumo rápido
- Incentiva Data é uma plataforma multi-sided SaaS que conecta empresas com Organizações da Sociedade Civil (OSC) para doações direcionadas, mensurabilidade de impacto e comunicação de ESG. A plataforma oferece painel de doação, comprovantes, relatórios de match entre valores da empresa e OSCs e split de pagamento.

---

## Objetivos do repositório
- Código do frontend (MVP)
- Código do backend (APIs)
- Scripts de integração com gateway de pagamentos (split)
- Esquema de banco de dados e seed data
- Documentação técnica e manual de deploy

---

## Visão do MVP (sumário)
- Cadastro empresa / OSC
- Painel de doação (único botão "doar")
- Split de pagamento (ex.: Mercado Pago / Stripe — integração inicial de leitura apenas)
- Emissão de comprovante de doação (PDF)
- Relatório básico de "match" e dashboard de valores recebidos
- Perfil e gerenciamento de OSCs (dados bancários e ODSs)
(Baseado na proposta e wireframes enviados). :contentReference[oaicite:2]{index=2}

---

## Tech stack recomendado (versão MVP)
- Frontend: React (Vite) com TailwindCSS — entrega rápida e responsiva
- Backend: Node.js + Express (ou NestJS se quisermos mais estrutura)
- Banco de dados: PostgreSQL (RDS/Cloud SQL) — relação transacional e ACID
- Pagamentos: Mercado Pago / Stripe (iniciar com sandbox)
- Armazenamento de arquivos: S3 (AWS) ou equivalent (GCS)
- Relatórios / BI: Looker Studio (dashboards embutidos) — conforme protótipo. :contentReference[oaicite:3]{index=3}
- Autenticação: JWT + refresh tokens (Auth0 opcional)
- Infra/CI: Docker + GitHub Actions; deploy em Vercel (frontend) + Heroku / Railway / AWS Elastic Beanstalk (backend)

---

## Arquitetura (alto-nível)
1. Frontend (SPA) → 2. API Gateway (Express) → 3. Serviço de pagamentos (Mercado Pago) → 4. Banco de dados Postgres → 5. Armazenamento de comprovantes (S3) → 6. Looker Studio / BI para relatórios.

---

## Setup local (quickstart)
1. `git clone <repo>`
2. `cp .env.example .env` — preencher variáveis:
   - `DATABASE_URL`
   - `JWT_SECRET`
   - `MP_CLIENT_ID`, `MP_CLIENT_SECRET` (Mercado Pago sandbox)
   - `S3_BUCKET`, `S3_KEY`, `S3_SECRET`
3. Backend:
   - `cd backend`
   - `npm ci`
   - `npm run migrate` (Rodar migration)
   - `npm run seed` (Seed de teste)
   - `npm run dev`
4. Frontend:
   - `cd frontend`
   - `npm ci`
   - `npm run dev`
5. Teste fluxo: criação OSC → criação empresa → processo de doação (sandbox)

---

## Banco de dados — esquema resumido
- `users` (id, name, email, role[company/osc/admin], created_at)
- `oscs` (id, name, cnpj, description, ods_tags[], bank_account_id, trust_score)
- `companies` (id, name, cnpj, branding_tags[])
- `donations` (id, company_id, osc_id, amount_cents, status, payment_provider_id, created_at)
- `bank_accounts` (id, osc_id, bank_name, agency, account, type)
- `certificates` (id, donation_id, pdf_url, issued_at)

---

## Endpoints principais (exemplos)
- `POST /auth/login`
- `POST /osc` — cadastrar OSC
- `GET /osc/{id}` — perfil OSC
- `POST /donations` — iniciar doação (retorna checkout url / payment intent)
- `POST /payments/webhook` — webhook para confirmação + geração de comprovante
- `GET /dashboard/company/{id}` — relatórios de match e valores

---

## Processo de contribuição
- Branching: `main` (prod), `dev` (integração), feature branches `feature/<nome>`
- Pull Request: revisão obrigatória por 1 dev e 1 stakeholder (produto)
- CI: lint, testes unitários e integração leve

---

## Segurança e conformidade (Mínimos para o edital)
- Criptografia: TLS 1.2+ em trânsito
- Dados sensíveis: tokens e credenciais no vault / GitHub Secrets
- LGPD: consentimento no cadastro, política de privacidade, logs de acesso
- PCI-DSS: usar gateway de pagamento (tokenização) — não armazenar dados de cartão

---

## Métricas (KPI iniciais)
- Nº de doações processadas (D0)
- Valor total arrecadado (R$)
- Tempo de checkout médio
- Taxa de conversão do perfil OSC → doação
- NPS / Net Promoter das OSCs (qualitativo inicial)

---

## Contato do projeto
- Time core: Giovanni (Economia), Enzo (Matemática), Giovanna (Economia), Maria Eduarda (Administração), Taísa (Finanças)


