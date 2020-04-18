import {
  ApolloServer,
} from 'apollo-server';
import { createContext } from './utils';
import schema from './schemas';

const server = new ApolloServer({
  context: createContext,
  debug: process.env.NODE_ENV !== 'production',
  playground: true,
  schema,
});

server.listen(4242)
  .then(({ url }) => console.log(`🚀 Gateway service ready at ${url}`))
  .catch((err) => console.log(err));
