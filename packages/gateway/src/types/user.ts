import { Document } from 'mongoose'

export interface User {
  email: string;
  username: string;
  password: string;
}

export interface UserDocument extends Document, User {

}
