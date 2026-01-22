import { test } from '../fixtures/login';

const username = process.env.USERNAME ?? '';
const password = process.env.PASSWORD ?? '';

test.describe('Login', () => {
  test('Logs in successfully and navigate to inventory page', async ({
    loginPage,
  }) => {
    await loginPage.login(username, password);
    await loginPage.assertLoaded();
  });

  test('Fails login with invalid credentials', async ({
    loginPage,
  }) => {
    await loginPage.login('invalid', 'invalid');
    await loginPage.expectInvalidCredentialsError();
  });

  test('Fails login with invalid username', async ({
    loginPage,
  }) => {
    await loginPage.login('invalid', password);
    await loginPage.expectInvalidCredentialsError();
  });

  test('Fails login with invalid password', async ({
    loginPage,
  }) => {
    await loginPage.login(username, 'invalid');
    await loginPage.expectInvalidCredentialsError();
  });

  test('Fails login with empty credentials', async ({
    loginPage,
  }) => {
    await loginPage.submit();
    await loginPage.expectUsernameRequiredError();
  });

  test('Fails login with empty username', async ({
    loginPage,
  }) => {
    await loginPage.login('', password);
    await loginPage.expectUsernameRequiredError();
  });

  test('Fails login with empty password', async ({
    loginPage,
  }) => {
    await loginPage.login(username, '');
    await loginPage.expectPasswordRequiredError();
  });
});