import { RegisterUserModel } from '@_src/models/user.model';
import { faker } from '@faker-js/faker/locale/en';

export function prepareRandomUserData(): RegisterUserModel {
  const registerUserData: RegisterUserModel = {
    userFirstName: faker.person.firstName().replace(/[^A-Za-z]/g, ''),
    userLastName: faker.person.lastName().replace(/[^A-Za-z]/g, ''),
    userEmail: '',
    userPassword: faker.internet.password(),
  };

  registerUserData.userEmail = faker.internet.email({
    firstName: registerUserData.userFirstName,
    lastName: registerUserData.userLastName,
  });

  return registerUserData;
}
