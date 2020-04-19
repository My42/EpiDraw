import jwt from 'jsonwebtoken'
import pick from 'lodash/pick'

import {
  email as emailRegEx,
  password as passwordRegEx,
  username as usernameRegEx
} from '@auth/regExes'
import { Users } from '@auth/models/Users'
import { EpiDrawError, errors } from '@auth/errors'
import { UserMongo } from '@auth/types'

interface SignUpArgs {
  email: string;
  password: string;
  username: string;
}

interface SignInArgs {
  userId: string;
}

interface JwtToken {
  exp: number;
  iat: number;
  sub: string;
}

export class Auth {
  #usersInterface: Users
  #jwtPrivateKey: string

  constructor (usersInterface: Users) {
    this.#usersInterface = usersInterface
    this.#jwtPrivateKey = process.env.JWT_PRIVATE_KEY || 'secret'
  }

  async signUp ({
    email = '',
    password = '',
    username = ''
  } : SignUpArgs
  ): Promise<Pick<UserMongo, '_id' | 'email' | 'username'>> {
    if (!email.match(emailRegEx)) throw new EpiDrawError(errors.INVALID_INPUT, 'user.error.invalid.email')
    if (!password.match(passwordRegEx)) throw new EpiDrawError(errors.INVALID_INPUT, 'user.error.invalid.password')
    if (!username.match(usernameRegEx)) throw new EpiDrawError(errors.INVALID_INPUT, 'user.error.invalid.username')

    const newUser = await this.#usersInterface.create({ email, password, username })

    return pick(newUser, ['_id', 'email', 'username'])
  }

  async getToken ({ userId }: SignInArgs): Promise<string> {
    return jwt.sign(
      { sub: userId },
      this.#jwtPrivateKey,
      { expiresIn: '1d' }
    ) as string
  }

  verify ({ token }: { token: string }): JwtToken | null {
    try {
      return jwt.verify(token, this.#jwtPrivateKey) as JwtToken
    } catch (e) {
      return null
    }
  }
}
