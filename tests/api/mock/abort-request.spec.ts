import { expect, test } from '@playwright/test';

test.describe('Abort requests', () => {
  test('abort all weather data requests', async ({ page }) => {
    // Arrange:
    const getWeatherButtonSelector = 'get-weather';
    const weatherTableSelector = 'results-table';
    const getWeatherButtonLocator = page.getByTestId(getWeatherButtonSelector);
    const weatherTableLocator = page.getByTestId(weatherTableSelector);

    await page.goto('/practice/random-weather-v2.html');

    await page.route('/api/v1/data/random/weather-simple', async (route) => {
      await route.abort();
    });

    // Act:
    await getWeatherButtonLocator.click();

    // Assert:
    await expect(weatherTableLocator).not.toBeVisible();
  });

  test('abort all images', async ({ page }) => {
    // Arrange:
    const getWeatherButtonSelector = 'get-weather';
    const weatherTableSelector = 'results-table';
    const getWeatherButtonLocator = page.getByTestId(getWeatherButtonSelector);
    const weatherTableLocator = page.getByTestId(weatherTableSelector);

    await page.route(/(\.png)/, async (route) => {
      await route.abort();
    });

    await page.goto('/practice/random-weather-v2.html');

    // Act:
    await getWeatherButtonLocator.click();

    // Assert:
    await expect(weatherTableLocator).toBeVisible();
  });

  test('abort all requests for styles', async ({ page }) => {
    // Arrange:
    const getWeatherButtonSelector = 'get-weather';
    const weatherTableSelector = 'results-table';
    const getWeatherButtonLocator = page.getByTestId(getWeatherButtonSelector);
    const weatherTableLocator = page.getByTestId(weatherTableSelector);

    await page.route(/(\.css)/, async (route) => {
      await route.abort();
    });

    await page.goto('/practice/random-weather-v2.html');

    // Act:
    await getWeatherButtonLocator.click();

    // Assert:
    await expect(weatherTableLocator).toBeVisible();
  });
});
