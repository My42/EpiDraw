import { internet } from 'faker'

import User from '../../src/types/user'

import { DeepPartial } from '../../src/types/utils'

const createUser = (user: DeepPartial<User> = { }) => ({
  email: internet.email(),
  password: internet.password(6),
  username: internet.userName(),
  ...user
})

export default createUser
