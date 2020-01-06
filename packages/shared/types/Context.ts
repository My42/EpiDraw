import { Auth } from '@auth/service'

export interface Context {
  services: {
    auth: Auth
  }
}
