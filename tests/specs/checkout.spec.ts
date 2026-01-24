import { test, expect } from '../fixtures';

const oneProduct = ['Sauce Labs Backpack'];
const twoProducts = ['Sauce Labs Backpack', 'Sauce Labs Fleece Jacket'];

test.describe('Checkout', () => {
  test('Completes end-to-end checkout flow successfully for 1 product', async ({
    checkoutFlow,
  }) => {
    // Add products and assert badge count
    await checkoutFlow.addProductsAndAssertBadge([
      () => checkoutFlow.productsPage.addBackpackToCart(),
    ]);

    // Go to cart and assert items listed in the cart
    await checkoutFlow.goToCartAndAssertItems(oneProduct);

    // Complete checkout
    await checkoutFlow.completeCheckout();
  });

  test('Cart should be empty after checkout for 1 product', async ({
    checkoutFlow,
    page,
  }) => {
    // Add products and assert badge count
    await checkoutFlow.addProductsAndAssertBadge([
      () => checkoutFlow.productsPage.addBackpackToCart(),
    ]);

    // Go to cart and assert items listed in the cart
    await checkoutFlow.goToCartAndAssertItems(oneProduct);

    // Complete checkout
    await checkoutFlow.completeCheckout();

    // Go to products page and assert cart badge is not visible
    await checkoutFlow.checkoutPage.backToProducts();
    await expect(page).toHaveURL(/.*\/inventory\.html/);
    await expect(checkoutFlow.productsPage.cartBadge).not.toBeAttached();
  });

  test('Completes end-to-end checkout flow successfully for 2 products', async ({
    checkoutFlow,
  }) => {
    // Add products and assert badge count
    await checkoutFlow.addProductsAndAssertBadge([
      () => checkoutFlow.productsPage.addBackpackToCart(),
      () => checkoutFlow.productsPage.addFleeceJacketToCart(),
    ]);

    // Go to cart and assert items listed in the cart
    await checkoutFlow.goToCartAndAssertItems(twoProducts);

    // Complete checkout
    await checkoutFlow.completeCheckout();
  });

  test('Cart should be empty after checkout for 2 products', async ({
    checkoutFlow,
    page,
  }) => {
    // Add products and assert badge count
    await checkoutFlow.addProductsAndAssertBadge([
      () => checkoutFlow.productsPage.addBackpackToCart(),
      () => checkoutFlow.productsPage.addFleeceJacketToCart(),
    ]);

    // Go to cart and assert items listed in the cart
    await checkoutFlow.goToCartAndAssertItems(twoProducts);

    // Complete checkout
    await checkoutFlow.completeCheckout();

    // Go to products page and assert cart badge is not visible
    await checkoutFlow.checkoutPage.backToProducts();
    await expect(page).toHaveURL(/.*\/inventory\.html/);
    await expect(checkoutFlow.productsPage.cartBadge).not.toBeAttached();
  });
});
