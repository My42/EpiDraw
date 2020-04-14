import { User } from '../services/user'

export interface Context {
  services: {
    user: User,
  }
}

const { SERVICE_USER_BASE_URL, SERVICE_USER_PORT } = process.env

if (!SERVICE_USER_BASE_URL || !SERVICE_USER_PORT)
  throw new Error('SERVICE_USER_BASE_URL or SERVICE_USER_PORT are not set in env')

export const createContext = (): Context => ({
  services: {
    user: new User(SERVICE_USER_BASE_URL, parseInt(SERVICE_USER_PORT, 10))
  }
})
