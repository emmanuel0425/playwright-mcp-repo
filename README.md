# MCP-Driven Playwright E2E Framework

This repository contains an end-to-end testing framework built with **Playwright** and orchestrated through the **Model Context Protocol (MCP)** using **Cursor AI** as a code-generation assistant, with **human-driven architectural control and validation**.

The purpose of this project is not only to automate a checkout flow, but to demonstrate how **AI-assisted automation can be safely used in professional QA engineering** when paired with strong human design decisions.

---

## 🎯 What this project demonstrates

This project shows:

1. AI can generate large amounts of working Playwright code very quickly
2. AI alone cannot design a reliable test architecture
3. A human QA engineer must own test meaning, structure, and responsibility boundaries

The framework was built by allowing Cursor (via MCP) to generate code and then **reviewing, correcting, and restructuring** that output to ensure long-term maintainability and correctness.

---

## 🧪 System under test

The tests automate the public demo site:

**[https://www.saucedemo.com](https://www.saucedemo.com)**

Main user flow:

1. Login
2. Add products to cart
3. Open cart
4. Checkout
5. Enter random user data
6. Complete the order
7. Validate confirmation

Products used:

* Sauce Labs Backpack
* Sauce Labs Fleece Jacket

---

## 🧱 Architecture

The project follows a clean separation of concerns.

### Page Objects

Each page contains:

* Locators
* UI actions (click, fill, submit)

Pages do **not** contain assertions or test logic.

Pages in this project:

* `LoginPage`
* `ProductsPage`
* `CartPage`
* `CheckoutPage`

### Test Specs

Specs are responsible for:

* Defining what the test means
* Owning all assertions
* Orchestrating flows across pages

This ensures:

* No hidden logic
* No duplicated flows
* Clear responsibility boundaries

---

## 🧠 Human vs AI responsibility model

The project follows one core rule:

> **AI may write code. Humans decide what the test means.**

### What the AI did well

* Generated a working Playwright framework quickly
* Created page objects, selectors, and flows
* Produced a runnable checkout automation

### What the AI did wrong (and was corrected)

* Placed assertions inside Page Objects
* Duplicated login flows across specs
* Introduced unnecessary utilities
* Mixed responsibilities between layers
* Used fragile selectors in some places

These issues were intentionally reviewed and corrected to show how human judgment is required when using AI in QA automation.

---

## 🧩 Why MCP is used

Model Context Protocol allows Cursor to:

* Read and modify the entire codebase
* Keep project-level context
* Apply changes across multiple files consistently

This enables fast scaffolding and refactoring — but **MCP does not replace architectural decisions**.

---

## 🚀 How to run the tests

Install dependencies:

```bash
npm install
```

Run all tests:

```bash
npx playwright test
```

Run with UI:

```bash
npx playwright test --ui
```

---

## 📁 Project structure

```
/pages
  LoginPage.ts
  ProductsPage.ts
  CartPage.ts
  CheckoutPage.ts

/tests
  checkout.spec.ts

playwright.config.ts
```

---

## 🧪 What is validated

The framework validates:

* Successful login
* Product visibility
* Cart contents
* Checkout completion
* Order confirmation

All assertions live in the **spec layer**, never inside Page Objects.

---

## 🧩 Why this matters

Modern QA is moving toward **AI-assisted engineering**.

This project demonstrates:

* How to use AI responsibly
* How to prevent architectural drift
* How to ensure tests still represent real product behavior

**AI generates. Humans decide.**