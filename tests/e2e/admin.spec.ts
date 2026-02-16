import { expect, test } from '@playwright/test';

test('admin area redirects unauthenticated users', async ({ page }) => {
  await page.goto('/admin/templates');
  await expect(page).toHaveURL(/signin/);
});

test('non-admin user is blocked from admin area server-side', async ({ page }) => {
  await page.goto('/signin');
  await page.getByPlaceholder('Email').fill(process.env.AUTH_TEST_EMAIL ?? 'e2e-user@bigsiteworks.test');
  await page.getByPlaceholder('Password').fill(process.env.AUTH_TEST_PASSWORD ?? 'password123');
  await page.getByRole('button', { name: 'Sign in with test credentials' }).click();

  await page.goto('/admin/templates');
  await expect(page).toHaveURL(/dashboard/);
});
