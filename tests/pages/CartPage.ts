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
  constructor(private readonly page: Page) {
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
   * Returns a locator for cart products by product name.
   *
   * @param productName - The product name.
   * @returns A locator for cart products with the product name.
   */

  cartProductsByName(productName: string): Locator {
    return this.cartItems.filter({ hasText: productName });
  }
}
