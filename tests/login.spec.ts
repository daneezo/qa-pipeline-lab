import { test, expect } from '@playwright/test';
import { login } from '../utils/login';

test('standard user can log in and see the products page', async ({ page }) => {
  await login(page);

  await expect(page).toHaveURL(/inventory\.html/);
  await expect(page.locator('[data-test="title"]')).toHaveText('Products');
});

test('user cannot log in with the wrong password', async ({ page }) => {
  await login(page, 'standard_user', 'wrong_password');

  await expect(page.locator('[data-test="error"]')).toHaveText(
    'Epic sadface: Username and password do not match any user in this service'
  );
  await expect(page).not.toHaveURL(/inventory\.html/);
  await expect(page.locator('[data-test="login-button"]')).toBeVisible();
});
