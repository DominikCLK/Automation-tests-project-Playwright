export const testUser1 = {
  userEmail: process.env.USER_EMAIL ?? '[NOT SET]',
  userPassword: process.env.USER_PASSWORD ?? '[NOT SET]',
  incorrectUserPassword: process.env.USER_INCORRECT_PASSWORD ?? '[NOT SET]',
  incorrectUserEmail: process.env.USER_INCORRECT_EMAIL ?? '[NOT SET]',
};
