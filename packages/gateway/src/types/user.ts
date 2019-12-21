import { Document, Types } from 'mongoose'

export interface User {
  id: string;
  email: string;
  username: string;
  password: string;
}

export interface UserMongo extends User {
  _id: Types.ObjectId | string
}

export interface UserDocument extends Document, Omit<User, 'id'> {

}
