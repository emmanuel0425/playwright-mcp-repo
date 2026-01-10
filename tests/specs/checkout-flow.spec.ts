import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import credentials from '../data/credentials.json';
import { getRandomFirstName, getRandomLastName, getRandomZipCode } from '../utils/random-data';

test.describe('Checkout Flow', () => {
  test('should complete end-to-end checkout flow successfully', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    // Step 1: Navigate to site and log in
    await loginPage.goto();
    await loginPage.login(credentials.username, credentials.password);
    await expect(page).toHaveURL(/.*\/inventory\.html/);

    // Step 2: Add specific products to cart
    await productsPage.addBackpackToCart();
    await productsPage.addFleeceJacketToCart();

    // Verify cart badge shows 2 items
    const cartCount = await productsPage.getCartBadgeCount();
    expect(cartCount).toBe(2);

    // Step 3: Go to cart and proceed to checkout
    await productsPage.goToCart();
    await expect(page).toHaveURL(/.*\/cart\.html/);

    // Verify both products are in cart before checkout
    const expectedProducts = ['Sauce Labs Backpack', 'Sauce Labs Fleece Jacket'];
    const productsInCart = await cartPage.verifyProductsInCart(expectedProducts);
    expect(productsInCart).toBe(true);

    // Verify products by getting actual names
    const cartItemNames = await cartPage.getCartItemNames();
    expect(cartItemNames).toContain('Sauce Labs Backpack');
    expect(cartItemNames).toContain('Sauce Labs Fleece Jacket');

    // Click checkout
    await cartPage.proceedToCheckout();
    await expect(page).toHaveURL(/.*\/checkout-step-one\.html/);

    // Step 4: Fill checkout information with random data
    const firstName = getRandomFirstName();
    const lastName = getRandomLastName();
    const zipCode = getRandomZipCode();

    await checkoutPage.fillCheckoutInformation(firstName, lastName, zipCode);
    await checkoutPage.continueToOverview();
    await expect(page).toHaveURL(/.*\/checkout-step-two\.html/);

    // Step 5: Complete checkout
    await checkoutPage.finishCheckout();
    await expect(page).toHaveURL(/.*\/checkout-complete\.html/);

    // Step 6: Verify checkout completion
    await checkoutPage.verifyCheckoutComplete();
  });
});
