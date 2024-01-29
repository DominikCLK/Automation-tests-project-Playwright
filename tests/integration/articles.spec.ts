import { prepareRandomArticle } from '@_src/factories/articles.factory';
import { expect, test } from '@_src/fixtures/merge.fixture';
import { waitForResponse } from '@_src/utils/wait.util';

test.describe('Verify articles', () => {
  test('reject creating article without title @GAD-R04-01 @GAD-R07-03 @logged', async ({
    addArticleView,
    page,
  }) => {
    // Arrange
    const expectedErrorMessage = 'Article was not created';
    const expectedResponseCode = 422;

    const articleData = prepareRandomArticle();
    articleData.title = '';
    const responsePromise = waitForResponse({ page, url: '/api/articles' });

    // Act
    await addArticleView.createArticle(articleData);
    const response = await responsePromise;

    // Assert
    await expect(addArticleView.errorAlertPopup).toHaveText(
      expectedErrorMessage,
    );
    expect(response.status()).toBe(expectedResponseCode);
  });

  test('reject creating article without body @GAD-R04-01 @GAD-R07-03 @logged', async ({
    addArticleView,
    page,
  }) => {
    // Arrange
    const expectedErrorMessage = 'Article was not created';
    const expectedResponseCode = 422;

    const articleData = prepareRandomArticle();
    articleData.body = '';

    const responsePromise = waitForResponse({ page, url: '/api/articles' });

    // Act
    await addArticleView.createArticle(articleData);
    const response = await responsePromise;

    // Assert
    await expect(addArticleView.errorAlertPopup).toHaveText(
      expectedErrorMessage,
    );
    expect(response.status()).toBe(expectedResponseCode);
  });

  test.describe('title length', () => {
    test('reject creating article with title exceeding 128 signs @GAD-R04-02 @GAD-R07-03 @logged', async ({
      addArticleView,
      page,
    }) => {
      // Arrange
      const expectedErrorMessage = 'Article was not created';
      const expectedResponseCode = 422;

      const articleData = prepareRandomArticle(129);
      const responsePromise = waitForResponse({ page, url: '/api/articles' });

      // Act
      await addArticleView.createArticle(articleData);
      const response = await responsePromise;

      // Assert
      await expect(addArticleView.errorAlertPopup).toHaveText(
        expectedErrorMessage,
      );
      expect(response.status()).toBe(expectedResponseCode);
    });

    test('create article with title with 128 signs @GAD-R04-02 @GAD-R07-03 @logged', async ({
      addArticleView,
      page,
    }) => {
      // Arrange
      const expectedResponseCode = 201;

      const articleData = prepareRandomArticle(128);
      const responsePromise = waitForResponse({ page, url: '/api/articles' });

      // Act
      const articlePage = await addArticleView.createArticle(articleData);
      const response = await responsePromise;

      // Assert
      await expect.soft(articlePage.articleTitle).toHaveText(articleData.title);
      expect(response.status()).toBe(expectedResponseCode);
    });

    test('should return created article from API @GAD-R07-04 @logged', async ({
      addArticleView,
      page,
    }) => {
      // Arrange
      const articleData = prepareRandomArticle();

      const waitParams = {
        page,
        url: '/api/articles',
        method: 'GET',
        text: articleData.title,
      };

      const responsePromise = waitForResponse(waitParams);

      // Act
      const articlePage = await addArticleView.createArticle(articleData);
      const response = await responsePromise;

      // Assert
      await expect.soft(articlePage.articleTitle).toHaveText(articleData.title);
      expect(response.ok()).toBeTruthy();
    });
  });
});
