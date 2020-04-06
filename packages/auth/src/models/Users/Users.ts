import UsersModel from './model'
import { UserMongo } from '@/types/user'
import { EpiDrawError, errors } from '@/errors'

export interface CreateArgs {
  email: string;
  password: string;
  username: string;
}

export interface DeleteArgs {
  id: string
}

export class Users {
  async create ({ email, password, username }: CreateArgs): Promise<UserMongo> {
    try {
      const userRecord = await UsersModel.create({ email, password, username })
      return userRecord.toObject()
    } catch (e) {
      if (e && e.errors && e.errors.email && e.errors.email.kind === 'UNIQ_ARG') {
        throw new EpiDrawError(errors.EMAIL_ALREADY_EXIST, 'user.error.uniq.email')
      }
      throw e
    }
  }

  async findOne (filter: Partial<UserMongo>): Promise<UserMongo | null> {
    const user = await UsersModel.findOne(filter)
    return user?.toObject() || null
  }

  async delete ({ id }: DeleteArgs): Promise<boolean> {
    await UsersModel.deleteOne({ _id: id })
    return true
  }
}
