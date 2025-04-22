import { expect, Locator, Page } from "@playwright/test";
import { Button } from "../atoms/Button";
import { Input } from "../atoms/Input";

const url = "https://www.saucedemo.com/";

export class SwagLabsLoginPage {
  readonly page: Page;
  readonly loginLogo: Locator;
  readonly usernameInput: Input;
  readonly passwordInput: Input;
  readonly loginButton: Button;
  readonly errorMessage: Locator;
  readonly errorMessageCloseButton: Button;

  constructor(page: Page) {
    this.page = page;
    this.loginLogo = this.page.locator(".login_logo");
    this.usernameInput = new Input(page, "#user-name");
    this.passwordInput = new Input(page, "#password");
    this.loginButton = new Button(page, "#login-button");
    this.errorMessage = this.page.locator('[data-test="error"]');
    this.errorMessageCloseButton = new Button(page, ".error-button");
  }

  async open(): Promise<void> {
    await this.page.goto(url);
  }

  async checkLoginPage(): Promise<void> {
    await this.loginLogo.isVisible();
    await expect(this.loginLogo).toHaveText("Swag Labs");
    await this.usernameInput.checkVisible();
    await this.passwordInput.checkVisible();
    await this.loginButton.checkVisible();
  }
  async login(): Promise<void> {
    await this.usernameInput.fill("standard_user");
    await this.passwordInput.fill("secret_sauce");
    await this.loginButton.click();
  }

  async notCorrectUsernameLogin(): Promise<void> {
    await this.usernameInput.fill("test");
    await this.passwordInput.fill("secret_sauce");
    await this.loginButton.click();
  }

  async incorrectCredentialsErrorCheck(): Promise<void> {
    await this.errorMessage.isVisible();
    await expect(this.errorMessage).toHaveText(
      "Epic sadface: Username and password do not match any user in this service",
    );
  }

  async emptyCredentialsErrorCheck(): Promise<void> {
    await this.errorMessage.isVisible();
    await expect(this.errorMessage).toHaveText(
      "Epic sadface: Username is required",
    );
  }
}
