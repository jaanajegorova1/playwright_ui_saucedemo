import { expect, test } from "@playwright/test";
import { SwagLabsLoginPage } from "../page-objects/pages/SwagLabsLoginPage";
import { InventoryPage } from "../page-objects/pages/InventoryPage";
import { CartPage } from "../page-objects/pages/CartPage";

test.describe("Saucedemo app tests", async () => {
  test("BG1-1 check login with empty credentials fields", async ({page}) => {
    const swagLabsLoginPage = new SwagLabsLoginPage(page);
    await swagLabsLoginPage.open();
    await swagLabsLoginPage.loginButton.click();
    await swagLabsLoginPage.errorMessage.isVisible();
    await expect(swagLabsLoginPage.errorMessage).toHaveText("Epic sadface: Username is required");
    await swagLabsLoginPage.loginButton.checkVisible();
    await swagLabsLoginPage.errorMessageCloseButton.click();
    await swagLabsLoginPage.errorMessage.isHidden();
  });

  test("BG1-2 check login with incorrect credentials", async ({page}) => {
    const swagLabsLoginPage = new SwagLabsLoginPage(page);
    await swagLabsLoginPage.open();
    await swagLabsLoginPage.usernameInput.fill("test");
    await swagLabsLoginPage.passwordInput.fill("secret_sauce");
    await swagLabsLoginPage.loginButton.click();
    await swagLabsLoginPage.errorMessage.isVisible();
    await expect(swagLabsLoginPage.errorMessage).toHaveText("Epic sadface: Username and password do not match any user in this service");
    await swagLabsLoginPage.loginButton.checkVisible();
    await swagLabsLoginPage.errorMessageCloseButton.click();
    await swagLabsLoginPage.errorMessage.isHidden();
  });

  test("BG1-3 check login with correct credentials with base functionality", async ({page}) => {
    const swagLabsLoginPage = new SwagLabsLoginPage(page);
    const inventoryPage = new InventoryPage(page);
    await swagLabsLoginPage.open();
    await swagLabsLoginPage.loginLogo.isVisible();
    await expect(swagLabsLoginPage.loginLogo).toHaveText("Swag Labs");
    await swagLabsLoginPage.usernameInput.checkVisible();
    await swagLabsLoginPage.passwordInput.checkVisible();
    await swagLabsLoginPage.loginButton.checkVisible();
    await swagLabsLoginPage.usernameInput.fill("standard_user");
    await swagLabsLoginPage.passwordInput.fill("secret_sauce");
    await swagLabsLoginPage.loginButton.click();
    await inventoryPage.open();
    await inventoryPage.appLogo.isVisible();
    await expect(inventoryPage.appLogo).toHaveText("Swag Labs");
    await inventoryPage.burgerButton.checkVisible();
    await inventoryPage.shoppingCartButton.checkVisible();
    await inventoryPage.checkOneInventoryItemVisibility();
    await inventoryPage.checkFooterAttached();
  });

  test("BG1-4 check cart container", async ({ page }) => {
    const swagLabsLoginPage = new SwagLabsLoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    await swagLabsLoginPage.open();
    await swagLabsLoginPage.usernameInput.fill("standard_user");
    await swagLabsLoginPage.passwordInput.fill("secret_sauce");
    await swagLabsLoginPage.loginButton.click();
    await inventoryPage.open();
    await inventoryPage.shoppingCartButton.click();
    await cartPage.open();
    await cartPage.appLogo.isVisible();
    await expect(cartPage.title).toHaveText("Your Cart");
    await cartPage.cartQuantityLabel.isVisible();
    await cartPage.cartDescriptionLabel.isVisible();
    await cartPage.checkoutButton.checkVisible();
    await cartPage.continueShoppingButton.checkVisible();
    await cartPage.checkFooterAttached();
  });

  test("BG1-5 check sorting by Name A to Z) functionality", async ({ page }) => {
    const swagLabsLoginPage = new SwagLabsLoginPage(page);
    const inventoryPage = new InventoryPage(page);
    await swagLabsLoginPage.open();
    await swagLabsLoginPage.usernameInput.fill("standard_user");
    await swagLabsLoginPage.passwordInput.fill("secret_sauce");
    await swagLabsLoginPage.loginButton.click();
    await inventoryPage.open();
    await inventoryPage.checkSortByNameAZFunctionality();
  });

  test("BG1-6 check sorting by Name (Z to A) functionality", async ({ page }) => {
    const swagLabsLoginPage = new SwagLabsLoginPage(page);
    const inventoryPage = new InventoryPage(page);
    await swagLabsLoginPage.open();
    await swagLabsLoginPage.usernameInput.fill("standard_user");
    await swagLabsLoginPage.passwordInput.fill("secret_sauce");
    await swagLabsLoginPage.loginButton.click();
    await inventoryPage.open();
    await inventoryPage.checkSortByNameZAFunctionality();
  });

  test("BG1-7 check sorting by Price (low to high) functionality", async ({ page }) => {
    const swagLabsLoginPage = new SwagLabsLoginPage(page);
    const inventoryPage = new InventoryPage(page);
    await swagLabsLoginPage.open();
    await swagLabsLoginPage.usernameInput.fill("standard_user");
    await swagLabsLoginPage.passwordInput.fill("secret_sauce");
    await swagLabsLoginPage.loginButton.click();
    await inventoryPage.open();
    await inventoryPage.checkSortByPriceLowToHighFunctionality();
  });

  test("BG1-8 check sorting by Price (high to low) functionality", async ({ page }) => {
    const swagLabsLoginPage = new SwagLabsLoginPage(page);
    const inventoryPage = new InventoryPage(page);
    await swagLabsLoginPage.open();
    await swagLabsLoginPage.usernameInput.fill("standard_user");
    await swagLabsLoginPage.passwordInput.fill("secret_sauce");
    await swagLabsLoginPage.loginButton.click();
    await inventoryPage.open();
    await inventoryPage.checkSortByPriceHighToLowFunctionality();;
  });

  test("BG1-9 check logout functionality", async ({ page }) => {
    const swagLabsLoginPage = new SwagLabsLoginPage(page);
    const inventoryPage = new InventoryPage(page);
    await swagLabsLoginPage.open();
    await swagLabsLoginPage.usernameInput.fill("standard_user");
    await swagLabsLoginPage.passwordInput.fill("secret_sauce");
    await swagLabsLoginPage.loginButton.click();
    await inventoryPage.open();
    await inventoryPage.burgerButton.click();
    await inventoryPage.logoutButton.click();
    return swagLabsLoginPage.open();
  });
});
