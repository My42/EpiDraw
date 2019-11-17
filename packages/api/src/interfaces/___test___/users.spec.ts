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
      const res = await userInterface.create({ ...newUser })

      const user = await Users.findOne({ email: newUser.email, username: newUser.username })

      expect(user).to.not.be.equal(null)
      expect(user.toObject()).to.be.deep.equal(res.toObject())

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
      expect(error.message).to.be.equal('Users validation failed: email: Email already exist')
      expect(error.errors.email.path).to.be.equal('email')
      expect(error.errors.email.kind).to.be.equal('UNIQ_ARG')
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
      expect(error.message).to.be.equal('Users validation failed: email: Email is invalid')
      expect(error.errors.email.path).to.be.equal('email')
      expect(error.errors.email.kind).to.be.equal('INVALID_ARG')
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
      expect(error.message).to.be.equal('Users validation failed: email: Email is invalid')
      expect(error.errors.email.path).to.be.equal('email')
      expect(error.errors.email.kind).to.be.equal('INVALID_ARG')
    })
  })
})
