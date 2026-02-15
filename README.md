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
