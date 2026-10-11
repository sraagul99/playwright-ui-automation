import { expect, type Page } from '@playwright/test';

export type CoreModule = 'PIM' | 'Leave' | 'Time' | 'Recruitment';

const modulePaths: Record<CoreModule, RegExp> = {
  PIM: /\/pim\//,
  Leave: /\/leave\//,
  Time: /\/time\//,
  Recruitment: /\/recruitment\//,
};

export class DashboardPage {
  constructor(private readonly page: Page) {}

  async expectLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(/\/dashboard\/index/);
    await expect(
      this.page.getByRole('heading', { name: 'Dashboard', exact: true }),
    ).toBeVisible();
  }

  async openModule(moduleName: CoreModule): Promise<void> {
    await this.page
      .getByRole('link', { name: moduleName, exact: true })
      .click();
    await expect(this.page).toHaveURL(modulePaths[moduleName]);
  }
}
