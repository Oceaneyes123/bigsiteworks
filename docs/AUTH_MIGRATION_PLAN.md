# Auth Migration Plan (Legacy Auth ➜ Auth.js v5 + Prisma)

## Current auth inventory

### Legacy auth usage scan
Result of repository scan for legacy-auth references:
- `PRD.md` contains one historical legacy provider reference in a feature note.
- No legacy-auth packages in `package.json`.
- No legacy-auth middleware/components/routes in source code.

### Existing auth implementation to replace
The app currently uses a custom cookie-based auth flow (`bsw_user`) and a session bootstrap API route:
- `lib/auth.ts` parses a base64 cookie and exposes `getSessionUser` / `requireAdmin`.
- `app/api/session/route.ts` creates users and writes auth cookies.
- `/signin` is a custom email+role form that writes the cookie.
- API routes and pages call `getSessionUser` directly.

### Areas requiring migration
- Prisma schema (`User` model + role enum) and addition of required NextAuth models.
- Central Auth.js config (`auth.ts`) + route handlers.
- Route/page/server auth guard replacement to `auth()`.
- UI update for OAuth sign-in providers (Google + GitHub), plus test-mode credentials provider.
- Tests (unit + e2e auth coverage) and auth test runbook.
- Env/docs updates and complete legacy-auth reference removal.

## Step-by-step migration plan

1. **Foundation + schema migration**
   - Update Prisma schema:
     - Add NextAuth models: `Account`, `Session`, `VerificationToken`.
     - Update `User` for Auth.js compatibility (`name`, `emailVerified`, `image`) and keep marketplace relations.
     - Replace `Role.CUSTOMER` with `Role.USER` and update defaults.
     - Remove legacy `authId`.
   - Create Prisma migration SQL and generate client.
   - Update seed to create templates + initial admin user from `ADMIN_EMAIL`.

2. **Auth.js wiring**
   - Add top-level `auth.ts` exporting `{ handlers, auth, signIn, signOut }`.
   - Configure Prisma Adapter + database sessions.
   - Add providers:
     - Google
     - GitHub
     - Test-only Credentials provider behind `AUTH_TEST_MODE=true` and non-production.
   - Add callbacks to map role into `session.user.role`.
   - Add `app/api/auth/[...nextauth]/route.ts` handler.

3. **Application auth integration**
   - Replace `lib/auth.ts` cookie logic with wrappers around `auth()` and server-side guard helpers.
   - Remove `/api/session` bootstrap flow entirely.
   - Update protected pages/routes (`dashboard`, `admin`, checkout/download/admin API) to use new session user shape and server-side authorization.
   - Ensure admin-only checks are server-enforced.

4. **UI updates**
   - Replace `/signin` with provider buttons for Google + GitHub.
   - Add test credentials sign-in form when test mode is enabled.
   - Add reusable sign-out button component and expose user identity in authenticated areas.

5. **Tests + verification**
   - Add unit tests for auth guard helpers (authenticated, unauthenticated, admin, non-admin).
   - Add/adjust Playwright e2e to use test-mode credentials sign-in for authenticated flows.
   - Add `docs/TESTING_AUTH.md` with CI-safe auth strategy and execution steps.

6. **Docs + env cleanup**
   - Update `.env.example` with NextAuth variables:
     - `NEXTAUTH_URL`, `NEXTAUTH_SECRET`
     - `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`
     - `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET`
     - `ADMIN_EMAIL`
     - test mode vars (`AUTH_TEST_MODE`, `AUTH_TEST_EMAIL`, `AUTH_TEST_PASSWORD`) for local/CI testing.
   - Update README + verification docs.
   - Remove all legacy-auth mentions (including PRD historical note).

## Risks and mitigations

1. **Role enum rename (`CUSTOMER` ➜ `USER`) can break existing reads/writes**
   - Mitigation: migrate DB enum values and update all TS role checks in one cohesive change; add tests.

2. **OAuth is not deterministic in CI/e2e**
   - Mitigation: implement guarded Credentials provider for non-production test mode.

3. **Session shape differences between custom cookie and Auth.js**
   - Mitigation: centralize in `lib/auth.ts` helper and enforce strict null/admin guards in one place.

4. **Potential breakage of purchases/download linkage**
   - Mitigation: preserve all business relations on Prisma `User.id` and validate checkout/download/admin flows in runbook + tests.

5. **Migration drift in fresh vs existing databases**
   - Mitigation: include Prisma migration SQL in repo and verify from scratch via dockerized Postgres.
