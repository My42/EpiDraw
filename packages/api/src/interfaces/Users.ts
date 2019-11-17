import UsersModel from '../models/users'

export interface CreateArgs {
  email: string;
  password: string;
  username: string;
}

export default class Users {
  BCRYPT_SALT_ROUNDS = 10

  async create ({ email, password, username }: CreateArgs) {
    // await UsersModel.create({ email, password, username })
  }
}
