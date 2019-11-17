import UsersModel from '../models/users'

export interface CreateArgs {
  email: string;
  password: string;
  username: string;
}

export default class Users {
  static BCRYPT_SALT_ROUNDS = 10

  create ({ email, password, username }: CreateArgs) {
    return UsersModel.create({ email, password, username })
  }
}
