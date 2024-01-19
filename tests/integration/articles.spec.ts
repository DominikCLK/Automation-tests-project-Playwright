import { prepareRandomArticle } from '@_src/factories/articles.factory';
import { ArticlePage } from '@_src/pages/article.page';
import { ArticlesPage } from '@_src/pages/articles.page';
import { AddArticleView } from '@_src/views/add-articles.view';
import { expect, test } from '@playwright/test';

test.describe('Verify articles', () => {
  let articlesPage: ArticlesPage;
  let addArticleView: AddArticleView;

  test.beforeEach(async ({ page }) => {
    articlesPage = new ArticlesPage(page);
    addArticleView = new AddArticleView(page);

    await articlesPage.goto();
    await articlesPage.addArticleButtonLogged.click();

    await expect.soft(addArticleView.addNewHeader).toBeVisible();
  });

  test('reject creating article without title @GAD-R04-01 @logged', async () => {
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

  test('reject creating article without body @GAD-R04-01 @logged', async () => {
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
    test('reject creating article with title exceeding 128 signs @GAD-R04-02 @logged', async () => {
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
      page,
    }) => {
      // Arrange
      const articlePage = new ArticlePage(page);
      const articleData = prepareRandomArticle(128);

      // Act
      await addArticleView.createArticle(articleData);

      // Assert
      await expect.soft(articlePage.articleTitle).toHaveText(articleData.title);
    });
  });
});