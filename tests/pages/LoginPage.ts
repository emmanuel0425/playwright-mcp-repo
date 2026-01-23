import { Locator, Page, expect } from '@playwright/test';
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
  readonly errorMessage: Locator;

  /**
   * Initializes a new instance of the LoginPage class.
   * Sets up locators for username input, password input, login button, and page title.
   *
   * @param page - The Playwright Page instance to interact with.
   */
  constructor(private readonly page: Page) {
    this.username = page.getByTestId(loginLocators.usernameInput);
    this.password = page.getByTestId(loginLocators.passwordInput);
    this.loginButton = page.getByTestId(loginLocators.loginButton);
    this.title = page.getByTestId(loginLocators.title);
    this.errorMessage = page.getByTestId(loginLocators.errorMessage);
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
   * Asserts URL is /inventory.html and the title is visible.
   */
  async assertLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(/.*\/inventory\.html/);
    await expect(this.title).toBeVisible();
  }

  /**
   * Asserts that the error message is visible for invalid credentials.
   */
  async expectInvalidCredentialsError(): Promise<void> {
    await expect(this.errorMessage).toBeVisible();
    await expect(this.errorMessage).toHaveText(
      'Epic sadface: Username and password do not match any user in this service',
    );
  }

  /**
   * Clicks the login button to submit the form.
   */
  async submit(): Promise<void> {
    await this.loginButton.click();
  }

  /**
   * Asserts that the error message is visible for empty username.
   */
  async expectUsernameRequiredError(): Promise<void> {
    await expect(this.errorMessage).toBeVisible();
    await expect(this.errorMessage).toHaveText(
      'Epic sadface: Username is required',
    );
  }

  /**
   * Asserts that the error message is visible for empty password.
   */
  async expectPasswordRequiredError(): Promise<void> {
    await expect(this.errorMessage).toBeVisible();
    await expect(this.errorMessage).toHaveText(
      'Epic sadface: Password is required',
    );
  }
}
