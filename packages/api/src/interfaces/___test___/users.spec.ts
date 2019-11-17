import { expect } from 'chai'
import * as bcrypt from 'bcrypt'
import { describe, test } from 'mocha'

import Users from '../../models/users'
import { createUser } from '../../../test/fixtures'

import UsersInterface from '../Users'

const userInterface = new UsersInterface()

const newUser = createUser()

describe('Users interface', () => {
  describe('Users.create', () => {
    test('Should create an user', async () => {
      const res = userInterface.create({ ...newUser })

      const user = await Users.findOne({ email: newUser.email, username: newUser.username })

      expect(user).to.not.be.equal(null)
      expect(user).to.be.deep.equal(res)

      const isItTheGoodPassword = await bcrypt.compare(newUser.password, user.password)
      expect(isItTheGoodPassword).to.be.equal(true)
    })

    test('Should thrown an error for uniq email', async () => {
      let error = null

      try {
        await userInterface.create({ ...newUser })
      } catch (e) {
        error = e
      }

      expect(error).to.be.not.equal(null)
      expect(error.essage).to.be.equal("I don't know what I'm expecting here")
    })

    test('Should thrown an error for invalid email', async () => {
      let error = null

      try {
        await userInterface.create({
          ...newUser,
          email: 'invalid@email'
        })
      } catch (e) {
        error = e
      }

      expect(error).to.be.not.equal(null)
      expect(error.essage).to.be.equal("I don't know what I'm expecting here")
    })

    test('Should thrown an error for invalid email', async () => {
      let error = null

      try {
        await userInterface.create({
          ...newUser,
          email: 'invalid.fr'
        })
      } catch (e) {
        error = e
      }

      expect(error).to.be.not.equal(null)
      expect(error.essage).to.be.equal("I don't know what I'm expecting here")
    })
  })
})
