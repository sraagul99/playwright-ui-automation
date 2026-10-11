import { test, expect } from '@playwright/test';
import { DashboardPage } from '../../src/pages/DashboardPage';
import { LoginPage } from '../../src/pages/LoginPage';

test.describe('Authentication', () => {
  test('renders the login form', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();

    await expect(page.getByRole('heading', { name: 'Login', exact: true })).toBeVisible();
    await expect(loginPage.usernameInput).toBeEditable();
    await expect(loginPage.passwordInput).toBeEditable();
    await expect(loginPage.loginButton).toBeEnabled();
  });

  test('validates empty username and password', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.loginButton.click();

    await expect(page.locator('.oxd-input-field-error-message')).toHaveCount(2);
    await expect(page).toHaveURL(/\/auth\/login/);
  });

  test('masks the password value', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.passwordInput.fill('NotARealPassword');

    await expect(loginPage.passwordInput).toHaveAttribute('type', 'password');
  });

  test('shows an error for invalid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login('invalid.portfolio.user', 'invalid-password');

    await expect(loginPage.loginError).toContainText('Invalid credentials');
    await expect(page).toHaveURL(/\/auth\/login/);
  });

  test('allows the configured demo account to reach the dashboard', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login(
      process.env.ORANGEHRM_USERNAME ?? 'Admin',
      process.env.ORANGEHRM_PASSWORD ?? 'admin123',
    );

    await new DashboardPage(page).expectLoaded();
  });
});
