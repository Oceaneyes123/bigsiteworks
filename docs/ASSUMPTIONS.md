# Assumptions

1. Local MVP authentication uses a secure HttpOnly session cookie created by `/api/session` for deterministic local testing, because third-party auth provisioning credentials are not available in this environment.
2. Cart state is stored in browser localStorage to keep checkout UX lightweight for MVP.
3. Download security uses short-lived S3 signed URLs generated only after paid ownership verification.
4. Stripe webhook endpoint is consumed through Stripe CLI forwarding in local development.
