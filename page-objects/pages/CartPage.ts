import { expect, Locator, Page } from "@playwright/test";
import { Button } from "../atoms/Button";

const url = "https://www.saucedemo.com/cart.html";

export class CartPage {
  readonly page: Page;
  readonly appLogo: Locator;
  readonly title: Locator;
  readonly cartQuantityLabel: Locator;
  readonly cartDescriptionLabel: Locator;
  readonly checkoutButton: Button;
  readonly continueShoppingButton: Button;
  readonly footer: Locator;
  readonly socialTwitter: Locator;
  readonly socialFacebook: Locator;
  readonly socialLinkedin: Locator;

  constructor(page: Page) {
    this.page = page;
    this.appLogo = this.page.locator(".app_logo");
    this.title = this.page.locator(".title");
    this.cartQuantityLabel = this.page.locator(".cart_quantity_label");
    this.cartDescriptionLabel = this.page.locator(".cart_desc_label");
    this.checkoutButton = new Button(page, "#checkout");
    this.continueShoppingButton = new Button(page, "#continue-shopping");
    this.footer = this.page.locator(".footer");
    this.socialTwitter = this.page.locator(".social_twitter");
    this.socialFacebook = this.page.locator(".social_facebook");
    this.socialLinkedin = this.page.locator(".social_linkedin");
  }

  async open(): Promise<void> {
    await this.page.goto(url);
  }

  async checkFooterAttached(): Promise<void> {
    await expect(this.footer).toBeAttached();
    await this.socialTwitter.isVisible();
    await this.socialFacebook.isVisible();
    await this.socialLinkedin.isVisible();
  }
}
