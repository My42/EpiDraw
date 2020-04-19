import isEmpty from 'lodash/isEmpty';

import { User as UserType } from '@gateway/types/User';
import { handleError } from '@gateway/utils/decorators';
import { objToHttpParams } from '@gateway/utils/objToHttpParams';

import { Service } from '../utils/Service';

/**
 * This class calls the user service
 */
class User extends Service {
  /**
   * Create one user with required information
   *
   * @param email {string}
   * @param password {string}
   * @param username {string}
   * @memberOf User
   */
  @handleError
  async createOne({
    email,
    password,
    username,
  }: Pick<UserType, 'email' | 'password' | 'username'>) {
    const response = await this.api.post<UserType>('/users', { email, password, username });

    return response.data;
  }

  /**
   * Find users by their fields
   *
   * @param fields {UserType}
   * @memberOf User
   */
  @handleError
  async find(fields: Partial<UserType>) {
    const url = isEmpty(fields) ? '/users' : `/users?${objToHttpParams(fields)}`;
    const response = await this.api.get<UserType[]>(url);

    return response.data;
  }
}

export { User };
