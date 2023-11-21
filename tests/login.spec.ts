import { LoginUser } from '../src/models/user.models';
import { LoginPage } from '../src/pages/login.page';
import { WelcomePage } from '../src/pages/welcome.page';
import { testUser1 } from '../src/test-data/user.data';
import { expect, test } from '@playwright/test';

test.describe('Verify login', () => {
  test('Login with correct credentials @GAD-R02-01', async ({ page }) => {
    // Arrange
    const userEmail = testUser1.userEmail;
    const userPassword = testUser1.userPassword;
    const loginPage = new LoginPage(page);

    // Act
    await loginPage.goto();
    await loginPage.login(userEmail, userPassword);

    const welcomePage = new WelcomePage(page);
    const title = await welcomePage.title();

    //Assert
    expect(title).toContain('Welcome');
    await expect(page).toHaveURL(welcomePage.url);
  });

  test('Login with correct credentials using interface model @GAD-R02-01', async ({
    page,
  }) => {
    // Arrange
    const loginUserData: LoginUser = {
      userEmail: testUser1.userEmail,
      userPassword: testUser1.userPassword,
    };

    const loginPage = new LoginPage(page);

    // Act
    await loginPage.goto();
    await loginPage.loginNew(loginUserData);

    const welcomePage = new WelcomePage(page);
    const title = await welcomePage.title();

    //Assert
    expect(title).toContain('Welcome');
    await expect(page).toHaveURL(welcomePage.url);
  });

  test('reject login with incorrect password @GAD-R02-01', async ({ page }) => {
    // Arrange
    const userEmail = testUser1.userEmail;
    const userPassword = testUser1.incorrectUserPassword;
    const loginPage = new LoginPage(page);

    // Act
    await loginPage.goto();
    await loginPage.login(userEmail, userPassword);

    //Assert
    await expect
      .soft(loginPage.loginError)
      .toHaveText('Invalid username or password');

    const title = await loginPage.title();
    expect.soft(title).toContain('Login');
  });

  test('reject login with incorrect email @GAD-R02-01', async ({ page }) => {
    // Arrange
    const userEmail = testUser1.userEmail;
    const userPassword = testUser1.incorrectUserEmail;
    const loginPage = new LoginPage(page);

    // Act
    await loginPage.goto();
    await loginPage.login(userEmail, userPassword);

    //Assert
    await expect
      .soft(loginPage.loginError)
      .toHaveText('Invalid username or password');

    const title = await loginPage.title();
    expect.soft(title).toContain('Login');
  });
});
