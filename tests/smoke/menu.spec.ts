import { ArticlesPage } from '../../src/pages/articles.page';
import { CommentsPage } from '../../src/pages/comments.page';
import { HomePage } from '../../src/pages/home.page';
import { expect, test } from '@playwright/test';

test.describe('Verify main menu buttons', () => {
  test('comments button navigates to comments page @GAD-R01-03', async ({
    page,
  }) => {
    // Arrange
    const articlesPage = new ArticlesPage(page);
    const expectedCommentsTitle = 'Comments';

    // Act
    await articlesPage.goto();
    await articlesPage.mainMenu.commentButton.click();
    const commentsPage = new CommentsPage(page);
    const title = await commentsPage.getTitle();

    // Assert
    expect(title).toContain(expectedCommentsTitle);
  });

  test('articles button navigates to articles page @GAD-R01-03', async ({
    page,
  }) => {
    // Arrange
    const commentsPage = new CommentsPage(page);
    const expectedArticlesTitle = 'Articles';

    // Act
    await commentsPage.goto();
    await commentsPage.mainMenu.articlesButton.click();
    const articlesPage = new ArticlesPage(page);
    const title = await articlesPage.getTitle();

    // Assert
    expect(title).toContain(expectedArticlesTitle);
  });

  test('home page button navigates to home page @GAD-R01-03', async ({
    page,
  }) => {
    // Arrange
    const commentsPage = new CommentsPage(page);
    const expectedHomePageTitle = 'GAD';

    // Act
    await commentsPage.goto();
    await commentsPage.mainMenu.homePage.click();
    const homePage = new HomePage(page);
    const title = await homePage.getTitle();

    // Assert
    expect(title).toContain(expectedHomePageTitle);
  });
});
