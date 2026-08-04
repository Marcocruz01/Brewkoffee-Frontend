# BrewKoffee 

A full-stack Point of Sale (POS) system built for coffee shop operations — from taking orders to managing the kitchen queue, tracking tables, and processing payments.

## Overview

BrewKoffee is a role-based operational system with three dedicated interfaces:

- **Admin** — manage the product catalog, categories, employees, tables, and view business analytics through a live dashboard.
- **Waiter** — take orders (dine-in or takeout), track order status in real time, manage table assignments, and process payments.
- **Kitchen** — receive incoming orders, accept and prepare them, and mark them ready for service.

## Tech Stack

**Frontend**
- Next.js (App Router) + TypeScript
- Tailwind CSS + shadcn/ui (Base UI)
- Zod for validation
- Recharts for dashboard analytics

**Backend**
- Node.js + Express
- Prisma ORM + PostgreSQL
- JWT authentication with role-based access control
- Zod validators on every endpoint

## Core Features

- **Authentication & Roles** — JWT-based auth with `ADMIN`, `WAITER`, and `KITCHEN` roles, each with scoped route access.
- **Product Catalog** — categories, products, and variants with Cloudinary image uploads.
- **Order Management** — full lifecycle from `PENDING` → `IN_PROGRESS` → `READY` → `DELIVERED`, supporting both dine-in and takeout orders, with multiple order rounds per table.
- **Table Management** — real-time table status (`AVAILABLE`, `OCCUPIED`, `RESERVED`) tied directly to active orders.
- **Payments** — cash and card checkout flow, decoupled from order status (`paid` as an independent field), supporting split payments per table.
- **Kitchen Board** — Kanban-style interface for accepting and preparing incoming orders.
- **Admin Dashboard** — daily/weekly sales, top-selling products, payment method breakdown, and recent order activity.
- **Order History** — full audit trail of all orders with filtering and management controls.

## Getting Started

```bash
# Backend
cd server
npm install
npx prisma migrate dev
npm run dev

# Frontend
cd client
npm install
npm run dev
```

Set up your `.env` files with `DATABASE_URL`, `JWT_SECRET`, `API_BACKEND_URL`, and Cloudinary credentials before running.

## License

This project is for portfolio/educational purposes.
