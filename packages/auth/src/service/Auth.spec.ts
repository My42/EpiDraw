import { describe, it, test } from 'mocha'
import { expect } from 'chai'
import jwt from 'jsonwebtoken'
import sinon, { SinonStubbedInstance } from 'sinon'

import { createUser } from '@test/fixtures'

import { Auth as AuthService } from './Auth'
import { EpiDrawError } from '@auth/errors'
import { Users as UsersInterface } from '@auth/models'

const createAuthService = (): {
  userInterface: SinonStubbedInstance<UsersInterface>
  authService: AuthService
} => {
  const userInterface = sinon.createStubInstance(UsersInterface)
  const authService = new AuthService(userInterface)

  return { userInterface, authService }
}

describe('[Service] Auth', () => {
  test('Instance', () => {
    const { authService } = createAuthService()

    expect(authService).to.be.an.instanceOf(AuthService)
  })

  describe('Auth.get', () => {
    test('Valid user', async () => {
      const user = createUser()
      const { userInterface, authService } = createAuthService()
      userInterface.findOne.resolves(user)

      const token = await authService.getToken({ userId: user._id.toString() })
      const decoded: { [key: string]: any } = jwt.verify(token, 'secret') as object

      expect(token).to.be.a('string')
      expect(decoded).to.have.all.keys('sub', 'iat', 'exp')
      expect(decoded.sub).to.be.equal(user._id.toString())
      expect(decoded.iat).to.be.a('number')
      expect(decoded.exp).to.be.a('number')
    })
  })

  describe('Auth.verify', () => {
    test('Valid token', async () => {
      const { authService, userInterface } = createAuthService()
      const user = createUser()

      userInterface.findOne.resolves(user)

      const token = await authService.getToken({ userId: user._id.toString() })
      const decoded = authService.verify({ token })

      expect(decoded).to.be.not.equal(null)
      expect(decoded!.sub).to.be.equal(user._id.toString())
      expect(decoded!.iat).to.be.a('number')
      expect(decoded!.exp).to.be.a('number')
    })

    test('Invalid token', async () => {
      const { authService, userInterface } = createAuthService()
      const user = createUser()

      userInterface.findOne.resolves(user)

      const decoded = authService.verify({ token: 'FAKE_TOKEN' })

      expect(decoded).to.be.equal(null)
    })
  })
})
