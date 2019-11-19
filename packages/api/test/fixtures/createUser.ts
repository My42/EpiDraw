import { internet } from 'faker'
import { Types } from 'mongoose'

import User from '../../src/types/user'

import { DeepPartial } from '../../src/types/utils'

const createUser = (user: DeepPartial<User> = { }) => {
  const id = Types.ObjectId()
  return {
    id,
    _id: id,
    email: internet.email(),
    password: internet.password(6),
    username: internet.userName(),
    ...user
  }
}

export default createUser
