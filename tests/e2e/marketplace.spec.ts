import { expect, test } from '@playwright/test';

test('browse marketplace and add to cart', async ({ page }) => {
  await page.goto('/templates');
  await expect(page.getByRole('heading', { name: 'Template Marketplace' })).toBeVisible();
  await page.click('a[href^="/templates/"]');
  await page.getByRole('button', { name: 'Add to cart' }).click();
  await page.goto('/cart');
  await expect(page.getByRole('heading', { name: 'Cart' })).toBeVisible();
});

