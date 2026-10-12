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

test('user cannot log in without a username', async ({ page }) => {
  await login(page, '', 'secret_sauce');

  await expect(page.locator('[data-test="error"]')).toHaveText('Epic sadface: Username is required');
  await expect(page.locator('[data-test="login-button"]')).toBeVisible();
});

test('user cannot log in without a password', async ({ page }) => {
  await login(page, 'standard_user', '');

  await expect(page.locator('[data-test="error"]')).toHaveText('Epic sadface: Password is required');
  await expect(page.locator('[data-test="login-button"]')).toBeVisible();
});

test('locked out user cannot log in', async ({ page }) => {
  await login(page, 'locked_out_user');

  await expect(page.locator('[data-test="error"]')).toHaveText(
    'Epic sadface: Sorry, this user has been locked out.'
  );
  await expect(page.locator('[data-test="login-button"]')).toBeVisible();
});

test('products page cannot be opened without logging in', async ({ page }) => {
  await page.goto('/inventory.html');

  await expect(page.locator('[data-test="error"]')).toHaveText(
    "Epic sadface: You can only access '/inventory.html' when you are logged in."
  );
  await expect(page.locator('[data-test="login-button"]')).toBeVisible();
});
