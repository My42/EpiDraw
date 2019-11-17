import { expect } from 'chai'
import { describe, test } from 'mocha'

import Users from '../../../models/users'

describe('api/services/auth/signUp', () => {
  test('Y O L O', async () => {
    const user = await Users.create({ email: 'vincent.mesquita@epitech.eu', username: 'Tangara', password: 'coucou0%' })
    console.log(user)
    expect(user).to.be.equal(3)
  })
})
