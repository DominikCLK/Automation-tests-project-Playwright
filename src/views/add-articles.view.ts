import { AddArticleModel } from '@_src/models/article.model';
import { ArticlePage } from '@_src/pages/article.page';
import { Page } from '@playwright/test';

export class AddArticleView {
  addNewHeader = this.page.getByRole('heading', { name: 'Add New Entry' });
  titleInput = this.page.getByTestId('title-input');
  bodyInput = this.page.getByTestId('body-text');
  saveButton = this.page.getByTestId('save');

  errorAlertPopup = this.page.getByTestId('alert-popup');

  constructor(private page: Page) {}

  async createArticle(addArticle: AddArticleModel): Promise<ArticlePage> {
    await this.titleInput.fill(addArticle.title);
    await this.bodyInput.fill(addArticle.body);
    await this.saveButton.click();

    return new ArticlePage(this.page);
  }
}
