import { internet } from 'faker'
import { Types } from 'mongoose'

import { User } from '@/types/user'

import { DeepPartial } from '@/types/utils'

const createUser = (user: DeepPartial<User> = { }) => {
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
