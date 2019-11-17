import { Schema, model, models } from 'mongoose'

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

const users = model(name, schema)

export default users
