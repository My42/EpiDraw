import { Auth } from '@/services/auth'

export interface Context {
  services: {
    auth: Auth
  }
}
