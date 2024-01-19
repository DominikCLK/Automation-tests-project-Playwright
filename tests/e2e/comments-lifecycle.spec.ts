import { prepareRandomArticle } from '@_src/factories/articles.factory';
import { prepareRandomComment } from '@_src/factories/comment.factory';
import { AddArticleModel } from '@_src/models/article.model';
import { AddCommentModel } from '@_src/models/comment.model';
import { ArticlePage } from '@_src/pages/article.page';
import { ArticlesPage } from '@_src/pages/articles.page';
import { AddArticleView } from '@_src/views/add-articles.view';
import { EditCommentView } from '@_src/views/edit-comment.view';
import { expect, test } from '@playwright/test';

test.describe('Create, verify and delete comment', () => {
  let articlesPage: ArticlesPage;
  let addArticleView: AddArticleView;
  let articleData: AddArticleModel;
  let articlePage: ArticlePage;
  let editCommentView: EditCommentView;

  test.beforeEach(async ({ page }) => {
    articlesPage = new ArticlesPage(page);
    articlePage = new ArticlePage(page);
    editCommentView = new EditCommentView(page);

    articleData = prepareRandomArticle();

    await articlesPage.goto();
    addArticleView = await articlesPage.clickAddArticleButtonLogged();
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
      const addCommentView = await articlePage.clickAddCommentButton();
      await expect
        .soft(addCommentView.addNewHeader)
        .toHaveText(expectedAddCommentHeader);

      await addCommentView.createComment(newCommentData);

      //Assert
      await expect
        .soft(articlePage.errorAlertPopup)
        .toHaveText(expectedCommentCreatedPopup);
    });

    const commentPage = await test.step('verify comment', async () => {
      // Verity comment
      // Act
      const articleComment = articlePage.getArticleComment(newCommentData.body);
      await expect(articleComment.body).toHaveText(newCommentData.body);
      const commentPage = await articlePage.clickCommentLink(
        articleComment.link,
      );

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
      const addCommentView = await articlePage.clickAddCommentButton();
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
