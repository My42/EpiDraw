import { ApolloContext } from '@gateway/types/ApolloContext';

import { User } from '../services/user';
import { Auth } from '../services/auth';

const {
  SERVICE_AUTH_BASE_URL,
  SERVICE_AUTH_PORT,
  SERVICE_USER_BASE_URL,
  SERVICE_USER_PORT,
} = process.env;

if (!SERVICE_USER_BASE_URL || !SERVICE_USER_PORT) throw new Error('SERVICE_USER_BASE_URL or SERVICE_USER_PORT are not set in env');
if (!SERVICE_AUTH_BASE_URL || !SERVICE_AUTH_PORT) throw new Error('SERVICE_AUTH_BASE_URL or SERVICE_AUTH_PORT are not set in env');

export const createContext = (): ApolloContext => ({
  services: {
    auth: new Auth(SERVICE_AUTH_BASE_URL, parseInt(SERVICE_AUTH_PORT, 10)),
    user: new User(SERVICE_USER_BASE_URL, parseInt(SERVICE_USER_PORT, 10)),
  },
});
