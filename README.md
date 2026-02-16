# BigSiteWorks MVP

## Local setup

1. Copy env file:
   ```bash
   cp .env.example .env
   ```
2. Start infrastructure:
   ```bash
   docker compose up -d
   ```
3. Install dependencies:
   ```bash
   pnpm install
   ```
4. Run migrations and seed:
   ```bash
   pnpm prisma:generate
   pnpm prisma:migrate
   pnpm prisma:seed
   ```
5. Create MinIO bucket (`bigsiteworks`) via MinIO console (`http://localhost:9001`).
6. Start app:
   ```bash
   pnpm dev
   ```

## Authentication

- Auth.js v5 with Prisma adapter and **database sessions**.
- OAuth providers: Google + GitHub.
- Seeded initial admin user from `ADMIN_EMAIL`.
- Optional non-production test mode: set `AUTH_TEST_MODE=true` and use credentials provider on `/signin`.

See `docs/TESTING_AUTH.md` for e2e/CI auth strategy.

## Stripe webhook forwarding

```bash
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

Use the printed webhook secret to update `STRIPE_WEBHOOK_SECRET`.

## One-command start

```bash
make dev
```

## Verification

Follow `docs/VERIFY.md` and run:

```bash
pnpm test
pnpm test:e2e
```
