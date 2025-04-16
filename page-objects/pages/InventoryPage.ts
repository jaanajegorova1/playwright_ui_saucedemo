import { expect, Locator, Page } from "@playwright/test";
import { Button } from "../atoms/Button";

const url = "https://www.saucedemo.com/inventory.html";

export class InventoryPage {
  readonly page: Page;
  readonly appLogo: Locator;
  readonly burgerButton: Button;
  readonly shoppingCartButton: Button;
  readonly inventoryItem4Name: Locator;
  readonly inventoryItem3Name: Locator;
  readonly inventoryItem4Image: Locator;
  readonly inventoryItem4Description: Locator;
  readonly inventoryItem4Price: Locator;
  readonly inventoryItem3Price: Locator;
  //readonly addToCartButton: Button;
  readonly sortingContainer: Locator;
  readonly footer: Locator;
  readonly socialTwitter: Locator;
  readonly socialFacebook: Locator;
  readonly socialLinkedin: Locator;
  readonly logoutButton: Button;

  constructor(page: Page) {
    this.page = page;
    this.appLogo = this.page.locator(".app_logo");
    this.burgerButton = new Button(page, "#react-burger-menu-btn");
    this.shoppingCartButton = new Button(page, ".shopping_cart_container");
    this.inventoryItem4Name = this.page
      .locator("#item_4_title_link")
      .filter({ hasText: "Sauce Labs Backpack" });
    this.inventoryItem3Name = this.page
      .locator("#item_3_title_link")
      .filter({ hasText: "Test.allTheThings() T-Shirt (Red)" });
    this.inventoryItem4Image = this.page.locator("#item_4_img_link");
    this.inventoryItem4Description = this.page
      .locator(".inventory_item_desc")
      .filter({
        hasText:
          "carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.",
      });
    this.inventoryItem4Price = this.page
      .locator(".inventory_item_price")
      .filter({ hasText: "29.99" });
    this.inventoryItem3Price = this.page
      .locator(".inventory_item_price")
      .filter({ hasText: "15.99" });
    //this.addToCartButton = new Button(page, '#add-to-cart-sauce-labs-backpack');
    this.sortingContainer = this.page.locator(".product_sort_container");
    this.footer = this.page.locator(".footer");
    this.socialTwitter = this.page.locator(".social_twitter");
    this.socialFacebook = this.page.locator(".social_facebook");
    this.socialLinkedin = this.page.locator(".social_linkedin");
    this.logoutButton = new Button(page, "#logout_sidebar_link");
  }

  async open(): Promise<void> {
    await this.page.goto(url);
  }

  async checkOneInventoryItemVisibility(): Promise<void> {
    await this.inventoryItem4Name.isVisible();
    await this.inventoryItem4Image.isVisible();
    await this.inventoryItem4Description.isVisible();
    await expect(this.inventoryItem4Price).toBeVisible();
    //await this.addToCartButton.checkVisible();
  }

  async checkFooterAttached(): Promise<void> {
    await expect(this.footer).toBeAttached();
    await this.socialTwitter.isVisible();
    await this.socialFacebook.isVisible();
    await this.socialLinkedin.isVisible();
  }
}
