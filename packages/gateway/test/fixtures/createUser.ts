import { internet } from 'faker'
import { Types } from 'mongoose'

import { User } from 'myTypes/user'

import { DeepPartial } from 'myTypes/utils'

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
