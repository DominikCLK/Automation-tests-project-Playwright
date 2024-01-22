import { ArticlePage } from '@_src/pages/article.page';
import { ArticlesPage } from '@_src/pages/articles.page';
import { CommentsPage } from '@_src/pages/comments.page';
import { HomePage } from '@_src/pages/home.page';
import { LoginPage } from '@_src/pages/login.page';
import { RegisterPage } from '@_src/pages/register.page';
import { AddArticleView } from '@_src/views/add-articles.view';
import { test as baseTest } from '@playwright/test';

interface Pages {
  articlePage: ArticlePage;
  articlesPage: ArticlesPage;
  addArticleView: AddArticleView;
  commentsPage: CommentsPage;
  homePage: HomePage;
  loginPage: LoginPage;
  registerPage: RegisterPage;
}

export const pageObjectTest = baseTest.extend<Pages>({
  articlePage: async ({ page }, use) => {
    const articlePage = new ArticlePage(page);
    await articlePage.goto();
    await use(articlePage);
  },
  articlesPage: async ({ page }, use) => {
    const articlesPage = new ArticlesPage(page);
    await articlesPage.goto();
    await use(articlesPage);
  },
  addArticleView: async ({ articlesPage }, use) => {
    const addArticleView = await articlesPage.clickAddArticleButtonLogged();
    await use(addArticleView);
  },
  commentsPage: async ({ page }, use) => {
    const commentsPage = new CommentsPage(page);
    await use(commentsPage);
  },
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await use(homePage);
  },
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },
  registerPage: async ({ page }, use) => {
    const registerPage = new RegisterPage(page);
    await use(registerPage);
  },
});
