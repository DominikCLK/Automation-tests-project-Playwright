import { expect, test } from '@playwright/test';

test.describe('Replace requests', () => {
  test('modify whole request data', async ({ page }) => {
    // Arrange:
    const getWeatherButtonSelector = 'get-weather';
    const commentSelector = 'comment';
    const getWeatherButtonLocator = page.getByTestId(getWeatherButtonSelector);
    const commentLocator = page.getByTestId(commentSelector);
    const expectedCity = 'Hong Kong';

    await page.goto('/practice/random-weather-v2.html');

    await page.route('/api/v1/data/random/weather-simple', async (route) => {
      await route.continue({
        postData: { city: expectedCity, futuredays: '10', days: 1 },
      });
    });

    // Act:
    await getWeatherButtonLocator.click();

    // Assert:
    await expect(commentLocator).toContainText(expectedCity);
  });

  test('modify part of request data', async ({ page }) => {
    // Arrange:
    const getWeatherButtonSelector = 'get-weather';
    const commentSelector = 'comment';
    const getWeatherButtonLocator = page.getByTestId(getWeatherButtonSelector);
    const commentLocator = page.getByTestId(commentSelector);
    const expectedCity = 'Hong Kong';

    await page.goto('/practice/random-weather-v2.html');

    await page.route(
      '/api/v1/data/random/weather-simple',
      async (route, request) => {
        const body = JSON.parse(request.postData() || '{}');
        body.city = expectedCity;
        await route.continue({ postData: body });
      },
    );

    // Act:
    await getWeatherButtonLocator.click();

    // Assert:
    await expect(commentLocator).toContainText(expectedCity);
  });
});
