import { expect, test } from '@_src/fixtures/merge.fixture';

test.describe('Verify main menu buttons', () => {
  test('comments button navigates to comments page @GAD-R01-03', async ({
    articlesPage,
  }) => {
    // Arrange
    const expectedCommentsTitle = 'Comments';

    // Act
    await articlesPage.goto();
    const commentsPage = await articlesPage.mainMenu.clickCommentsButton();
    const title = await commentsPage.getTitle();

    // Assert
    expect(title).toContain(expectedCommentsTitle);
  });

  test('articles button navigates to articles page @GAD-R01-03', async ({
    commentsPage,
  }) => {
    // Arrange
    const expectedArticlesTitle = 'Articles';

    // Act
    await commentsPage.goto();
    const articlesPage = await commentsPage.mainMenu.clickArticlesButton();
    const title = await articlesPage.getTitle();

    // Assert
    expect(title).toContain(expectedArticlesTitle);
  });

  test('home page button navigates to home page @GAD-R01-03', async ({
    articlesPage,
  }) => {
    // Arrange
    const expectedHomePageTitle = 'GAD';

    // Act
    const homePage = await articlesPage.mainMenu.clickHomePageLink();
    const title = await homePage.getTitle();

    // Assert
    expect(title).toContain(expectedHomePageTitle);
  });
});
