import UsersModel from '@shared/models/users'
import { UserMongo } from '@shared/types/user'
import { EpiDrawError, errors } from '@shared/errors'

export interface CreateArgs {
  email: string;
  password: string;
  username: string;
}

export interface DeleteArgs {
  id: string
}

export class Users {
  async create ({ email, password, username }: CreateArgs) {
    try {
      return await UsersModel.create({ email, password, username }) as unknown as UserMongo
    } catch (e) {
      if (e && e.errors && e.errors.email && e.errors.email.kind === 'UNIQ_ARG') {
        throw new EpiDrawError(errors.EMAIL_ALREADY_EXIST, 'user.error.uniq.email')
      }
      throw e
    }
  }

  findOne (filter: Partial<UserMongo>) {
    return UsersModel.findOne(filter) as unknown as UserMongo
  }

  delete ({ id }: DeleteArgs) {
    console.log('id = ', id)
    return UsersModel.deleteOne({ _id: id })
  }
}
