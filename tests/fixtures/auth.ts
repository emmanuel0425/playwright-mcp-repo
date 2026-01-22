import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

export const test = base.extend({
    page: async ({ page }, use) => {
        const username = process.env.USERNAME;
        const password = process.env.PASSWORD;

        if (!username || !password) {
            throw new Error('USERNAME/PASSWORD env vars must be set for authenticated tests.');
        }

        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.login(username, password);
        await loginPage.assertLoaded();

        await use(page);
    },
});

export { expect } from '@playwright/test';
