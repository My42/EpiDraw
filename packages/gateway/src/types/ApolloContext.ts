import { User } from '../services/user';

export interface ApolloContext {
  services: {
    user: User
  }
}
