import { Schema, model, models } from 'mongoose'
import { UserDocument } from '../types/user'

export const name = 'Users'

export const schema = new Schema({
  email: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true }
})

schema.path('email').validate(async (email) => {
  const count = await models.Users.countDocuments({ email })
  return !count
}, 'Email already exist', 'EmailUniq')

const users = model<UserDocument>(name, schema)

export default users
