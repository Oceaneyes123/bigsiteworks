# Verification Checklist

## Environment
- [ ] `cp .env.example .env` and populate Stripe secrets.
- [ ] `docker compose up -d` starts Postgres + MinIO.
- [ ] `pnpm install` succeeds.
- [ ] `pnpm prisma:migrate && pnpm prisma:seed` succeeds.

## Marketplace
- [ ] Homepage shows featured templates.
- [ ] `/templates` search/filter/sort returns expected results.
- [ ] Template detail shows performance score + live preview.

## Auth + Dashboard
- [ ] Sign in via `/signin` creates session.
- [ ] Dashboard redirects unauthenticated users.
- [ ] Paid purchases show license + download links.

## Checkout + Fulfillment
- [ ] Add template to cart and launch Stripe Checkout.
- [ ] Stripe webhook marks purchase as `PAID` and creates license.
- [ ] Canceled checkout leaves order pending.

## Secure delivery
- [ ] Download endpoint denies non-purchasers.
- [ ] Download endpoint redirects purchasers to short-lived signed URL.
- [ ] Download audit log row is created.

## Admin
- [ ] Admin route requires admin session.
- [ ] Uploading zip + metadata creates template record.
- [ ] Uploaded template appears in public marketplace listing.

## Automated tests
- [ ] `pnpm test`
- [ ] `pnpm test:e2e`
