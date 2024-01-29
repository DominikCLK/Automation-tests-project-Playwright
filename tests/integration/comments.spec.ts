import { prepareRandomComment } from '@_src/factories/comment.factory';
import { expect, test } from '@_src/fixtures/merge.fixture';
import { waitForResponse } from '@_src/utils/wait.util';

test.describe('Verify comment', () => {
  test('should return created comment @GAD-R07-06 @logged', async ({
    createRandomArticle,
    page,
  }) => {
    // Arrange
    const expectedCommentCreatedPopup = 'Comment was created';

    const newCommentData = prepareRandomComment();
    let articlePage = createRandomArticle.articlePage;
    const addCommentView = await articlePage.clickAddCommentButton();

    const waitParams = {
      page,
      url: '/api/comments',
      method: 'GET',
      text: newCommentData.body,
    };

    const responsePromise = waitForResponse(waitParams);

    // Act
    articlePage = await addCommentView.createComment(newCommentData);
    const response = await responsePromise;

    // Assert
    await expect
      .soft(articlePage.errorAlertPopup)
      .toHaveText(expectedCommentCreatedPopup);

    expect(response.ok()).toBeTruthy();
  });
});
