import { prepareRandomArticle } from '@_src/factories/articles.factory';
import { expect, test } from '@_src/fixtures/merge.fixture';

test.describe('Verify articles', () => {
  test('reject creating article without title @GAD-R04-01 @logged', async ({
    addArticleView,
  }) => {
    // Arrange
    const expectedErrorMessage = 'Article was not created';
    const articleData = prepareRandomArticle();
    articleData.title = '';

    // Act
    await addArticleView.createArticle(articleData);

    // Assert
    await expect(addArticleView.errorAlertPopup).toHaveText(
      expectedErrorMessage,
    );
  });

  test('reject creating article without body @GAD-R04-01 @logged', async ({
    addArticleView,
  }) => {
    // Arrange
    const expectedErrorMessage = 'Article was not created';
    const articleData = prepareRandomArticle();
    articleData.body = '';

    // Act
    await addArticleView.createArticle(articleData);

    // Assert
    await expect(addArticleView.errorAlertPopup).toHaveText(
      expectedErrorMessage,
    );
  });

  test.describe('title length', () => {
    test('reject creating article with title exceeding 128 signs @GAD-R04-02 @logged', async ({
      addArticleView,
    }) => {
      // Arrange
      const expectedErrorMessage = 'Article was not created';
      const articleData = prepareRandomArticle(129);

      // Act
      await addArticleView.createArticle(articleData);

      // Assert
      await expect(addArticleView.errorAlertPopup).toHaveText(
        expectedErrorMessage,
      );
    });

    test('create article with title with 128 signs @GAD-R04-02 @logged', async ({
      addArticleView,
    }) => {
      // Arrange
      const articleData = prepareRandomArticle(128);

      // Act
      const articlePage = await addArticleView.createArticle(articleData);

      // Assert
      await expect.soft(articlePage.articleTitle).toHaveText(articleData.title);
    });
  });
});
