import { Auth } from '@/services/auth'
import { Users } from '@/interfaces/Users'
import { Context } from '@/types/Context'

export const createContext = (): Context => ({
  services: {
    auth: new Auth(new Users())
  }
})
