import { test } from "@playwright/test";
import { SwagLabsLoginPage } from "../page-objects/pages/SwagLabsLoginPage";
import { InventoryPage } from "../page-objects/pages/InventoryPage";

test("BG1-6 check logout functionality", async ({ page }) => {
  const swagLabsLoginPage = new SwagLabsLoginPage(page);
  const inventoryPage = new InventoryPage(page);
  await swagLabsLoginPage.open();
  await swagLabsLoginPage.login();
  await inventoryPage.open();
  await inventoryPage.logout();
  await swagLabsLoginPage.usernameInput.checkVisible();
});
