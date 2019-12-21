import UsersModel from '@models/users'

export interface CreateArgs {
  email: string;
  password: string;
  username: string;
}

export interface DeleteArgs {
  id: string
}

export class Users {
  static BCRYPT_SALT_ROUNDS = 10

  create ({ email, password, username }: CreateArgs) {
    return UsersModel.create({ email, password, username })
  }

  delete ({ id }: DeleteArgs) {
    console.log('id = ', id)
    return UsersModel.deleteOne({ _id: id })
  }
}
