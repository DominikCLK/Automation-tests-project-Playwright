import { expect, test } from '@_src/fixtures/merge.fixture';

test.describe('Verify articles API endpoint @GAD-R08-01 @api', () => {
  test('GET articles return status code 200', async ({ request }) => {
    // Arrange
    const expectedStatusCode = 200;

    const articleUrl = '/api/articles';

    // Act
    const response = await request.get(articleUrl);

    // Assert
    expect(response.status()).toBe(expectedStatusCode);
  });
});
