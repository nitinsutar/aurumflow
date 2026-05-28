# AurumFlow SaaS

A full-stack inventory and production management platform for jewellery manufacturers. It includes multi-tenant company structure, role-aware dashboards, raw material stock, ledger movements, metal purity calculations, product designs, orders, job cards, finished goods, pricing, reports, alerts, SaaS admin placeholders, and an AI assistant placeholder.

## Stack

- Next.js App Router + TypeScript
- Tailwind CSS
- PostgreSQL + Prisma ORM
- Cookie-based demo authentication with role-aware navigation
- Server actions and API routes for inventory, ledger, pricing, and auth flows

## Local Setup

1. Install dependencies:

```bash
npm install
```

2. Copy environment variables:

```bash
cp .env.example .env
```

3. Set `DATABASE_URL` to a PostgreSQL database.

4. Create tables and seed demo data:

```bash
npm run prisma:migrate -- --name init
npm run prisma:seed
```

5. Start development:

```bash
npm run dev
```

Open `http://localhost:3000`.

## Deployment

Vercel should build from the latest `main` commit. The build runs Prisma client generation before Next.js compilation.

## Demo Users

All demo passwords are `password123`.

- `owner@aurum.test` - Company Owner/Admin
- `inventory@aurum.test` - Inventory Manager
- `production@aurum.test` - Production Manager
- `karigar1@aurum.test` - Karigar/Worker
- `sales@aurum.test` - Sales/Order Manager
- `accountant@aurum.test` - Accountant
- `auditor@aurum.test` - Auditor/Read-only User
- `super@jewelsuite.test` - Super Admin

## Core Business Rules

- Fine metal equivalent is calculated from karat or custom purity.
- Material issue reduces available stock and creates a ledger entry.
- Material return increases stock and creates return, scrap, wastage, or loss ledger entries.
- Negative stock is blocked unless `ADMIN_OVERRIDE_NEGATIVE_STOCK=true`.
- Stock adjustments are recorded in `ActivityLog`.
- Order progress can be inferred from linked job card statuses.

## MVP Phases Implemented

- Phase 1: auth, company setup, role dashboard, inventory, ledger, metal rates
- Phase 2: design master, orders, job cards, material issue/return
- Phase 3: finished goods, pricing calculator, barcode labels, reports
- Phase 4: smart alerts, SaaS admin placeholders, subscription placeholders, AI assistant placeholder
