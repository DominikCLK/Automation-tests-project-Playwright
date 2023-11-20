import { LoginPage } from '../src/pages/login.page';
import { RegisterPage } from '../src/pages/register.page';
import { WelcomePage } from '../src/pages/welcome.page';
import { faker } from '@faker-js/faker/locale/en';
import { expect, test } from '@playwright/test';

test.describe('Verify register', () => {
  test('register with correct data and login @GAD-R03-01', async ({ page }) => {
    const userFirstName = faker.person.firstName().replace(/[^A-Za-z]/g, '');
    const userLastName = faker.person.lastName().replace(/[^A-Za-z]/g, '');
    // const userEmail = `jntest${new Date().getTime()}@test.test1`;
    const userEmail = faker.internet.email({
      firstName: userFirstName,
      lastName: userLastName,
    });
    const userPassword = faker.internet.password();

    const registerPage = new RegisterPage(page);

    // Act
    await registerPage.goto();
    await registerPage.register(
      userFirstName,
      userLastName,
      userEmail,
      userPassword,
    );

    const expectedAlertText = `User created`;

    // Assert
    await expect(registerPage.alertPopup).toHaveText(expectedAlertText);
    const loginPage = new LoginPage(page);
    await loginPage.waitForPageToLoadUrl();
    const titleLogin = await loginPage.title();
    expect.soft(titleLogin).toContain('Login');

    // Assert
    await loginPage.login(userEmail, userPassword);

    const welcomePage = new WelcomePage(page);
    const titleWelcome = await welcomePage.title();
    expect(titleWelcome).toContain('Welcome');
  });
});
