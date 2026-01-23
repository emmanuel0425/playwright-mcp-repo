import { test as base, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import { LoginPage } from '../pages/LoginPage';

/**
 * Maps each parallel worker to its own storageState file.
 * Each worker must use a separate account/session.
 */
function statePathForWorker(workerIndex: number) {
  if (workerIndex === 0) {
    return path.join(process.cwd(), 'playwright/.auth/user.json');
  }
  if (workerIndex === 1) {
    return path.join(process.cwd(), 'playwright/.auth/visual-user.json');
  }

  throw new Error(
    `No storageState mapped for worker ${workerIndex}. Reduce workers or add users.`,
  );
}

/**
 * Returns credentials for the given worker.
 * Credentials are injected via environment variables.
 */
function credsForWorker(workerIndex: number) {
  if (workerIndex === 0) {
    if (!process.env.USERNAME || !process.env.PASSWORD) {
      throw new Error('Missing USERNAME / PASSWORD');
    }
    return { username: process.env.USERNAME, password: process.env.PASSWORD };
  }

  if (workerIndex === 1) {
    if (!process.env.VISUAL_USERNAME || !process.env.VISUAL_PASSWORD) {
      throw new Error('Missing VISUAL_USERNAME / VISUAL_PASSWORD');
    }
    return {
      username: process.env.VISUAL_USERNAME,
      password: process.env.VISUAL_PASSWORD,
    };
  }

  throw new Error(
    `No credentials mapped for worker ${workerIndex}. Reduce workers or add users.`,
  );
}

/**
 * Ensures the storageState file exists and contains valid JSON.
 * Prevents crashes from partially written auth files.
 */
function isValidJson(filePath: string): boolean {
  try {
    const txt = fs.readFileSync(filePath, 'utf8');
    if (!txt.trim()) return false;
    JSON.parse(txt);
    return true;
  } catch {
    return false;
  }
}

/**
 * Custom Playwright test with worker-scoped authentication.
 *
 * Behavior:
 * - Each worker logs in once per run
 * - Auth is reused across tests in that worker
 * - Auth files are deleted when the worker finishes
 *   → next run always starts with fresh auth
 */
export const test = base.extend<{}, { storageStatePath: string }>({
  storageStatePath: [
    async ({ browser }, use, testInfo) => {
      const baseURL = process.env.BASE_URL;
      if (!baseURL) throw new Error('Missing BASE_URL');

      // Use parallelIndex (0..workers-1), not workerIndex
      const workerIndex = testInfo.parallelIndex;
      const statePath = statePathForWorker(workerIndex);
      const tmpPath = `${statePath}.tmp`;

      fs.mkdirSync(path.dirname(statePath), { recursive: true });

      // Rebuild auth if missing or corrupted
      if (!fs.existsSync(statePath) || !isValidJson(statePath)) {
        const { username, password } = credsForWorker(workerIndex);

        const context = await browser.newContext({ baseURL });
        const page = await context.newPage();

        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.login(username, password);
        await page.waitForURL(/inventory\.html/);

        // Atomic write prevents partial JSON
        await context.storageState({ path: tmpPath });
        fs.renameSync(tmpPath, statePath);

        await context.close();
      }

      // Provide auth to tests, then clean up after worker completes
      try {
        await use(statePath);
      } finally {
        try {
          if (fs.existsSync(tmpPath)) fs.unlinkSync(tmpPath);
          if (fs.existsSync(statePath)) fs.unlinkSync(statePath);
        } catch {
          /* best-effort cleanup */
        }
      }
    },
    { scope: 'worker' },
  ],

  /**
   * Fresh authenticated context per test.
   */
  page: async ({ browser, storageStatePath }, use) => {
    const baseURL = process.env.BASE_URL;
    if (!baseURL) throw new Error('Missing BASE_URL');

    const context = await browser.newContext({
      baseURL,
      storageState: storageStatePath,
    });

    const page = await context.newPage();

    // Activate the restored session
    await page.goto('/inventory.html');
    await expect(page).toHaveURL(/inventory\.html/);

    await use(page);
    await context.close();
  },
});

export { expect } from '@playwright/test';
