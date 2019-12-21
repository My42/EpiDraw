import { Auth } from '@services/auth'
import { Users } from '@interfaces/Users'
import { Context } from '@myTypes/Context'

export const createContext = (): Context => ({
  services: {
    auth: new Auth(new Users())
  }
})
