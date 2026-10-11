import { expect, type Locator, type Page } from '@playwright/test';

export class PIMPage {
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly saveButton: Locator;

  constructor(private readonly page: Page) {
    this.firstNameInput = page.locator('input[name="firstName"]');
    this.lastNameInput = page.locator('input[name="lastName"]');
    this.saveButton = page.getByRole('button', { name: 'Save', exact: true });
  }

  async openAddEmployee(): Promise<void> {
    await this.page.getByRole('link', { name: 'PIM', exact: true }).click();
    await this.page.getByRole('link', { name: 'Add Employee', exact: true }).click();
    await expect(this.firstNameInput).toBeVisible();
    await expect(this.lastNameInput).toBeVisible();
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

    const employeeIdInput = this.page
      .locator('.oxd-input-group')
      .filter({ hasText: 'Employee Id' })
      .locator('input');

    await expect(employeeIdInput).toBeVisible();
    await employeeIdInput.fill(employeeId);
    await this.page.getByRole('button', { name: 'Search', exact: true }).click();

    const employeeRow = this.page
      .getByRole('row')
      .filter({ hasText: firstName })
      .filter({ hasText: lastName });

    await expect(employeeRow).toHaveCount(1);
    await employeeRow.locator('button').nth(1).click();
    await this.page
      .getByRole('button', { name: /yes,\s*delete/i })
      .click();
    await expect(employeeRow).toHaveCount(0);
  }
}
