import { test } from "@playwright/test";
import { SwagLabsLoginPage } from "../page-objects/pages/SwagLabsLoginPage";
import { InventoryPage } from "../page-objects/pages/InventoryPage";
import { CartPage } from "../page-objects/pages/CartPage";

test("BG1-4 check cart container", async ({ page }) => {
  const swagLabsLoginPage = new SwagLabsLoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);
  await swagLabsLoginPage.open();
  await swagLabsLoginPage.login();
  await inventoryPage.open();
  await inventoryPage.shoppingCartButton.click();
  await cartPage.open();
  await cartPage.checkCardPage();
  await cartPage.checkFooterAttached();
});

test("BG1-5 check sorting functionality", async ({ page }) => {
  const swagLabsLoginPage = new SwagLabsLoginPage(page);
  const inventoryPage = new InventoryPage(page);
  await swagLabsLoginPage.open();
  await swagLabsLoginPage.login();
  await inventoryPage.open();
  await inventoryPage.checkSortByNameAZFunctionality();
  await inventoryPage.checkSortByNameZAFunctionality();
  await inventoryPage.checkSortByPriceLowToHighFunctionality();
  await inventoryPage.checkSortByPriceHighToLowFunctionality();
});
