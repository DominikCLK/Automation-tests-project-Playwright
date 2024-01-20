import { STORAGE_STATE } from '@_pw-config';
import { LoginPage } from '@_src/pages/login.page';
import { testUser1 } from '@_src/test-data/user.data';
import { expect, test as setup } from '@playwright/test';

setup('Login and save session', async ({ page }) => {
  // Arrange
  const loginPage = new LoginPage(page);
  const expectedWelcomeTitle = 'Welcome';

  // Act
  await loginPage.goto();
  const welcomePage = await loginPage.login(testUser1);

  const title = await welcomePage.getTitle();

  //Assert
  expect(title).toContain(expectedWelcomeTitle);
  await expect(page).toHaveURL(welcomePage.url);

  await page.context().storageState({ path: STORAGE_STATE });
});
