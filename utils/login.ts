import { Page } from '@playwright/test';

export async function login(page: Page, username = 'standard_user', password = 'secret_sauce') {
  await page.goto('/');
  await page.locator('[data-test="username"]').fill(username);
  await page.locator('[data-test="password"]').fill(password);
  await page.locator('[data-test="login-button"]').click();
}
