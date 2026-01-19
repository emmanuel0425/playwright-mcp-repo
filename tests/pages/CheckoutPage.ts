import { Locator, Page } from '@playwright/test';
import { checkoutLocators } from '../locators/checkout.locators';

/**
 * Page Object Model for the Checkout pages.
 * Handles checkout information entry, overview, and completion.
 */
export class CheckoutPage {
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly zipCodeInput: Locator;
  readonly continueButton: Locator;
  readonly finishButton: Locator;
  readonly completeHeader: Locator;
  readonly completeText: Locator;

  /**
   * Initializes a new instance of the CheckoutPage class.
   * Sets up locators for checkout form fields and buttons.
   *
   * @param page - The Playwright Page instance to interact with.
   */
  constructor(private readonly page: Page) {
    this.firstNameInput = page.locator(checkoutLocators.firstNameInput);
    this.lastNameInput = page.locator(checkoutLocators.lastNameInput);
    this.zipCodeInput = page.locator(checkoutLocators.zipCodeInput);
    this.continueButton = page.locator(checkoutLocators.continueButton);
    this.finishButton = page.locator(checkoutLocators.finishButton);
    this.completeHeader = page.locator(checkoutLocators.completeHeader);
    this.completeText = page.locator(checkoutLocators.completeText);
  }

  /**
   * Fills in the checkout information form with provided personal details.
   *
   * @param firstName - The first name to enter.
   * @param lastName - The last name to enter.
   * @param zipCode - The zip/postal code to enter.
   */
  async fillCheckoutInformation(
    firstName: string,
    lastName: string,
    zipCode: string
  ): Promise<void> {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.zipCodeInput.fill(zipCode);
  }

  /**
   * Clicks the continue button to proceed to checkout overview.
   */
  async continueToOverview(): Promise<void> {
    await this.continueButton.click();
  }

  /**
   * Clicks the finish button to complete the checkout process.
   */
  async finishCheckout(): Promise<void> {
    await this.finishButton.click();
  }
}
