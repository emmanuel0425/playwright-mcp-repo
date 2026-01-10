import { Locator, Page } from '@playwright/test';
import { cartLocators } from '../locators/cart.locators';

/**
 * Page Object Model for the Cart page.
 * Provides methods for viewing cart items and proceeding to checkout.
 */
export class CartPage {
  readonly checkoutButton: Locator;
  readonly cartItems: Locator;

  /**
   * Initializes a new instance of the CartPage class.
   * Sets up locators for cart items and checkout button.
   *
   * @param page - The Playwright Page instance to interact with.
   */
  constructor(private page: Page) {
    this.checkoutButton = page.locator(cartLocators.checkoutButton);
    this.cartItems = page.locator(cartLocators.cartItem);
  }

  /**
   * Clicks the checkout button to proceed to checkout information page.
   */
  async proceedToCheckout(): Promise<void> {
    await this.checkoutButton.click();
  }

  /**
   * Gets the list of product names currently in the cart.
   *
   * @returns An array of product names in the cart.
   */
  async getCartItemNames(): Promise<string[]> {
    const itemCount = await this.cartItems.count();
    const itemNames: string[] = [];

    for (let i = 0; i < itemCount; i++) {
      const itemName = await this.cartItems
        .nth(i)
        .locator(cartLocators.cartItemName)
        .textContent();
      if (itemName) {
        itemNames.push(itemName.trim());
      }
    }

    return itemNames;
  }

  /**
   * Verifies that specific products are present in the cart.
   *
   * @param expectedProducts - Array of product names that should be in the cart.
   * @returns True if all expected products are found in the cart, false otherwise.
   */
  async verifyProductsInCart(expectedProducts: string[]): Promise<boolean> {
    const cartItemNames = await this.getCartItemNames();
    return expectedProducts.every((product) => cartItemNames.includes(product));
  }
}
