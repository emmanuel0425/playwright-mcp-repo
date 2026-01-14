import { Page, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

export async function login(page: Page): Promise<void> {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(process.env.USERNAME!, process.env.PASSWORD!);
  await loginPage.isLoaded();
  await expect(page).toHaveURL(/.*\/inventory\.html/);
}
