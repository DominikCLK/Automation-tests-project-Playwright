import { expect, test } from '@playwright/test';

test.describe('Test Weather Data - filter responses by code and text', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/practice/random-weather-v2.html');
  });

  test('mock responses for weather with 404', async ({ page }) => {
    // Arrange:
    const getWeatherButtonSelector = 'get-weather';
    const weatherTableSelector = 'results-table';
    const errorMessageSelector = 'error-message';

    const getWeatherButtonLocator = page.getByTestId(getWeatherButtonSelector);
    const weatherTableLocator = page.getByTestId(weatherTableSelector);
    const errorMessageLocator = page.getByTestId(errorMessageSelector);

    await page.route('/api/v1/data/random/weather-simple', async (route) => {
      await route.fulfill({
        status: 404,
        body: 'Please check your request and try again',
      });
    });

    // Act:
    await getWeatherButtonLocator.click();

    // Assert:
    await expect.soft(weatherTableLocator).toBeHidden();
    await expect.soft(errorMessageLocator).toBeVisible();
  });

  test('mock response for Warsaw in response', async ({ page }) => {
    // Arrange:
    const getWeatherButtonSelector = 'get-weather';
    const weatherTableSelector = 'results-table';
    const errorMessageSelector = 'error-message';
    const selectCitySelector = 'city';

    const getWeatherButtonLocator = page.getByTestId(getWeatherButtonSelector);
    const weatherTableLocator = page.getByTestId(weatherTableSelector);
    const errorMessageLocator = page.getByTestId(errorMessageSelector);
    const selectCityLocator = page.getByTestId(selectCitySelector);

    await page.route('/api/v1/data/random/weather-simple', async (route) => {
      if (route.request().postData()?.includes('Warsaw')) {
        await route.fulfill({
          status: 404,
          body: 'Please check your request and try again',
        });
      } else {
        await route.continue();
      }
    });

    // Act:
    await getWeatherButtonLocator.click();

    // Assert:
    await expect.soft(weatherTableLocator).toBeHidden();
    await expect.soft(errorMessageLocator).toBeVisible();

    // Act
    await selectCityLocator.selectOption({ value: 'Berlin' });
    await getWeatherButtonLocator.click();

    // Assert:
    await expect.soft(weatherTableLocator).toBeVisible();
    await expect.soft(errorMessageLocator).toBeHidden();
  });

  test('mock response for response code 200', async ({ page }) => {
    // Arrange:
    const getWeatherButtonSelector = 'get-weather';
    const weatherTableSelector = 'results-table';
    const errorMessageSelector = 'error-message';
    const selectCitySelector = 'city';

    const getWeatherButtonLocator = page.getByTestId(getWeatherButtonSelector);
    const weatherTableLocator = page.getByTestId(weatherTableSelector);
    const errorMessageLocator = page.getByTestId(errorMessageSelector);
    const selectCityLocator = page.getByTestId(selectCitySelector);

    await page.route('/api/v1/data/random/weather-simple', async (route) => {
      const response = await route.fetch();
      if (response.status() === 200) {
        await route.fulfill({
          status: 404,
          body: 'Please check your request and try again',
        });
      } else {
        await route.continue();
      }
    });

    // Act:
    await getWeatherButtonLocator.click();

    // Assert:
    await expect.soft(weatherTableLocator).toBeHidden();
    await expect.soft(errorMessageLocator).toBeVisible();

    // Act
    await selectCityLocator.selectOption({ value: 'Berlin' });
    await getWeatherButtonLocator.click();

    // Assert:
    await expect.soft(weatherTableLocator).toBeHidden();
    await expect.soft(errorMessageLocator).toBeVisible();
  });
});
