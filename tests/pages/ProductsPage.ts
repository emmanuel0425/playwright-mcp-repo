import { Locator, Page } from '@playwright/test';
import { productsLocators } from '../locators/products.locators';

/**
 * Page Object Model for the Products/Inventory page.
 * Provides methods for interacting with products and cart functionality.
 */
export class ProductsPage {
  readonly addToCartBackpack: Locator;
  readonly addToCartFleeceJacket: Locator;
  readonly cartIcon: Locator;
  readonly cartBadge: Locator;

  /**
   * Initializes a new instance of the ProductsPage class.
   * Sets up locators for product actions and cart elements.
   *
   * @param page - The Playwright Page instance to interact with.
   */
  constructor(private page: Page) {
    this.addToCartBackpack = page.locator(productsLocators.addToCartBackpack);
    this.addToCartFleeceJacket = page.locator(
      productsLocators.addToCartFleeceJacket
    );
    this.cartIcon = page.locator(productsLocators.cartIcon);
    this.cartBadge = page.locator(productsLocators.cartBadge);
  }

  /**
   * Adds the Sauce Labs Backpack to the cart.
   */
  async addBackpackToCart(): Promise<void> {
    await this.addToCartBackpack.click();
  }

  /**
   * Adds the Sauce Labs Fleece Jacket to the cart.
   */
  async addFleeceJacketToCart(): Promise<void> {
    await this.addToCartFleeceJacket.click();
  }

  /**
   * Clicks the cart icon to navigate to the cart page.
   */
  async goToCart(): Promise<void> {
    await this.cartIcon.click();
  }
}
