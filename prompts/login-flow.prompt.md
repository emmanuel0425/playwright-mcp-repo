Navigate to https://www.saucedemo.com using Playwright.

Tasks:
1) Detect and choose the best stable selectors for:
   - username input
   - password input
   - login button

2) Create these files:
- tests/locators/login.locators.ts (export an object with the selectors)
- tests/data/credentials.json with:
  {
    "username": "standard_user",
    "password": "secret_sauce"
  }

3) Create Page Object:
- tests/pages/LoginPage.ts

4) Create spec:
- tests/specs/login.spec.ts
   The test must:
   - open the login page
   - log in using credentials.json
   - assert navigation to inventory page

5) Use Page Object Model and import locators from the locators file.

6) Run:
npx playwright test

If anything fails, fix it and rerun until green.

Return only:
- which files were created
- which selectors were chosen
- whether the test passed
