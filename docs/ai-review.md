```md
**What the AI did well**  
The AI generated a complete, working end-to-end Playwright framework in a very short time. It created Page Objects, locators, specs, and test data with a reasonable structure, and it used modern automation practices such as data-test selectors and Playwright’s native assertions. The flows were functional: login worked, products were added, checkout completed, and confirmation was validated. As a starting point, this was strong and efficient.

---

**What the AI did wrong**  
The AI frequently mixed architectural responsibilities. It placed assertions inside Page Objects, duplicated the login flow across multiple specs, and introduced unnecessary utilities for things that already exist (such as random-data generators). It also produced naming inconsistencies and some fragile selector choices. These are not syntax issues — they are design flaws that affect maintainability, reliability, and clarity.

---

**What should never be delegated to AI**  
AI should never decide what a test means. It should not decide what counts as success, what is a business rule versus a UI detail, or how responsibilities are split between Page Objects, helpers, and specs. Those are product, quality, and engineering decisions. AI can generate code, but it cannot understand intent, risk, or long-term maintenance the way a human QA engineer can.

---

**Human decisions that improved the framework**  
The biggest improvements came from human judgment:  
* Moving assertions out of Page Objects and into specs  
* Removing redundant checks  
* Centralizing login logic instead of duplicating it  
* Choosing what not to test in the checkout flow (for example, not mixing pricing validation into a simple success-path test)  

These decisions transformed a working script into a maintainable test framework.

---

**Current limitations of the MCP**  
The AI can produce syntactically correct code, but it lacks an understanding of architecture, ownership, and long-term cost. It tends to over-abstract, mix concerns, hide business rules inside helpers, generate unnecessary utilities, and duplicate flows instead of structuring them cleanly. It optimizes for “it runs” rather than “this will survive six months of real-world change.”

---

**Lessons learned**  
1. The AI agent only does what it is explicitly told to do. If a rule, pattern, or expectation is not clearly stated in the prompt, it will not be applied consistently.  
2. After improving the first login flow, those improvements were reflected in the second checkout flow, showing that the AI agent adapts based on prior context and begins to learn how the framework should be structured as it goes.  
3. When instructed to prioritize stable selectors, especially data-test attributes, the AI agent produced better locators in the checkout flow. However, it still sometimes fell back to CSS class selectors, showing that selector strategy must be reinforced.  
4. Even after fixing assertion placement in the login flow, the AI agent continued to mix assertions and UI logic in parts of the checkout flow. At the same time, it correctly applied other improvements, which shows that learning is gradual and not all architectural rules are internalized immediately.  
5. The quality of the AI agent’s output is largely determined by how detailed and thoughtful the prompt is. The closer the prompt is to how a human QA engineer thinks about test design, the fewer manual corrections are needed.  
6. AI is extremely strong at speed and scaffolding but weak at test design. It can generate a working framework quickly, but it needs human oversight to ensure separation of concerns, meaningful assertions, and long-term maintainability.  
7. The best results come from using AI as a first-draft generator and then applying human engineering judgment to refine structure, intent, and quality.
```