import { AddCommentModel } from '@_src/models/comment.model';
import { ArticlePage } from '@_src/pages/article.page';
import { Page } from '@playwright/test';

export class AddCommentView {
  addNewHeader = this.page.getByRole('heading', { name: 'Add New Comment' });
  bodyInput = this.page.locator('#body');
  saveButton = this.page.getByRole('button', { name: 'Save' });

  constructor(private page: Page) {}

  async createComment(commentData: AddCommentModel): Promise<ArticlePage> {
    await this.bodyInput.fill(commentData.body);
    await this.saveButton.click();

    return new ArticlePage(this.page);
  }
}
