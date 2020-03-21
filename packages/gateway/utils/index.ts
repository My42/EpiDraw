import { Auth } from '@auth/service/Auth'
import { Users } from '@auth/interfaces/Users'
import { Context } from '@shared/types/Context'

export const createContext = (): Context => ({
  services: {
    auth: () => {}
  }
})
