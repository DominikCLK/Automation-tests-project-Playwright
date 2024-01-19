import {
  USER_EMAIL,
  USER_INCORRECT_EMAIL,
  USER_INCORRECT_PASSWORD,
  USER_PASSWORD,
} from '../env.config';
import { InvalidLoginUserModel, LoginUserModel } from '@_src/models/user.model';

export const testUser1: LoginUserModel = {
  userEmail: USER_EMAIL,
  userPassword: USER_PASSWORD,
};

export const invalidTestUser1: InvalidLoginUserModel = {
  invalidUserEmail: USER_INCORRECT_EMAIL,
  invalidUserPassword: USER_INCORRECT_PASSWORD,
};
