import { test } from '../fixtures';

const oneProduct = ['Sauce Labs Backpack'];
const twoProducts = ['Sauce Labs Backpack', 'Sauce Labs Fleece Jacket'];
const threeProducts = [
  'Sauce Labs Backpack',
  'Sauce Labs Fleece Jacket',
  'Sauce Labs Bike Light',
];
const fourProducts = [
  'Sauce Labs Backpack',
  'Sauce Labs Fleece Jacket',
  'Sauce Labs Bike Light',
  'Sauce Labs Bolt T-Shirt',
];

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

  test('Completes end-to-end checkout flow successfully for 3 products', async ({
    checkoutFlow,
  }) => {
    // Add products and assert badge count
    await checkoutFlow.addProductsAndAssertBadge([
      () => checkoutFlow.productsPage.addBackpackToCart(),
      () => checkoutFlow.productsPage.addFleeceJacketToCart(),
      () => checkoutFlow.productsPage.addBikeLightToCart(),
    ]);

    // Go to cart and assert items listed in the cart
    await checkoutFlow.goToCartAndAssertItems(threeProducts);

    // Complete checkout
    await checkoutFlow.completeCheckout();
  });

  test('Completes end-to-end checkout flow successfully for 4 products', async ({
    checkoutFlow,
  }) => {
    // Add products and assert badge count
    await checkoutFlow.addProductsAndAssertBadge([
      () => checkoutFlow.productsPage.addBackpackToCart(),
      () => checkoutFlow.productsPage.addFleeceJacketToCart(),
      () => checkoutFlow.productsPage.addBikeLightToCart(),
      () => checkoutFlow.productsPage.addBoltTShirtToCart(),
    ]);

    // Go to cart and assert items listed in the cart
    await checkoutFlow.goToCartAndAssertItems(fourProducts);

    // Complete checkout
    await checkoutFlow.completeCheckout();
  });
});
