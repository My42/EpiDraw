import * as bcrypt from 'bcrypt'
import { Schema, model, models } from 'mongoose'

import { UserDocument } from '@myTypes/user'
import { email as emailRegEx } from '@shared/regExes'
import Users from '@interfaces/Users'

export const name = 'Users'

export const schema = new Schema({
  email: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true }
})

schema.pre('save', async function (next) {
  const user = this as UserDocument

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next()
  user.password = await bcrypt.hash(user.password, Users.BCRYPT_SALT_ROUNDS)
  next()
})

schema.path('email').validate(async (email) => {
  const count = await models.Users.countDocuments({ email })
  return !count
}, 'Email already exist', 'UNIQ_ARG')

schema.path('email').validate(async (email: string) => {
  return email.match(emailRegEx)
}, 'Email is invalid', 'INVALID_ARG')

const users = model<UserDocument>(name, schema)

export default users
