import pick from 'lodash/pick'

import {
  email as emailRegEx,
  password as passwordRegEx,
  username as usernameRegEx
} from '@shared/regExes'
import { Users } from '@/interfaces/Users'
import { EpiDrawError, errors } from '@/errors'

interface SignUpArgs {
  email: string,
  password: string,
  username: string,
}

interface SignInArgs {
  email: string,
  password: string,
}

export class Auth {
  #usersInterface: Users

  constructor (usersInterface: Users) {
    this.#usersInterface = usersInterface
  }

  async signUp ({ email = '', password = '', username = '' } : SignUpArgs) {
    if (!email.match(emailRegEx)) throw new EpiDrawError(errors.INVALID_INPUT, 'user.error.invalid.email')
    if (!password.match(passwordRegEx)) throw new EpiDrawError(errors.INVALID_INPUT, 'user.error.invalid.password')
    if (!username.match(usernameRegEx)) throw new EpiDrawError(errors.INVALID_INPUT, 'user.error.invalid.username')

    const newUser = await this.#usersInterface.create({ email, password, username })

    return pick(newUser, ['id', 'email', 'username'])
  }
}
