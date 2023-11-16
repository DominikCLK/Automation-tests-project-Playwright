import { BasePage } from './base.page';
import { Page } from '@playwright/test';

export class ArticlePage extends BasePage {
  url = '/articles.html';
  constructor(page: Page) {
    super(page);
  }
}
