import { describe, it, test } from 'mocha'
import { expect } from 'chai'
import sinon, { SinonStubbedInstance } from 'sinon'
import pick from 'lodash/pick'

import { createUser } from '@test/fixtures'

import { Auth as AuthService } from './Auth'
import { EpiDrawError } from '@/errors'
import { Users as UsersInterface } from '@/models'

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

  describe('Auth.signUp', () => {
    test('Valid user', async () => {
      const user = createUser()
      const { userInterface, authService } = createAuthService()

      userInterface.create.resolves(user)

      const result = await authService.signUp({ email: user.email, username: user.username, password: user.password })

      expect(userInterface.create.callCount).to.be.equal(1)
      expect(userInterface.create.getCall(0).args[0]).to.be.deep.equal(pick(user, ['email', 'username', 'password']))
      expect(result).to.be.deep.equal({ email: user.email, _id: user._id, username: user.username })
    })

    test('Invalid email', async () => {
      const user = createUser({ email: 'INVALID_EMAIL.com' })
      const { userInterface, authService } = createAuthService()
      let error: EpiDrawError | null = null

      try {
        await authService.signUp({ email: user.email, username: user.username, password: user.password })
      } catch (e) {
        error = e
      }

      expect(error).to.be.not.equal(null)
      expect(error!.message).to.be.equal('user.error.invalid.email')
      expect(userInterface.create.callCount).to.be.equal(0)
    })

    test('Invalid username', async () => {
      const user = createUser({ username: 'a' })
      const { userInterface, authService } = createAuthService()
      let error: EpiDrawError | null = null

      try {
        await authService.signUp({ email: user.email, username: user.username, password: user.password })
      } catch (e) {
        error = e
      }

      expect(error).to.be.not.equal(null)
      expect(error!.message).to.be.equal('user.error.invalid.username')
      expect(userInterface.create.callCount).to.be.equal(0)
    })

    test('Invalid password', async () => {
      const user = createUser({ password: '1234' })
      const { userInterface, authService } = createAuthService()
      let error: EpiDrawError | null = null

      try {
        await authService.signUp({ email: user.email, username: user.username, password: user.password })
      } catch (e) {
        error = e
      }

      expect(error).to.be.not.equal(null)
      expect(error!.message).to.be.equal('user.error.invalid.password')
      expect(userInterface.create.callCount).to.be.equal(0)
    })
  })

  describe('Auth.signIn', () => {
    it('should throw and error: Unknown user', async () => {
      const user = createUser()
      const { userInterface, authService } = createAuthService()
      let error: EpiDrawError | null = null

      try {
        await authService.signIn(user)
      } catch (e) {
        error = e
      }

      expect(error).to.be.not.equal(null)
      expect(error!.message).to.be.equal('user.error.unknown')
      expect(userInterface.findOne.callCount).to.be.equal(1)
    })

    test('Valid user', async () => {
      const user = createUser()
      const { userInterface, authService } = createAuthService()
      userInterface.findOne.resolves(user)

      const token = await authService.signIn(user)

      expect(token).to.be.a('string')
      expect(userInterface.findOne.callCount).to.be.deep.equal(1)
      expect(userInterface.findOne.getCall(0).args[0]).to.be.deep.equal({
        email: user.email,
        password: user.password
      })
    })
  })
})
