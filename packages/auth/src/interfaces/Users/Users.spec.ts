import * as bcrypt from 'bcrypt'
import { after, before, describe, it } from 'mocha'
import { expect } from 'chai'

import { EpiDrawError, errors } from '@/errors'
import { Types } from '@shared/utils/db'
import Users from '@/models/users'

import { createUser } from '@test/fixtures'

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
    it('Should create an user', async () => {
      const u = createUser()
      const res = await userInterface.create({ ...u })

      const user = await Users.findOne({ email: u.email, username: u.username })

      expect(user).to.not.be.equal(null)
      // @ts-ignore
      expect(user.toObject()).to.be.deep.equal(res.toObject())

      const isItTheGoodPassword = await bcrypt.compare(u.password, user!.password)
      expect(isItTheGoodPassword).to.be.equal(true)
    })

    it('Should thrown an error for uniq email', async () => {
      let error: EpiDrawError | null = null

      try {
        await userInterface.create({ ...newUser })
      } catch (e) {
        error = e
      }

      expect(error).to.be.not.equal(null)
      expect(error!.message).to.be.equal('user.error.uniq.email')
      expect(error!.code).to.be.equal(errors.EMAIL_ALREADY_EXIST)
    })

    it('Should thrown an error for invalid email', async () => {
      let error: EpiDrawError | null = null

      try {
        await userInterface.create({
          ...newUser,
          email: 'invalid@email'
        })
      } catch (e) {
        error = e
      }

      expect(error).to.be.not.equal(null)
      expect(error!.message).to.be.equal('Users validation failed: email: Email is invalid')
      // @ts-ignore
      expect(error!.errors.email.path).to.be.equal('email')
      // @ts-ignore
      expect(error!.errors.email.kind).to.be.equal('INVALID_ARG')
    })

    it('Should thrown an error for invalid email', async () => {
      let error: EpiDrawError | null = null

      try {
        await userInterface.create({
          ...newUser,
          email: 'invalid.fr'
        })
      } catch (e) {
        error = e
      }

      expect(error).to.be.not.equal(null)
      expect(error!.message).to.be.equal('Users validation failed: email: Email is invalid')
      // @ts-ignore
      expect(error!.errors.email.path).to.be.equal('email')
      // @ts-ignore
      expect(error!.errors.email.kind).to.be.equal('INVALID_ARG')
    })
  })

  describe('User.findOne', () => {
    it('should find one user', async () => {
      const user = await userInterface.findOne({ _id: newUser._id })

      expect(user).to.be.not.equal(null)
      expect(user!._id).to.be.deep.equal(newUser._id)
    })

    it('should find no user', async () => {
      const user = await userInterface.findOne({ _id: Types.ObjectId() })

      expect(user).to.be.equal(null)
    })
  })

  describe('User.delete', () => {
    it('should delete the user', async () => {
      await userInterface.delete({ id: newUser.id.toString() })

      const user = await Users.findOne({ id: newUser.id.toString() })

      expect(user).to.be.equal(null)
    })

    it('should happen nothing', async () => {
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
