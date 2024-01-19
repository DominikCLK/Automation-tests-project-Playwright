import { AddCommentModel } from '@_src/models/comment.model';
import { CommentPage } from '@_src/pages/comment.page';
import { Page } from '@playwright/test';

export class EditCommentView {
  bodyInput = this.page.locator('#body');
  updateButton = this.page.getByTestId('update-button');

  constructor(private page: Page) {}

  async updateComment(commentData: AddCommentModel): Promise<CommentPage> {
    await this.bodyInput.fill(commentData.body);
    await this.updateButton.click();

    return new CommentPage(this.page);
  }
}
