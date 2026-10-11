import { test } from '@playwright/test';
import { DashboardPage, type CoreModule } from '../../src/pages/DashboardPage';
import { loginAsConfiguredUser } from '../../src/support/auth';

const coreModules: CoreModule[] = ['PIM', 'Leave', 'Time', 'Recruitment'];

test.describe('Core module navigation', () => {
  test.beforeEach(async ({ page }) => {
    await loginAsConfiguredUser(page);
  });

  for (const moduleName of coreModules) {
    test(`opens the ${moduleName} module from the sidebar`, async ({ page }) => {
      await new DashboardPage(page).openModule(moduleName);
    });
  }
});
