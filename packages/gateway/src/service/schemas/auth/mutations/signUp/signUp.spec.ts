import { describe, it } from 'mocha'
import { expect } from 'chai'
import pick from 'lodash/pick'
import sinon from 'sinon'

import { Auth } from '@auth/service'

import signUp from './signUp'
import { createUser } from '../../../../../../../auth/test/fixtures'
import { Context } from '@shared/types/Context'

const user = createUser()

describe('api/src/graphQL/Auth/mutations/signUp', () => {
  it('should call signUp method of Auth service', async () => {
    const context = { services: { auth: sinon.createStubInstance(Auth) } }
    const args = pick(user, ['email', 'password', 'username'])
    const result = await signUp({ }, args, context as unknown as Context)

    expect(result).to.be.equal(undefined)

    expect(context.services.auth.signUp.callCount).to.be.equal(1)
    expect(context.services.auth.signUp.getCall(0).args[0]).to.be.deep.equal(args)
  })
})
