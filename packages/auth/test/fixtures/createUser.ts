import { internet } from 'faker'
import { Types } from '@shared/utils/db'

import {User, UserMongo} from '@shared/types/user'

import { DeepPartial } from '@shared/types/utils'

const createUser = (user: DeepPartial<User> = { }): UserMongo => {
  const _id = Types.ObjectId()
  return {
    _id,
    id: _id.toHexString(),
    email: internet.email(),
    password: internet.password(6),
    username: internet.userName(),
    ...user
  }
}

export default createUser
