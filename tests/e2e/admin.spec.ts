import { expect, test } from '@playwright/test';

test('admin area redirects unauthenticated users', async ({ page }) => {
  await page.goto('/admin/templates');
  await expect(page).toHaveURL(/signin/);
});
