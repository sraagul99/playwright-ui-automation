import { test, expect } from '@playwright/test';
import { PIMPage } from '../../src/pages/PIMPage';
import { loginAsConfiguredUser } from '../../src/support/auth';

test.describe('PIM employee management', () => {
  test.beforeEach(async ({ page }) => {
    await loginAsConfiguredUser(page);
  });

  test('validates required employee name fields', async ({ page }) => {
    const pimPage = new PIMPage(page);

    await pimPage.openAddEmployee();
    await pimPage.saveButton.click();

    await expect(page.locator('.oxd-input-field-error-message')).toHaveCount(2);
    await expect(pimPage.firstNameInput).toBeVisible();
    await expect(pimPage.lastNameInput).toBeVisible();
  });

  test('creates, verifies, and removes only the employee created by this test', async ({ page }) => {
    const pimPage = new PIMPage(page);
    const firstName = 'PortfolioQA';
    const lastName = `Test${Date.now().toString().slice(-8)}`;

    await pimPage.openAddEmployee();
    const employeeId = (await pimPage.employeeIdInput.inputValue()).trim();
    expect(employeeId, 'The form should provide a user-facing employee ID').not.toBe('');

    await pimPage.createEmployee(firstName, lastName);

    await expect(page).toHaveURL(/\/pim\/viewPersonalDetails\/empNumber\/\d+/);
    await expect(pimPage.firstNameInput).toHaveValue(firstName);
    await expect(pimPage.lastNameInput).toHaveValue(lastName);

    // Cleanup targets the user-facing ID captured from this new record's form
    // and independently verifies the unique name before deletion.
    await pimPage.deleteEmployeeById(employeeId, firstName, lastName);
  });
});
