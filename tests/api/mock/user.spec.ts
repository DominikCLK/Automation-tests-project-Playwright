import { expect, test } from '@playwright/test';

test.describe('Test user data', () => {
  test('Check username visibility', async ({ page }) => {
    // Arrange:
    const userNameTestId = 'user-full-name';
    const userNameSelector = page.getByTestId(userNameTestId);

    await page.route('/api/v1/data/random/simple-user', async (route) => {
      const response = await route.fetch();
      const json = await response.json();
      console.log(json);
      await route.fulfill({ json: json });
    });

    // Act:
    await page.goto('/practice/random-simple-user-v1.html');

    // Assert:
    await expect(userNameSelector).toBeVisible();

    const userName = await userNameSelector.innerText();
    console.log(userName);
  });

  test('Check username', async ({ page }) => {
    // Arrange:
    const userNameTestId = 'user-full-name';
    const userNameSelector = page.getByTestId(userNameTestId);
    const expectedUserName = 'John Doe';

    await page.route('/api/v1/data/random/simple-user', async (route) => {
      const response = await route.fetch();
      const json = await response.json();
      console.log(json);
      await route.fulfill({ json: mockedUserData });
    });

    // Act:
    await page.goto('/practice/random-simple-user-v1.html');

    // Assert:
    await expect(userNameSelector).toHaveText(expectedUserName);
  });

  test('Missing birthdate', async ({ page }) => {
    // Arrange:
    const birthdateTestId = 'user-date-of-birth';
    const birthdateSelector = page.getByTestId(birthdateTestId);
    const expectedBirthdate = '[No Data]';

    await page.route('/api/v1/data/random/simple-user', async (route) => {
      const response = await route.fetch();
      const json = await response.json();
      console.log(json);
      json.dateOfBirth = undefined;
      await route.fulfill({ json: json });
    });

    // Act:
    await page.goto('/practice/random-simple-user-v1.html');

    // Assert:
    await expect(birthdateSelector).toHaveText(expectedBirthdate);
  });

  test('Birth date 100 years old', async ({ page }) => {
    // Arrange:
    const ageTestId = 'user-age';
    const ageSelector = page.getByTestId(ageTestId);
    const expectedAge = '101';
    const birthDate = '1923-07-06T22:00:00.000Z';

    await page.route('/api/v1/data/random/simple-user', async (route) => {
      const response = await route.fetch();
      const json = await response.json();
      console.log(json);
      json.dateOfBirth = birthDate;
      await route.fulfill({ json: json });
    });

    // Act:
    await page.goto('/practice/random-simple-user-v1.html');

    // Assert:
    await expect(ageSelector).toHaveText(expectedAge);
  });
});

const mockedUserData = {
  userId: 'U2636',
  username: 'selinnelson235',
  firstName: 'John',
  lastName: 'Doe',
  email: 'selinnelson235@test.test.com',
  phone: '+845-777-150-7395',
  dateOfBirth: '1980-07-06T22:00:00.000Z',
  profilePicture: '1cfe385c-571f-4047-a717-3df0f4031590.jpg',
  address: {
    street: '566 Lake Street',
    city: 'Hub City',
    postalCode: 92115,
    country: 'South Africa',
  },
  lastLogin: '2022-02-14T23:00:00.000Z',
  accountCreated: '2019-03-21T23:00:00.000Z',
  status: 0,
};
