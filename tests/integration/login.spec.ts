import { LoginUserModel } from '../../src/models/user.model';
import { LoginPage } from '../../src/pages/login.page';
import { WelcomePage } from '../../src/pages/welcome.page';
import { invalidTestUser1, testUser1 } from '../../src/test-data/user.data';
import { expect, test } from '@playwright/test';

test.describe('Verify login', () => {
  test('Login with correct credentials @GAD-R02-01', async ({ page }) => {
    // Arrange
    const loginPage = new LoginPage(page);
    const welcomePage = new WelcomePage(page);
    const expectedWelcomeTitle = 'Welcome';

    // Act
    await loginPage.goto();
    await loginPage.login(testUser1);

    const title = await welcomePage.getTitle();

    //Assert
    expect(title).toContain(expectedWelcomeTitle);
    await expect(page).toHaveURL(welcomePage.url);
  });

  test('reject login with incorrect password @GAD-R02-01', async ({ page }) => {
    // Arrange
    const loginPage = new LoginPage(page);
    const loginUserData: LoginUserModel = {
      userEmail: testUser1.userEmail,
      userPassword: invalidTestUser1.invalidUserPassword,
    };

    const expectedLoginTitle = 'Login';

    // Act
    await loginPage.goto();
    await loginPage.login(loginUserData);

    //Assert
    await expect
      .soft(loginPage.loginError)
      .toHaveText('Invalid username or password');

    const title = await loginPage.getTitle();
    expect.soft(title).toContain(expectedLoginTitle);
  });

  test('reject login with incorrect email @GAD-R02-01', async ({ page }) => {
    // Arrange
    const loginUserData: LoginUserModel = {
      userEmail: invalidTestUser1.invalidUserEmail,
      userPassword: testUser1.userPassword,
    };
    const loginPage = new LoginPage(page);
    const expectedLoginTitle = 'Login';

    // Act
    await loginPage.goto();
    await loginPage.login(loginUserData);

    //Assert
    await expect
      .soft(loginPage.loginError)
      .toHaveText('Invalid username or password');

    const title = await loginPage.getTitle();
    expect.soft(title).toContain(expectedLoginTitle);
  });
});
