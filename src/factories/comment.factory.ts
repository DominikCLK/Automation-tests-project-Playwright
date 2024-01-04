import { AddCommentModel } from '../models/comment.model';
import { faker } from '@faker-js/faker/locale/en';

export function prepareRandomComment(bodySentences = 5): AddCommentModel {
  const body = faker.lorem.sentences(bodySentences);

  const newComment: AddCommentModel = { body: body };

  return newComment;
}
