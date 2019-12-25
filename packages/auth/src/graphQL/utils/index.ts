import { Auth } from '@/service/auth'
import { Users } from '@/interfaces/Users'
import { Context } from '@/types/Context'

export const createContext = (): Context => ({
  services: {
    auth: new Auth(new Users())
  }
})
