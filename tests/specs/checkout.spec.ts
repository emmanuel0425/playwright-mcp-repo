import { test, expect } from "@playwright/test";
import { login } from "../helpers/auth";
import { ProductsPage } from "../pages/ProductsPage";
import { CartPage } from "../pages/CartPage";
import { CheckoutPage } from "../pages/CheckoutPage";
import credentials from "../data/credentials.json";
import { generateRandomCheckoutInfo } from "../helpers/testData";

test.describe("Checkout Flow", () => {
  test("should complete end-to-end checkout flow successfully", async ({
    page,
  }) => {
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    // Step 1: Navigate to site and log in
    await login(page, credentials.username, credentials.password);

    // Step 2: Add specific products to cart
    await productsPage.addBackpackToCart();
    await productsPage.addFleeceJacketToCart();

    // Verify cart badge shows 2 items
    await expect(productsPage.cartBadge).toHaveText("2");

    // Step 3: Go to cart and proceed to checkout
    await productsPage.goToCart();
    await expect(page).toHaveURL(/.*\/cart\.html/);

    // Verify both products are in cart before checkout
    const expectedProducts = [
      "Sauce Labs Backpack",
      "Sauce Labs Fleece Jacket",
    ];

    for (const productName of expectedProducts) {
      await expect(
        cartPage.cartProductsByName(productName),
        `Expected product '${productName}' to be in cart`
      ).toHaveCount(1);
    }

    // Click checkout
    await cartPage.proceedToCheckout();
    await expect(page).toHaveURL(/.*\/checkout-step-one\.html/);

    // Step 4: Fill checkout information with random data
    const { firstName, lastName, zipCode } = generateRandomCheckoutInfo();
    await checkoutPage.fillCheckoutInformation(firstName, lastName, zipCode);
    await checkoutPage.continueToOverview();
    await expect(page).toHaveURL(/.*\/checkout-step-two\.html/);

    // Step 5: Complete checkout
    await checkoutPage.finishCheckout();
    await expect(page).toHaveURL(/.*\/checkout-complete\.html/);

    // Step 6: Verify checkout completion
    await expect(checkoutPage.completeHeader).toHaveText(
      "Thank you for your order!"
    );
   
    await expect(checkoutPage.completeText).toHaveText(
      "Your order has been dispatched, and will arrive just as fast as the pony can get there!"
    );
  });
});
