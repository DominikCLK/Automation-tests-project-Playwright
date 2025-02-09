import { mockedUserData } from '@_src/test-data/mock/mock.data';
import { expect, test } from '@playwright/test';

test.describe('Test user data', () => {
  test('Check username visibility', async ({ page }) => {
    // Arrange:
    const userNameTestId = 'user-full-name';
    const userNameSelector = page.getByTestId(userNameTestId);

    await page.route('/api/v1/data/random/simple-user', async (route) => {
      const response = await route.fetch();
      const json = await response.json();
      await route.fulfill({ json: json });
    });

    // Act:
    await page.goto('/practice/random-simple-user-v1.html');

    // Assert:
    await expect(userNameSelector).toBeVisible();
  });

  test('Check username', async ({ page }) => {
    // Arrange:
    const userNameTestId = 'user-full-name';
    const userNameSelector = page.getByTestId(userNameTestId);
    const expectedUserName = 'John Doe';

    await page.route('/api/v1/data/random/simple-user', async (route) => {
      const response = await route.fetch();
      const json = await response.json();
      await route.fulfill({ json: mockedUserData });
    });

    // Act:
    await page.goto('/practice/random-simple-user-v1.html');

    // Assert:
    await expect(userNameSelector).toHaveText(expectedUserName);
  });

  test.skip('Missing birthdate', async ({ page }) => {
    // Arrange:
    const birthdateTestId = 'user-date-of-birth';
    const birthdateSelector = page.getByTestId(birthdateTestId);
    const expectedBirthdate = '[No Data]';

    await page.route('/api/v1/data/random/simple-user', async (route) => {
      const response = await route.fetch();
      const json = await response.json();
      json.dateOfBirth = undefined;
      await route.fulfill({ json: json });
    });

    // Act:
    await page.goto('/practice/random-simple-user-v1.html');

    // Assert:
    await expect(birthdateSelector).toHaveText(expectedBirthdate);
  });

  test.skip('Birth date 100 years old', async ({ page }) => {
    // Arrange:
    const ageTestId = 'user-age';
    const ageSelector = page.getByTestId(ageTestId);
    const expectedAge = '101';
    const birthDate = '1923-07-06T22:00:00.000Z';

    await page.route('/api/v1/data/random/simple-user', async (route) => {
      const response = await route.fetch();
      const json = await response.json();
      json.dateOfBirth = birthDate;
      await route.fulfill({ json: json });
    });

    // Act:
    await page.goto('/practice/random-simple-user-v1.html');

    // Assert:
    await expect(ageSelector).toHaveText(expectedAge);
  });
});
