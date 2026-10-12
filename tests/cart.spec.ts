import { test, expect } from '@playwright/test';
import { login } from '../utils/login';

test.beforeEach(async ({ page }) => {
  await login(page);
  await expect(page).toHaveURL(/inventory\.html/);
});

test('user can add a product to the cart and reach checkout', async ({ page }) => {
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('1');

  await page.locator('[data-test="shopping-cart-link"]').click();
  await expect(page).toHaveURL(/cart\.html/);
  // The URL changes before the cart contents render, so wait for the page title first
  await expect(page.locator('[data-test="title"]')).toHaveText('Your Cart');
  await expect(page.locator('[data-test="inventory-item-name"]')).toHaveText('Sauce Labs Backpack');

  await page.locator('[data-test="checkout"]').click();
  await expect(page).toHaveURL(/checkout-step-one\.html/);
  await expect(page.locator('[data-test="title"]')).toHaveText('Checkout: Your Information');
});
