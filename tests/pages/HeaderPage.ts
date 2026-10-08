import { Page, Locator } from '@playwright/test';

export class HeaderPage {
  readonly page: Page;
  readonly searchInput: Locator;
  readonly searchSubmitButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchInput = page.getByPlaceholder('Search');
    this.searchSubmitButton = page.getByRole('button', { name: 'Submit search' });
  }

  async search(query: string) {
    await this.searchInput.fill(query);
    await this.searchSubmitButton.click();
  }
}