import { expect, test } from '@playwright/test';

test('browse marketplace and add to cart', async ({ page }) => {
  await page.goto('/templates');
  await expect(page.getByRole('heading', { name: 'Template Marketplace' })).toBeVisible();
  await page.click('a[href^="/templates/"]');
  await page.getByRole('button', { name: 'Add to cart' }).click();
  await page.goto('/cart');
  await expect(page.getByRole('heading', { name: 'Cart' })).toBeVisible();
});

test('test user can sign in via credentials flow', async ({ page }) => {
  await page.goto('/signin');
  await page.getByPlaceholder('Email').fill(process.env.AUTH_TEST_EMAIL ?? 'e2e-user@bigsiteworks.test');
  await page.getByPlaceholder('Password').fill(process.env.AUTH_TEST_PASSWORD ?? 'password123');
  await page.getByRole('button', { name: 'Sign in with test credentials' }).click();
  await expect(page).toHaveURL(/dashboard/);
  await expect(page.getByText(/Signed in as/i)).toBeVisible();
});
