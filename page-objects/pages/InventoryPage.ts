import { expect, Locator, Page } from "@playwright/test";
import { Button } from "../atoms/Button";

const url = "https://www.saucedemo.com/inventory.html";

export class InventoryPage {
  readonly page: Page;
  readonly appLogo: Locator;
  readonly title: Locator;
  readonly burgerButton: Button;
  readonly shoppingCartButton: Button;
  readonly inventoryItem5Name: Locator;
  readonly inventoryItem4Name: Locator;
  readonly inventoryItem3Name: Locator;
  readonly inventoryItem2Name: Locator;
  readonly inventoryItem0Name: Locator;
  readonly inventoryItem4Image: Locator;
  readonly inventoryItem4Description: Locator;
  readonly inventoryItem5Price: Locator;
  readonly inventoryItem4Price: Locator;
  readonly inventoryItem3Price: Locator;
  readonly inventoryItem2Price: Locator;
  readonly addToCart0Button: Locator;
  readonly sortDropdown: Locator;
  readonly nameElements: Locator;
  readonly priceElements: Locator;
  readonly footer: Locator;
  readonly socialTwitter: Locator;
  readonly socialFacebook: Locator;
  readonly socialLinkedin: Locator;
  readonly logoutButton: Button;
  readonly removeButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.appLogo = this.page.locator(".app_logo");
    this.title = this.page.locator(".title");
    this.burgerButton = new Button(page, "#react-burger-menu-btn");
    this.shoppingCartButton = new Button(page, ".shopping_cart_container");
    this.inventoryItem5Name = this.page
      .locator("#item_5_title_link")
      .filter({ hasText: "Sauce Labs Fleece Jacket" });
    this.inventoryItem4Name = this.page
      .locator("#item_4_title_link")
      .filter({ hasText: "Sauce Labs Backpack" });
    this.inventoryItem3Name = this.page
      .locator("#item_3_title_link")
      .filter({ hasText: "Test.allTheThings() T-Shirt (Red)" });
    this.inventoryItem2Name = this.page
      .locator("#item_3_title_link")
      .filter({ hasText: "Sauce Labs Onesie" });
    this.inventoryItem0Name = this.page
      .locator("#item_0_title_link")
      .filter({ hasText: "Sauce Labs Bike Light" });
    this.inventoryItem4Image = this.page.locator("#item_4_img_link");
    this.inventoryItem4Description = this.page
      .locator(".inventory_item_desc")
      .filter({
        hasText:
          "carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.",
      });
    this.inventoryItem5Price = this.page
      .locator(".inventory_item_price")
      .filter({ hasText: "49.99" });
    this.inventoryItem4Price = this.page
      .locator(".inventory_item_price")
      .filter({ hasText: "29.99" });
    this.inventoryItem3Price = this.page
      .locator(".inventory_item_price")
      .filter({ hasText: "15.99" })
      .nth(1);
    this.inventoryItem2Price = this.page
      .locator(".inventory_item_price")
      .filter({ hasText: "7.99" });
    this.addToCart0Button = this.page
      .locator(".btn.btn_primary.btn_small.btn_inventory")
      .nth(0);
    this.sortDropdown = this.page.locator(".product_sort_container");
    this.nameElements = this.page.locator(".inventory_item_name");
    this.priceElements = page.locator(".inventory_item_price");
    this.footer = this.page.locator(".footer");
    this.socialTwitter = this.page.locator(".social_twitter");
    this.socialFacebook = this.page.locator(".social_facebook");
    this.socialLinkedin = this.page.locator(".social_linkedin");
    this.logoutButton = new Button(page, "#logout_sidebar_link");
    this.removeButton = this.page
      .locator("#remove-sauce-labs-bike-light")
      .filter({ hasText: "Remove" });
  }

  async open(): Promise<void> {
    await this.page.goto(url);
  }

  async checkInventoryPage(): Promise<void> {
    await this.appLogo.isVisible();
    await expect(this.appLogo).toHaveText("Swag Labs");
    await this.burgerButton.checkVisible();
    await this.shoppingCartButton.checkVisible();
  }

  async checkOneInventoryItemVisibility(): Promise<void> {
    await this.inventoryItem4Name.isVisible();
    await this.inventoryItem4Image.isVisible();
    await this.inventoryItem4Description.isVisible();
    await expect(this.inventoryItem4Price).toBeVisible();
    await this.addToCart0Button.isVisible();
  }

  async checkFooterAttached(): Promise<void> {
    await expect(this.footer).toBeAttached();
    await this.socialTwitter.isVisible();
    await this.socialFacebook.isVisible();
    await this.socialLinkedin.isVisible();
  }

  async checkSortByNameAZFunctionality(): Promise<void> {
    await this.sortDropdown.isVisible();
    await this.sortDropdown.click();
    await this.sortDropdown.selectOption("az");
    const productNames = await this.nameElements.allTextContents();
    console.log("Names on the page:", productNames);
    const sortedNames = [...productNames].sort();
    console.log("Expected sorted (A to Z):", sortedNames);
    expect(productNames).toEqual(sortedNames);

    await this.inventoryItem4Name.isVisible();
    await this.inventoryItem4Price.isVisible();
  }

  async checkSortByNameZAFunctionality(): Promise<void> {
    await this.sortDropdown.isVisible();
    await this.sortDropdown.click();
    await this.sortDropdown.selectOption("za");
    const productNames = await this.nameElements.allTextContents();
    const sortedNames = [...productNames].sort().reverse();
    console.log("Expected sorted (Z to A):", sortedNames);
    expect(productNames).toEqual(sortedNames);

    await this.inventoryItem3Name.isVisible();
    await this.inventoryItem3Price.isVisible();
  }

  async checkSortByPriceLowToHighFunctionality(): Promise<void> {
    await this.sortDropdown.isVisible();
    await this.sortDropdown.click();
    await this.sortDropdown.selectOption("lohi");
    const priceTexts = await this.priceElements.allTextContents();
    const prices = priceTexts.map((price) =>
      parseFloat(price.replace("$", "")),
    );
    console.log("Prices on the page:", prices);
    const sortedPrices = [...prices].sort((a, b) => a - b);
    console.log("Expected sorted (low to high):", sortedPrices);
    expect(prices).toEqual(sortedPrices);

    await this.inventoryItem2Name.isVisible();
    await this.inventoryItem2Price.isVisible();
  }

  async checkSortByPriceHighToLowFunctionality(): Promise<void> {
    await this.sortDropdown.isVisible();
    await this.sortDropdown.click();
    await this.sortDropdown.selectOption("hilo");
    const priceTexts = await this.priceElements.allTextContents();
    const prices = priceTexts.map((price) =>
      parseFloat(price.replace("$", "")),
    );
    console.log("Prices on the page:", prices);
    const sortedPrices = [...prices].sort((a, b) => b - a);
    console.log("Expected sorted (high to low):", sortedPrices);
    expect(prices).toEqual(sortedPrices);

    await this.inventoryItem5Name.isVisible();
    await this.inventoryItem5Price.isVisible();
  }

  async checkInventoryPageTitle(): Promise<void> {
    await this.title.isVisible();
    await expect(this.title).toContainText("Products");
  }

  async logout(): Promise<void> {
    await this.burgerButton.click();
    await this.logoutButton.click();
  }
}
