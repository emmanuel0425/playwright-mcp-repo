```md
❌ **Flaky tests**  
Applicable: Potential risk, but mostly handled well in one place.  

**What’s good (reduces flakiness):**  
* ProductsPage.getCartBadgeCount() guards the badge properly using isVisible().catch(() => false), which avoids timeouts when the badge is removed from the DOM at count 0.  

**What can still cause flakiness:**  
* CheckoutPage.verifyCheckoutComplete() asserts completeText is visible but not the exact text; if that element is sometimes delayed or conditionally rendered, visibility-only checks can become flaky depending on app timing.

---

❌ **Misuse of waits**  
Applicable: Not observed.  
* No waitForTimeout() or hardcoded sleeps were found.  
* URL assertions are used (toHaveURL), which is a correct, condition-based wait pattern.

---

❌ **Fragile selectors**  
Applicable: Yes (in Cart locators).  

**Stable selectors used correctly:**  
* Checkout + Products locators heavily use [data-test="..."] → good.  

**Fragile selectors found:**  
* tests/locators/cart.locators.ts uses:  
  * cartItem: '.cart_item'  
  * cartItemName: '.inventory_item_name'  
  * cartQuantity: '.cart_quantity'  

These are CSS classes, which are more likely to change than data-test. 

---

❌ **Excessive coupling**  
Applicable: Yes.  

**Examples:**  

1. **Assertions inside Page Object**  
* LoginPage.assertInventoryPage() contains expect(...).  
* CheckoutPage.verifyCheckoutComplete() contains expect(...).  

This couples business expectations to the PO layer (PO becomes “mini test logic”).  

2. **Duplication of login logic across specs**  
* login.spec.ts and checkout-flow.spec.ts both implement the same login steps instead of reusing a test helper (setup function).

---

❌ **Poor naming**  
Applicable: Yes (moderate).  

**Examples:**  
* Spec file name: checkout-flow.spec.ts. The “flow” part here is unnecessary.  
* LoginPage.assertInventoryPage() naming is okay, but it’s an assertion embedded in PO (pattern issue).

---

❌ **Playwright anti-patterns**  
Applicable: Yes (several).  

1. **Assertions inside Page Objects**  
* assertInventoryPage() and verifyCheckoutComplete() use expect() inside PO methods.  

2. **Custom random data utility**  
* tests/utils/random-data.ts is not “wrong,” but it’s reinventing something typically handled by a library (faker). It’s unnecessary maintenance.

---

❌ **Violations of E2E patterns**  
Applicable: Yes.  

1. **Redundant assertions**  
* The cart content is verified twice:  
  * verifyProductsInCart(expectedProducts) → boolean  
  * then getCartItemNames() + toContain(...)  

That’s double validation of the same requirement.  

2. **Layer responsibility violations**  
* POs contain assertions rather than exposing locators/state and leaving assertions to specs.
```