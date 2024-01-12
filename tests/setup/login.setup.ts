import { LoginPage } from '../../src/pages/login.page';
import { WelcomePage } from '../../src/pages/welcome.page';
import { testUser1 } from '../../src/test-data/user.data';
import { expect, test as setup } from '@playwright/test';

setup('Login with correct credentials', async ({ page }) => {
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