import { Page, expect } from '@playwright/test';
import { loginLocators } from '../locators/login.locators';

export class LoginPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('/');
  }

  async login(username: string, password: string) {
    await this.page.locator(loginLocators.usernameInput).fill(username);
    await this.page.locator(loginLocators.passwordInput).fill(password);
    await this.page.locator(loginLocators.loginButton).click();
  }

  async assertInventoryPage() {
    await expect(this.page).toHaveURL(/.*\/inventory\.html/);
  }
}
