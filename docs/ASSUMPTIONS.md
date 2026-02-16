# Assumptions (MVP)

1. Authentication uses Auth.js v5 with Prisma/Postgres database sessions.
2. OAuth providers (Google + GitHub) are configured for normal sign-in.
3. `AUTH_TEST_MODE=true` is only used in non-production test runs to enable deterministic e2e credentials login.
4. Stripe, S3 (MinIO), and Postgres run locally for end-to-end verification.
