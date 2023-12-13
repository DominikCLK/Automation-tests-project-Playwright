import { LoginUserModel } from '../src/models/user.model';
import { LoginPage } from '../src/pages/login.page';
import { WelcomePage } from '../src/pages/welcome.page';
import { testUser1 } from '../src/test-data/user.data';
import { expect, test } from '@playwright/test';

test.describe('Verify login', () => {
  test('Login with correct credentials @GAD-R02-01', async ({ page }) => {
    // Arrange
    const loginPage = new LoginPage(page);

    // Act
    await loginPage.goto();
    await loginPage.login(testUser1);

    const welcomePage = new WelcomePage(page);
    const title = await welcomePage.title();

    //Assert
    expect(title).toContain('Welcome');
    await expect(page).toHaveURL(welcomePage.url);
  });

  test('reject login with incorrect password @GAD-R02-01', async ({ page }) => {
    // Arrange
    const loginUserData: LoginUserModel = {
      userEmail: testUser1.userEmail,
      userPassword: 'incorrectPassword',
    };

    const loginPage = new LoginPage(page);

    // Act
    await loginPage.goto();
    await loginPage.login(loginUserData);

    //Assert
    await expect
      .soft(loginPage.loginError)
      .toHaveText('Invalid username or password');

    const title = await loginPage.title();
    expect.soft(title).toContain('Login');
  });

  test('reject login with incorrect email @GAD-R02-01', async ({ page }) => {
    // Arrange
    const loginUserData: LoginUserModel = {
      userEmail: 'test@test.test',
      userPassword: testUser1.userPassword,
    };
    const loginPage = new LoginPage(page);

    // Act
    await loginPage.goto();
    await loginPage.login(loginUserData);

    //Assert
    await expect
      .soft(loginPage.loginError)
      .toHaveText('Invalid username or password');

    const title = await loginPage.title();
    expect.soft(title).toContain('Login');
  });
});
