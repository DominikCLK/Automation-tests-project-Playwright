import { expect, test } from '@_src/fixtures/merge.fixture';

test.describe('Verify articles API endpoint @GAD-R08-01 @api', () => {
  test('GET articles should return an object with required fields @predefined_data', async ({
    request,
  }) => {
    // Arrange
    const articleUrl = '/api/articles';
    const response = await request.get(articleUrl);

    await test.step('GET articles return status code 200', async () => {
      const expectedStatusCode = 200;
      expect(response.status()).toBe(expectedStatusCode);
    });

    const responseJson = await response.json();

    await test.step('GET articles should return at least one article', async () => {
      const expectedMinArticleCount = 1;

      expect(responseJson.length).toBeGreaterThanOrEqual(
        expectedMinArticleCount,
      );
    });

    await test.step('GET articles return article object', async () => {
      const expectedRequiredFields = [
        'id',
        'user_id',
        'title',
        'body',
        'date',
        'image',
      ];

      // Act
      const article = responseJson[0];

      // Assert
      expectedRequiredFields.forEach((key) => {
        expect.soft(article).toHaveProperty(key);
      });
    });
  });
});
