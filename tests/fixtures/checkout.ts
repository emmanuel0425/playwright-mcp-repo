import { test as base, expect } from '@playwright/test';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { ProductsPage } from '../pages/ProductsPage';
import { generateRandomCheckoutInfo } from '../utils/checkoutData';

/**
 * Checkout flow fixture
 *
 * High-level helper API that encapsulates the end-to-end checkout workflow.
 *
 * Purpose:
 * - Reduce duplication across checkout-related tests
 * - Provide clear, intention-revealing actions instead of low-level steps
 * - Centralize checkout assertions in one place
 *
 * This object is created per test and is backed by Page Objects.
 */

type CheckoutFlow = {
  productsPage: ProductsPage;
  cartPage: CartPage;
  checkoutPage: CheckoutPage;

  addProductsAndAssertBadge(
    productAdds: Array<() => Promise<void>>,
  ): Promise<void>;
  goToCartAndAssertItems(expectedProducts: string[]): Promise<void>;
  completeCheckout(): Promise<void>;
};

export const test = base.extend<{ checkoutFlow: CheckoutFlow }>({
  checkoutFlow: async ({ page }, use) => {
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    const checkoutFlow: CheckoutFlow = {
      productsPage,
      cartPage,
      checkoutPage,

      async addProductsAndAssertBadge(productAdds) {
        for (const add of productAdds) await add();
        await expect(productsPage.cartBadge).toHaveText(
          productAdds.length.toString(),
        );
      },

      async goToCartAndAssertItems(expectedProducts) {
        await productsPage.goToCart();
        await expect(page).toHaveURL(/.*\/cart\.html/);

        for (const productName of expectedProducts) {
          await expect(
            cartPage.cartProductsByName(productName),
            `Expected product '${productName}' to be in cart`,
          ).toHaveCount(1);
        }

        await cartPage.proceedToCheckout();
        await expect(page).toHaveURL(/.*\/checkout-step-one\.html/);
      },

      async completeCheckout() {
        const { firstName, lastName, zipCode } = generateRandomCheckoutInfo();
        await checkoutPage.fillCheckoutInformation(
          firstName,
          lastName,
          zipCode,
        );
        await checkoutPage.continueToOverview();
        await expect(page).toHaveURL(/.*\/checkout-step-two\.html/);

        await checkoutPage.finishCheckout();
        await expect(page).toHaveURL(/.*\/checkout-complete\.html/);
      },
    };

    await use(checkoutFlow);
  },
});
