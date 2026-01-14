import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('Login', () => {
  test('Should login successfully and navigate to inventory page', async ({
    page,
  }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login(process.env.USERNAME!, process.env.PASSWORD!);
    await loginPage.isLoaded();
    await expect(page).toHaveURL(/.*\/inventory\.html/);
  });
});
