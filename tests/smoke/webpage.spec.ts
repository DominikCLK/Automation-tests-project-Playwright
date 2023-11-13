import { ArticlePage } from '../../src/pages/articles.page';
import { CommentsPage } from '../../src/pages/comments.page';
import { HomePage } from '../../src/pages/home.page';
import { expect, test } from '@playwright/test';

test.describe('Verify service main pages', () => {
  test('home page title', async ({ page }) => {
    // Arrange
    const homePage = new HomePage(page);

    // Act
    await homePage.goto();

    // Assert
    const title = await homePage.title();
    expect(title).toContain('GAD');
  });

  test('article page title', async ({ page }) => {
    // Arrange
    const articlesPage = new ArticlePage(page);

    // Act
    await articlesPage.goto();

    // Assert
    const title = await articlesPage.title();
    expect(title).toContain('Articles');
  });

  test('comments page title', async ({ page }) => {
    // Arrange
    const commentsPage = new CommentsPage(page);

    // Act
    await commentsPage.goto();

    // Assert
    const title = await commentsPage.title();
    expect(title).toContain('Comments');
  });

  test('home page title simple', async ({ page }) => {
    // Act
    await page.goto('http://localhost:3000/');

    // Assert
    await expect(page).toHaveTitle(/GAD/);
  });
});
