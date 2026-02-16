# Testing Auth with Auth.js

## Why test mode exists
OAuth login (Google/GitHub) is intentionally used in production, but OAuth browser flows are brittle in CI. For deterministic tests, BigSiteWorks enables a test-only Credentials provider when:

- `AUTH_TEST_MODE=true`
- `NODE_ENV !== production`

## Test mode behavior
- Credentials provider is enabled at `/signin`.
- Valid credentials are read from:
  - `AUTH_TEST_EMAIL`
  - `AUTH_TEST_PASSWORD`
- The user is upserted in Postgres with role `USER`.
- In production, this provider is always disabled.

## Local test execution
1. Start infra: `docker compose up -d`
2. Set env values (or copy `.env.example`) and include:
   - `AUTH_TEST_MODE=true`
   - `AUTH_TEST_EMAIL` / `AUTH_TEST_PASSWORD`
3. Run DB setup:
   - `pnpm prisma:generate`
   - `pnpm prisma:migrate`
   - `pnpm prisma:seed`
4. Run tests:
   - `pnpm test`
   - `pnpm test:e2e`

## Playwright usage
Playwright uses the credentials sign-in form on `/signin` for authenticated tests and verifies admin route blocking for non-admin users.
