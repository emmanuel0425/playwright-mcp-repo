import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import credentials from '../data/credentials.json';

test.describe('Login', () => {
  test('should login successfully and navigate to inventory page', async ({ page }) => {
    const loginPage = new LoginPage(page);
    
    await loginPage.goto();
    await loginPage.login(credentials.username, credentials.password);
    await loginPage.assertInventoryPage();
  });
});
