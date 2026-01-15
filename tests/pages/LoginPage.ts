import { Locator, Page } from '@playwright/test';
import { loginLocators } from '../locators/login.locators';

/**
 * Page Object Model for the Login page.
 * Provides methods and locators for interacting with the login page elements.
 */
export class LoginPage {
  readonly username: Locator;
  readonly password: Locator;
  readonly loginButton: Locator;
  readonly title: Locator;

  /**
   * Initializes a new instance of the LoginPage class.
   * Sets up locators for username input, password input, login button, and page title.
   *
   * @param page - The Playwright Page instance to interact with.
   */
  constructor(private page: Page) {
    this.username = page.locator(loginLocators.usernameInput);
    this.password = page.locator(loginLocators.passwordInput);
    this.loginButton = page.locator(loginLocators.loginButton);
    this.title = page.locator(loginLocators.title);
  }

  /**
   * Navigates to the login page.
   * Uses the base URL configured in Playwright config (defaults to root path).
   */
  async goto(): Promise<void> {
    await this.page.goto('/');
  }

  /**
   * Performs login action by filling in credentials and clicking the login button.
   *
   * @param username - The username to enter in the username input field.
   * @param password - The password to enter in the password input field.
   */
  async login(username: string, password: string): Promise<void> {
    await this.username.fill(username);
    await this.password.fill(password);
    await this.loginButton.click();
  }

  /**
   * Waits for the main page to be fully loaded by checking if the title element is visible.
   * This method can be used to ensure the page is ready before performing actions.
   */
  async isLoaded(): Promise<void> {
    await this.title.waitFor({ state: 'visible' });
  }
}
