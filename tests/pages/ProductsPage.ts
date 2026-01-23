import { Locator, Page } from '@playwright/test';
import { productsLocators } from '../locators/products.locators';

/**
 * Page Object Model for the Products/Inventory page.
 * Provides methods for interacting with products and cart functionality.
 */
export class ProductsPage {
  readonly addToCartBackpack: Locator;
  readonly addToCartFleeceJacket: Locator;
  readonly addToCartBikeLight: Locator;
  readonly addToCartBoltTShirt: Locator;
  readonly cartIcon: Locator;
  readonly cartBadge: Locator;

  /**
   * Initializes a new instance of the ProductsPage class.
   * Sets up locators for product actions and cart elements.
   *
   * @param page - The Playwright Page instance to interact with.
   */
  constructor(private readonly page: Page) {
    this.addToCartBackpack = page.getByTestId(
      productsLocators.addToCartBackpack,
    );
    this.addToCartFleeceJacket = page.getByTestId(
      productsLocators.addToCartFleeceJacket,
    );
    this.addToCartBikeLight = page.getByTestId(
      productsLocators.addToCartBikeLight,
    );
    this.addToCartBoltTShirt = page.getByTestId(
      productsLocators.addToCartBoltTShirt,
    );
    this.cartIcon = page.getByTestId(productsLocators.cartIcon);
    this.cartBadge = page.getByTestId(productsLocators.cartBadge);
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
   * Adds the Sauce Labs Bike Light to the cart.
   */
  async addBikeLightToCart(): Promise<void> {
    await this.addToCartBikeLight.click();
  }

  /**
   * Adds the Sauce Labs Bolt T-Shirt to the cart.
   */
  async addBoltTShirtToCart(): Promise<void> {
    await this.addToCartBoltTShirt.click();
  }

  /**
   * Clicks the cart icon to navigate to the cart page.
   */
  async goToCart(): Promise<void> {
    await this.cartIcon.click();
  }
}
