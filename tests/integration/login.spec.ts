import { expect, test } from '@_src/fixtures/merge.fixture';
import { LoginUserModel } from '@_src/models/user.model';
import { invalidTestUser1, testUser1 } from '@_src/test-data/user.data';

test.describe('Verify login', () => {
  test('Login with correct credentials @GAD-R02-01', async ({
    page,
    loginPage,
  }) => {
    // Arrange
    const expectedWelcomeTitle = 'Welcome';

    // Act
    await loginPage.goto();
    const welcomePage = await loginPage.login(testUser1);
    const title = await welcomePage.getTitle();

    //Assert
    expect(title).toContain(expectedWelcomeTitle);
    await expect(page).toHaveURL(welcomePage.url);
  });

  test('reject login with incorrect password @GAD-R02-01', async ({
    loginPage,
  }) => {
    // Arrange
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

  test('reject login with incorrect email @GAD-R02-01', async ({
    loginPage,
  }) => {
    // Arrange
    const loginUserData: LoginUserModel = {
      userEmail: invalidTestUser1.invalidUserEmail,
      userPassword: testUser1.userPassword,
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
});
