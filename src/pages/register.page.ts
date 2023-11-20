import { BasePage } from './base.page';
import { Page } from '@playwright/test';

export class RegisterPage extends BasePage {
  url = '/register.html';
  userFirstNameInput = this.page.getByTestId('firstname-input');
  userLastNameInput = this.page.getByTestId('lastname-input');
  userEmailInput = this.page.getByPlaceholder('Enter User Email');
  userPasswordInput = this.page.getByTestId('password-input');
  registerButton = this.page.getByTestId('register-button');

  alertPopup = this.page.getByTestId(`alert-popup`);

  // registerError = ;

  constructor(page: Page) {
    super(page);
  }

  async register(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
  ): Promise<void> {
    await this.userFirstNameInput.fill(firstName);
    await this.userLastNameInput.fill(lastName);
    await this.userEmailInput.fill(email);
    await this.userPasswordInput.fill(password);
    await this.registerButton.click();
  }
}
