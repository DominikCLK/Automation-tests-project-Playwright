import { AddArticleModel } from '../models/article.model';
import { faker } from '@faker-js/faker/locale/en';

export function randomNewArticle(
  titleLength?: number,
  bodyParagraphs = 5,
): AddArticleModel {
  let title: string;

  if (titleLength) title = faker.string.alpha(titleLength);
  else title = faker.lorem.sentence();

  const body = faker.lorem.paragraphs(bodyParagraphs);

  const newArticle: AddArticleModel = { title: title, body: body };

  return newArticle;
}
