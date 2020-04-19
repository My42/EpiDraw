import { User } from '../services/user';
import { Auth } from '../services/auth';

export interface ApolloContext {
  services: {
    auth: Auth;
    user: User;
  }
}
