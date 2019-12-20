import { Document, Types, Schema } from 'mongoose'

export interface User {
  id: Schema.Types.ObjectId;
  email: string;
  username: string;
  password: string;
}

export interface UserDocument extends Document, User {

}
