Navigate to https://www.saucedemo.com and automate an end-to-end checkout flow.

Flow requirements:
1) Go to the site and log in using the standard SauceDemo credentials (standard_user / secret_sauce).
2) On the Products page, add exactly these two items to the cart:
   - "Sauce Labs Backpack"
   - "Sauce Labs Fleece Jacket"
3) Click the cart icon (top right), then click "Checkout".
4) Fill the Checkout: Your Information form with:
   - random first name
   - random last name
   - random zip code
5) Click "Continue", then click "Finish".

Implementation requirements:
- Use Playwright (TypeScript).
- Implement this as a Playwright test that actually runs in the browser.
- Use stable selectors (prefer data-test/data-testid attributes, then roles/labels; avoid XPath).
- Make the test deterministic: only the personal info is random; the chosen products must always be the same two.
- Add clear assertions that confirm:
  - both products are in the cart before checkout
  - the checkout completes successfully (success/complete page is shown)

After generating the code:
- Run: npx playwright test
- Fix any failures and rerun until the test passes.

Return:
- the files created/modified
- the selectors chosen for the key actions
- the final test result (pass/fail)
