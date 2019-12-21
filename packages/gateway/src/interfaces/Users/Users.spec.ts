import { expect } from 'chai'
import * as bcrypt from 'bcrypt'
import { after, before, describe, test } from 'mocha'

import Users from '@models/users'
import { createUser } from '../../../test/fixtures'

import { Users as UsersInterface } from './Users'

const userInterface = new UsersInterface()

const newUser = createUser()

describe('Users interface', () => {
  before(async () => {
    await Users.create(newUser)
  })

  after(async () => {
    await Users.deleteMany({})
  })

  describe('Users.create', () => {
    test('Should create an user', async () => {
      const u = createUser()
      const res = await userInterface.create({ ...u })

      const user = await Users.findOne({ email: u.email, username: u.username })

      expect(user).to.not.be.equal(null)
      expect(user.toObject()).to.be.deep.equal(res.toObject())

      const isItTheGoodPassword = await bcrypt.compare(u.password, user.password)
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

  describe('User.delete', () => {
    test('should delete the user', async () => {
      await userInterface.delete({ id: newUser.id.toString() })

      const user = await Users.findOne({ id: newUser.id.toString() })

      expect(user).to.be.equal(null)
    })

    test('should happen nothing', async () => {
      let error = null
      try {
        await userInterface.delete({ id: newUser.id.toString() })
      } catch (e) {
        error = e
      }
      expect(error).to.be.equal(null)
    })
  })
})
