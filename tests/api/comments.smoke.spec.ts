import { expect, test } from '@_src/fixtures/merge.fixture';

test.describe('Verify comments API endpoint @GAD-R08-02 @api', () => {
  test.describe('verify each condition in separate test', () => {
    test('GET comments returns status code 200', async ({ request }) => {
      // Arrange
      const expectedStatusCode = 200;

      const commentsUrl = '/api/comments';

      // Act
      const response = await request.get(commentsUrl);

      // Assert
      expect(response.status()).toBe(expectedStatusCode);
    });

    test('GET comments should return at least one comment @predefined_data', async ({
      request,
    }) => {
      // Arrange
      const expectedMinCommentCount = 1;
      const commentsUrl = '/api/comments';

      // Act
      const response = await request.get(commentsUrl);
      const responseJson = await response.json();

      // Assert
      expect(responseJson.length).toBeGreaterThanOrEqual(
        expectedMinCommentCount,
      );
    });

    test('GET comments return comment object @predefined_data', async ({
      request,
    }) => {
      // Arrange
      const commentsUrl = '/api/comments';

      const expectedRequiredFields = [
        'id',
        'article_id',
        'user_id',
        'body',
        'date',
      ];

      // Act
      const response = await request.get(commentsUrl);
      const responseJson = await response.json();
      const comment = responseJson[0];

      // Assert
      expectedRequiredFields.forEach((key) => {
        expect
          .soft(comment, `Expected key '${key}' should be in object`)
          .toHaveProperty(key);
      });
    });
  });
});
