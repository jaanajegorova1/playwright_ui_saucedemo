import { test } from "@playwright/test";
import { SwagLabsLoginPage } from "../page-objects/pages/SwagLabsLoginPage";
import { InventoryPage } from "../page-objects/pages/InventoryPage";
import { CartPage } from "../page-objects/pages/CartPage";

test("BG1-7 check e2e test. Buy some item", async ({ page }) => {
  const swagLabsLoginPage = new SwagLabsLoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);
  await swagLabsLoginPage.open();
  await swagLabsLoginPage.login();
  await inventoryPage.open();
  await inventoryPage.inventoryItem0Name.isVisible();
  await inventoryPage.inventoryItem0Name.click();
  await cartPage.checkAddToCartFunctionality();
  await cartPage.checkRemoveFromCartFunctionality();
  await cartPage.backToProductsButton.click();
  await inventoryPage.checkInventoryPageTitle();
  await inventoryPage.logout();
  await swagLabsLoginPage.usernameInput.checkVisible();
});
