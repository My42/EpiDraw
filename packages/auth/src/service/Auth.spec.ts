import { describe, test } from 'mocha'
import { expect } from 'chai'
import sinon, { SinonStubbedInstance } from 'sinon'
import pick from 'lodash/pick'

import { createUser } from '@test/fixtures'

import { Auth as AuthService } from './Auth'
import { Users as UsersInterface } from '@/interfaces'

const createAuthService = (): {
  authInterfaceMocked: SinonStubbedInstance<UsersInterface>
  authService: AuthService
} => {
  const authInterfaceMocked = sinon.createStubInstance(UsersInterface)
  const authService = new AuthService(authInterfaceMocked)

  return { authInterfaceMocked, authService }
}

describe('[Service] Auth', () => {
  test('Instance', () => {
    const authService = new AuthService(null)

    expect(authService).to.be.an.instanceOf(AuthService)
  })
})

describe('[Service] Auth.signUp', () => {
  test('Valid user', async () => {
    const user = createUser()
    const { authInterfaceMocked, authService } = createAuthService()

    authInterfaceMocked.create.resolves(user)

    const result = await authService.signUp({ email: user.email, username: user.username, password: user.password })

    expect(authInterfaceMocked.create.callCount).to.be.equal(1)
    expect(authInterfaceMocked.create.getCall(0).args[0]).to.be.deep.equal(pick(user, ['email', 'username', 'password']))
    expect(result).to.be.deep.equal({ email: user.email, username: user.username })
  })

  test('Invalid email', async () => {
    const user = createUser({ email: 'INVALID_EMAIL.com' })
    const { authInterfaceMocked, authService } = createAuthService()
    let error = null

    try {
      await authService.signUp({ email: user.email, username: user.username, password: user.password })
    } catch (e) {
      error = e
    }

    expect(error).to.be.not.equal(null)
    expect(error.message).to.be.equal('user.error.invalid.email')
    expect(authInterfaceMocked.create.callCount).to.be.equal(0)
  })

  test('Invalid username', async () => {
    const user = createUser({ username: 'a' })
    const { authInterfaceMocked, authService } = createAuthService()
    let error = null

    try {
      await authService.signUp({ email: user.email, username: user.username, password: user.password })
    } catch (e) {
      error = e
    }

    expect(error).to.be.not.equal(null)
    expect(error.message).to.be.equal('user.error.invalid.username')
    expect(authInterfaceMocked.create.callCount).to.be.equal(0)
  })

  test('Invalid password', async () => {
    const user = createUser({ password: '1234' })
    const { authInterfaceMocked, authService } = createAuthService()
    let error = null

    try {
      await authService.signUp({ email: user.email, username: user.username, password: user.password })
    } catch (e) {
      error = e
    }

    expect(error).to.be.not.equal(null)
    expect(error.message).to.be.equal('user.error.invalid.password')
    expect(authInterfaceMocked.create.callCount).to.be.equal(0)
  })
})
