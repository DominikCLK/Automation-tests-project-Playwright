import { randomUserData } from '../src/factories/user.factory';
import { RegisterUserModel } from '../src/models/user.model';
import { LoginPage } from '../src/pages/login.page';
import { RegisterPage } from '../src/pages/register.page';
import { WelcomePage } from '../src/pages/welcome.page';
import { expect, test } from '@playwright/test';

test.describe('Verify register', () => {
  let registerPage: RegisterPage;
  let registerUserData: RegisterUserModel;

  test.beforeEach(async ({ page }) => {
    registerPage = new RegisterPage(page);
    registerUserData = randomUserData();
    await registerPage.goto();
  });

  test('register with correct data and login @GAD-R03-01', async ({ page }) => {
    // Arrange

    const loginPage = new LoginPage(page);
    const welcomePage = new WelcomePage(page);
    const expectedAlertText = `User created`;

    // Act
    await registerPage.register(registerUserData);

    // Assert
    await expect(registerPage.alertPopup).toHaveText(expectedAlertText);
    await loginPage.waitForPageToLoadUrl();
    const titleLogin = await loginPage.title();
    expect.soft(titleLogin).toContain('Login');

    // Assert test login
    await loginPage.login({
      userEmail: registerUserData.userEmail,
      userPassword: registerUserData.userPassword,
    });

    const titleWelcome = await welcomePage.title();
    expect(titleWelcome).toContain('Welcome');
  });

  test('not register with incorrect data - not valid email @GAD-R03-04', async () => {
    // Arrange
    const expectedErrorText = `Please provide a valid email address`;
    registerUserData.userEmail = '@$#%';

    // Act
    await registerPage.register(registerUserData);

    // Assert
    await expect(registerPage.emailErrorText).toHaveText(expectedErrorText);
  });

  test('not register with incorrect data - email not provided @GAD-R03-04', async () => {
    // Arrange
    const expectedErrorText = `This field is required`;

    // Act
    await registerPage.userFirstNameInput.fill(registerUserData.userFirstName);
    await registerPage.userLastNameInput.fill(registerUserData.userLastName);
    await registerPage.userPasswordInput.fill(registerUserData.userPassword);
    await registerPage.registerButton.click();

    // Assert
    await expect(registerPage.emailErrorText).toHaveText(expectedErrorText);
  });
});
