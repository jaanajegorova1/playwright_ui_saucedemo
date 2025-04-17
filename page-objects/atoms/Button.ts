import { expect, Locator, Page } from "@playwright/test";

export class Button {
  readonly page: Page;
  readonly buttonLocator: Locator;

  constructor(page: Page, selector: string) {
    this.page = page;
    this.buttonLocator = page.locator(selector);
  }

  async checkVisible(): Promise<void> {
    await expect(this.buttonLocator).toBeVisible();
  }

  async checkNotVisible(): Promise<void> {
    await expect(this.buttonLocator).toBeHidden();
  }

  async click(): Promise<void> {
    await this.buttonLocator.click();
  }
}
