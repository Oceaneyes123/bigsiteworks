dev:
	docker compose up -d
	pnpm prisma:migrate
	pnpm prisma:seed
	pnpm dev

verify:
	pnpm test
	pnpm test:e2e
