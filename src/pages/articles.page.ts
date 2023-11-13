import { Page } from '@playwright/test';

export class ArticlePage {
  url = '/articles.html';
  constructor(private page: Page) {}

  async goto(): Promise<void> {
    await this.page.goto(this.url);
  }

  async title(): Promise<string> {
    return await this.page.title();
  }
}
