import { test, expect } from '@playwright/test';
import { login } from '../utils/login';

test('standard user can log in and see the products page', async ({ page }) => {
  await login(page);

  await expect(page).toHaveURL(/inventory\.html/);
  await expect(page.locator('[data-test="title"]')).toHaveText('Products');
});
