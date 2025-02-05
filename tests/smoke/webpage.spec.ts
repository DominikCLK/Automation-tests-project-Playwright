import { expect, test } from '@_src/fixtures/merge.fixture';

test.describe('Verify service main pages', () => {
  test('home page title @GAD-R01-01', async ({ homePage }) => {
    // Arrange
    const expectedHomeTitle = 'GAD';

    // Act
    await homePage.goto();

    // Assert
    const title = await homePage.getTitle();
    expect(title).toContain(expectedHomeTitle);
  });

  test('article page title @GAD-R01-02', async ({ articlesPage }) => {
    // Arrange
    const expectedArticlesTitle = 'Articles';

    // Act
    await articlesPage.goto();

    // Assert
    const title = await articlesPage.getTitle();
    expect(title).toContain(expectedArticlesTitle);
  });

  test('comments page title @GAD-R01-02', async ({ commentsPage }) => {
    // Arrange
    const expectedCommentsTitle = 'Comments';

    // Act
    await commentsPage.goto();

    // Assert
    const title = await commentsPage.getTitle();
    expect(title).toContain(expectedCommentsTitle);
  });

  test('home page title simple', async ({ page }) => {
    // Act
    await page.goto('/');

    // Assert
    await expect(page).toHaveTitle(/GAD/);
  });
});
