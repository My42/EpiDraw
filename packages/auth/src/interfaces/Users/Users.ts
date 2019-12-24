import UsersModel from '@shared/models/users'
import { UserMongo } from '@/types/user'

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

  findOne (filter: Partial<UserMongo>) {
    return UsersModel.findOne(filter) as unknown as UserMongo
  }

  delete ({ id }: DeleteArgs) {
    console.log('id = ', id)
    return UsersModel.deleteOne({ _id: id })
  }
}
