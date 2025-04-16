import {Locator, Page} from "@playwright/test";
import {Button} from "../atoms/Button";
import {Input} from "../atoms/Input";

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
        this.loginLogo = this.page.locator('.login_logo');
        this.usernameInput = new Input(page, '#user-name');
        this.passwordInput = new Input(page, '#password');
        this.loginButton = new Button(page, '#login-button');
        this.errorMessage = this.page.locator('[data-test="error"]');
        this.errorMessageCloseButton = new Button(page, '.error-button');
    }

    async open(): Promise<void> {
        await this.page.goto(url);
    }

}