import { prepareRandomArticle } from '../../src/factories/articles.factory';
import { prepareRandomComment } from '../../src/factories/comment.factory';
import { AddArticleModel } from '../../src/models/article.model';
import { AddCommentModel } from '../../src/models/comment.model';
import { ArticlePage } from '../../src/pages/article.page';
import { ArticlesPage } from '../../src/pages/articles.page';
import { CommentPage } from '../../src/pages/comment.page';
import { AddArticleView } from '../../src/views/add-articles.view';
import { AddCommentView } from '../../src/views/add-comment.view';
import { EditCommentView } from '../../src/views/edit-comment.view';
import { expect, test } from '@playwright/test';

test.describe('Create, verify and delete comment', () => {
  let articlesPage: ArticlesPage;
  let addArticleView: AddArticleView;
  let articleData: AddArticleModel;
  let articlePage: ArticlePage;
  let addCommentView: AddCommentView;
  let commentPage: CommentPage;
  let editCommentView: EditCommentView;

  test.beforeEach(async ({ page }) => {
    articlesPage = new ArticlesPage(page);
    addArticleView = new AddArticleView(page);
    articlePage = new ArticlePage(page);
    addCommentView = new AddCommentView(page);
    commentPage = new CommentPage(page);
    editCommentView = new EditCommentView(page);

    articleData = prepareRandomArticle();
    await articlesPage.goto();

    await articlesPage.addArticleButtonLogged.click();
    await addArticleView.createArticle(articleData);
  });

  test('operate on comment @GAD-R05-01 @GAD-R05-02 @GAD-R05-03 @logged', async () => {
    //Create mew comment
    // Arrange
    const newCommentData = prepareRandomComment();

    await test.step('create a new comment', async () => {
      //Arrange
      const expectedAddCommentHeader = 'Add New Comment';
      const expectedCommentCreatedPopup = 'Comment was created';

      //Create mew comment
      //Act
      await articlePage.addCommentButton.click();

      //Assert
      await expect
        .soft(addCommentView.addNewHeader)
        .toHaveText(expectedAddCommentHeader);

      await addCommentView.createComment(newCommentData);
      await expect
        .soft(articlePage.errorAlertPopup)
        .toHaveText(expectedCommentCreatedPopup);
    });

    await test.step('verify comment', async () => {
      // Verity comment
      // Act
      const articleComment = articlePage.getArticleComment(newCommentData.body);
      await expect(articleComment.body).toHaveText(newCommentData.body);
      await articleComment.link.click();

      // Assert
      await expect(commentPage.commentBody).toHaveText(newCommentData.body);
    });

    //Edit comment
    let editCommentData: AddCommentModel;
    await test.step('update comment', async () => {
      //Arrange
      const expectedCommentUpdatedPopup = 'Comment was updated';
      editCommentData = prepareRandomComment();

      //Act
      await commentPage.editButton.click();
      await editCommentView.updateComment(editCommentData);

      //Assert
      await expect
        .soft(commentPage.alertPopup)
        .toHaveText(expectedCommentUpdatedPopup);
      await expect(commentPage.commentBody).toHaveText(editCommentData.body);
    });

    await test.step('verify updated comment in articles page', async () => {
      //Act
      await commentPage.returnLink.click();
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
      await articlePage.addCommentButton.click();
      await addCommentView.createComment(secondCommentData);

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
