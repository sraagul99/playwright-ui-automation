import { expect, type Page } from '@playwright/test';
import { DashboardPage } from '../pages/DashboardPage';
import { LoginPage } from '../pages/LoginPage';

export async function loginAsConfiguredUser(page: Page): Promise<void> {
  const username = process.env.ORANGEHRM_USERNAME ?? 'Admin';
  const password = process.env.ORANGEHRM_PASSWORD ?? 'admin123';
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.login(username, password);
  await new DashboardPage(page).expectLoaded();
  await expect(page).not.toHaveURL(/\/auth\/login/);
}
