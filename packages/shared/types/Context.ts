import { Auth } from '@/service/auth'

export interface Context {
  services: {
    auth: Auth
  }
}
