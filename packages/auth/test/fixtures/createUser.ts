import { internet } from 'faker'
import { Types } from 'mongoose'

import { User, UserMongo } from '@auth/types/user'

import { DeepPartial } from '@auth/types/utils'

const createUser = (user: DeepPartial<User> = { }): UserMongo => {
  const _id = Types.ObjectId()
  return {
    _id,
    email: internet.email(),
    password: internet.password(6),
    username: internet.userName(),
    ...user
  }
}

export default createUser
