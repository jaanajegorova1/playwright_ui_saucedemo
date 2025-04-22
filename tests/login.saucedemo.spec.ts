import { test } from "@playwright/test";
import { SwagLabsLoginPage } from "../page-objects/pages/SwagLabsLoginPage";
import { InventoryPage } from "../page-objects/pages/InventoryPage";

test("BG1-1 check login with empty credentials fields", async ({ page }) => {
  const swagLabsLoginPage = new SwagLabsLoginPage(page);
  await swagLabsLoginPage.open();
  await swagLabsLoginPage.loginButton.click();
  await swagLabsLoginPage.emptyCredentialsErrorCheck();
  await swagLabsLoginPage.loginButton.checkVisible();
  await swagLabsLoginPage.errorMessageCloseButton.click();
  await swagLabsLoginPage.errorMessage.isHidden();
});

test("BG1-2 check login with incorrect credentials", async ({ page }) => {
  const swagLabsLoginPage = new SwagLabsLoginPage(page);
  await swagLabsLoginPage.open();
  await swagLabsLoginPage.notCorrectUsernameLogin();
  await swagLabsLoginPage.incorrectCredentialsErrorCheck();
  await swagLabsLoginPage.loginButton.checkVisible();
  await swagLabsLoginPage.errorMessageCloseButton.click();
  await swagLabsLoginPage.errorMessage.isHidden();
});

test("BG1-3 check login with correct credentials with base functionality", async ({
  page,
}) => {
  const swagLabsLoginPage = new SwagLabsLoginPage(page);
  const inventoryPage = new InventoryPage(page);
  await swagLabsLoginPage.open();
  await swagLabsLoginPage.checkLoginPage();
  await swagLabsLoginPage.login();
  await inventoryPage.open();
  await inventoryPage.checkInventoryPage();
  await inventoryPage.checkOneInventoryItemVisibility();
  await inventoryPage.checkFooterAttached();
});
