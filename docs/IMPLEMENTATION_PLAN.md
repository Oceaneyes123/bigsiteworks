# Implementation Plan

## Milestone 0 — Scaffold, tooling, docs, docker
- Initialize Next.js + TypeScript + Tailwind project files.
- Add docker-compose for Postgres + MinIO + Stripe CLI listener.
- Add baseline README, .env.example, and Makefile commands.

## Milestone 1 — Prisma data layer
- Define Prisma schema for users, templates, purchases/orders, order items, licenses, downloads.
- Add seed script with 5 templates and demo URLs.

## Milestone 2 — Marketplace UI
- Home page with featured templates and category chips.
- Template list page with search, category filter, sorting.
- Template detail page with score metadata, tags, demo link, add to cart.

## Milestone 3 — Auth and dashboard
- Session bootstrap route for local auth.
- Dashboard for paid purchases with license display and download links.

## Milestone 4 — Cart and Stripe
- Client-side cart state.
- Checkout API route with server-side validation and Stripe Checkout creation.
- Stripe webhook fulfillment route with idempotent paid-state update and license record creation.

## Milestone 5 — Secure download delivery
- Authorized download endpoint checks paid ownership.
- Signed S3 URL generation and download audit logging.

## Milestone 6 — Admin portal
- Admin-only template list and upload form.
- Admin upload API with validation + zip upload to MinIO and metadata persistence.

## Milestone 7 — Tests and verification docs
- Add unit tests for checkout validation + webhook fulfillment handler behavior.
- Add Playwright e2e specs for customer checkout path and admin upload path.
- Fill verification checklist.

## Milestone 8 — Hardening
- Add input validation (zod), authorization checks, idempotent fulfillment, basic request logging guidance.
