import { expect, type Locator, type Page } from '@playwright/test';

export class PIMPage {
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly employeeIdInput: Locator;
  readonly saveButton: Locator;

  constructor(private readonly page: Page) {
    this.firstNameInput = page.locator('input[name="firstName"]');
    this.lastNameInput = page.locator('input[name="lastName"]');
    this.employeeIdInput = page
      .locator('.oxd-input-group')
      .filter({ hasText: 'Employee Id' })
      .locator('input');
    this.saveButton = page.getByRole('button', { name: 'Save', exact: true });
  }

  async openAddEmployee(): Promise<void> {
    await this.page.getByRole('link', { name: 'PIM', exact: true }).click();
    await this.page.getByRole('link', { name: 'Add Employee', exact: true }).click();
    await expect(this.firstNameInput).toBeVisible();
    await expect(this.lastNameInput).toBeVisible();
    await expect(this.employeeIdInput).toBeVisible();
  }

  async createEmployee(firstName: string, lastName: string): Promise<void> {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.saveButton.click();
  }

  async deleteEmployeeById(
    employeeId: string,
    firstName: string,
    lastName: string,
  ): Promise<void> {
    await this.page.getByRole('link', { name: 'PIM', exact: true }).click();

    // The list filter uses the user-facing Employee Id, which can differ from
    // the internal empNumber in the profile URL. Capture it from the form.
    await expect(this.employeeIdInput).toBeVisible();
    await this.employeeIdInput.fill(employeeId);

    const searchButton = this.page.getByRole('button', { name: 'Search', exact: true });
    const employeeRow = this.page
      .getByRole('row')
      .filter({ hasText: employeeId })
      .filter({ hasText: firstName })
      .filter({ hasText: lastName });

    // The demo list can briefly return "No Records Found" immediately after
    // creation. Retry the targeted search while waiting for the exact record.
    await expect
      .poll(
        async () => {
          await searchButton.click();
          return employeeRow.count();
        },
        {
          message: 'The newly created employee should appear in the filtered list',
          timeout: 15_000,
          intervals: [500, 1_000, 1_500, 2_000],
        },
      )
      .toBe(1);

    await employeeRow.locator('button').nth(1).click();
    await this.page.getByRole('button', { name: /yes,\s*delete/i }).click();
    await expect(employeeRow).toHaveCount(0);
  }
}
