import { Page } from '@playwright/test';

export class AddArticleView {
  titleInput = this.page.getByTestId('title-input');
  bodyInput = this.page.getByTestId('body-text');
  saveButton = this.page.getByTestId('save');
  header = this.page.getByRole('heading', { name: 'Add New Entry' });

  constructor(private page: Page) {}
}
