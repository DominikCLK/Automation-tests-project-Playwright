import { prepareRandomArticle } from '@_src/factories/articles.factory';
import { prepareRandomComment } from '@_src/factories/comment.factory';
import { expect, test } from '@_src/fixtures/merge.fixture';
import { AddArticleModel } from '@_src/models/article.model';
import { AddCommentModel } from '@_src/models/comment.model';
import { ArticlePage } from '@_src/pages/article.page';

test.describe('Create, verify and delete comment', () => {
  let articleData: AddArticleModel;
  let articlePage: ArticlePage;

  test.beforeEach(async ({ addArticleView }) => {
    articleData = prepareRandomArticle();
    articlePage = await addArticleView.createArticle(articleData);
  });

  test('operate on comment @GAD-R05-01 @GAD-R05-02 @GAD-R05-03 @logged', async () => {
    // Arrange
    const newCommentData = prepareRandomComment();

    await test.step('create a new comment', async () => {
      //Arrange
      const expectedAddCommentHeader = 'Add New Comment';
      const expectedCommentCreatedPopup = 'Comment was created';

      //Act
      const addCommentView = await articlePage.clickAddCommentButton();
      await expect
        .soft(addCommentView.addNewHeader)
        .toHaveText(expectedAddCommentHeader);

      articlePage = await addCommentView.createComment(newCommentData);

      //Assert
      await expect
        .soft(articlePage.errorAlertPopup)
        .toHaveText(expectedCommentCreatedPopup);
    });

    let commentPage = await test.step('verify comment', async () => {
      // Act
      const articleComment = articlePage.getArticleComment(newCommentData.body);
      await expect(articleComment.body).toHaveText(newCommentData.body);
      const commentPage = await articlePage.clickCommentLink(articleComment);

      // Assert
      await expect(commentPage.commentBody).toHaveText(newCommentData.body);

      return commentPage;
    });

    //Edit comment
    let editCommentData: AddCommentModel;
    await test.step('update comment', async () => {
      //Arrange
      const expectedCommentUpdatedPopup = 'Comment was updated';
      editCommentData = prepareRandomComment();

      //Act
      const editCommentView = await commentPage.clickEditButton();
      commentPage = await editCommentView.updateComment(editCommentData);

      //Assert
      await expect
        .soft(commentPage.alertPopup)
        .toHaveText(expectedCommentUpdatedPopup);
      await expect(commentPage.commentBody).toHaveText(editCommentData.body);
    });

    await test.step('verify updated comment in articles page', async () => {
      //Act
      const articlePage = await commentPage.clickReturnLink();
      const updatedArticleComment = articlePage.getArticleComment(
        editCommentData.body,
      );
      //Assert
      await expect(updatedArticleComment.body).toHaveText(editCommentData.body);
    });

    await test.step('create and verify second comment', async () => {
      //Arrange
      const secondCommentData = prepareRandomComment();

      //Act
      const addCommentView = await articlePage.clickAddCommentButton();
      articlePage = await addCommentView.createComment(secondCommentData);

      //Assert
      const articleComment = articlePage.getArticleComment(
        secondCommentData.body,
      );
      await expect(articleComment.body).toHaveText(secondCommentData.body);
      await articleComment.link.click();
      await expect(commentPage.commentBody).toHaveText(secondCommentData.body);
    });
  });
});
