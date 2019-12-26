import pick from 'lodash/pick'

import {
  email as emailRegEx,
  password as passwordRegEx,
  username as usernameRegEx
} from '@shared/regExes'
import { Users } from '@/interfaces/Users'
import { EpiDrawError, errors } from '@shared/errors'

export interface SignUpArgs {
  email: string,
  password: string,
  username: string,
}

export class Auth {
  private _usersInterface: Users

  constructor (usersInterface: Users) {
    this._usersInterface = usersInterface
  }

  async signUp ({ email = '', password = '', username = '' } : SignUpArgs) {
    if (!email.match(emailRegEx)) throw new EpiDrawError(errors.INVALID_INPUT, 'user.error.invalid.email')
    if (!password.match(passwordRegEx)) throw new EpiDrawError(errors.INVALID_INPUT, 'user.error.invalid.password')
    if (!username.match(usernameRegEx)) throw new EpiDrawError(errors.INVALID_INPUT, 'user.error.invalid.username')

    const newUser = await this._usersInterface.create({ email, password, username })

    return pick(newUser, ['email', 'username'])
  }
}
