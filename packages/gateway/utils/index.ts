import { Context } from '@auth/types/Context'

export const createContext = (): Context => ({
  services: {
    auth: () => {}
  }
})
