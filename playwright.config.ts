import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  use: { baseURL: 'http://127.0.0.1:3000' },
  webServer: {
    command: 'pnpm dev',
    port: 3000,
    reuseExistingServer: true,
    env: {
      ...process.env,
      AUTH_TEST_MODE: 'true',
      AUTH_TEST_EMAIL: process.env.AUTH_TEST_EMAIL ?? 'e2e-user@bigsiteworks.test',
      AUTH_TEST_PASSWORD: process.env.AUTH_TEST_PASSWORD ?? 'password123',
      ADMIN_EMAIL: process.env.ADMIN_EMAIL ?? 'admin@bigsiteworks.test'
    }
  }
});
