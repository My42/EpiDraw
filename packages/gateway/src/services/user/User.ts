import axios, { AxiosInstance } from 'axios';

import { User as UserType } from '@gateway/types/User';
import { handleError } from '@gateway/utils/decorators';

/**
 * This class calls the user service
 */
class User {
  readonly #baseUrl: string

  readonly #port: number

  readonly #api: AxiosInstance

  constructor(baseUrl: string, port: number) {
    this.#baseUrl = baseUrl;
    this.#port = port;
    this.#api = axios.create({
      baseURL: `http://${baseUrl}:${port}`,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

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
    const response = await this.#api.post<UserType>('/users', { email, password, username });

    return response.data;
  }
}

export { User };
