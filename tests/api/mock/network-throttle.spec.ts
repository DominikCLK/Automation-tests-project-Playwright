import { expect, test } from '@playwright/test';

test.describe('Test slow response from API (Network Throttle)', () => {
  test('slow down response with route', async ({ page }) => {
    // Arrange:
    const getWeatherButtonSelector = 'get-weather';
    const weatherTableSelector = 'results-table';
    const getWeatherButtonLocator = page.getByTestId(getWeatherButtonSelector);
    const weatherTableLocator = page.getByTestId(weatherTableSelector);

    await page.goto('/practice/random-weather-v2.html');

    await page.route('/api/**', async (route) => {
      await page.waitForTimeout(4000);
      await route.continue();
    });

    // Act:
    await getWeatherButtonLocator.click();

    // Assert:
    await expect(weatherTableLocator).toBeVisible();
  });
});
