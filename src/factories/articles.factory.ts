import { AddArticleModel } from '../models/article.model';
import { faker } from '@faker-js/faker/locale/en';

export function randomNewArticle(): AddArticleModel {
  const title = faker.lorem.sentence();
  const body = faker.lorem.paragraphs(5);

  const newArticle: AddArticleModel = { title: title, body: body };

  return newArticle;
}
