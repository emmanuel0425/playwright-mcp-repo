import { Page, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";

export async function login(page: Page, username: string, password: string): Promise<void> {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(username, password);
  await loginPage.isLoaded();
  await expect(page).toHaveURL(/.*\/inventory\.html/);
}