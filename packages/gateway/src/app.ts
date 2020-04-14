import {
  ApolloServer,
  mergeSchemas,
} from 'apollo-server';
import { createContext } from './utils';
import { AuthSchema } from './schemas';

const server = new ApolloServer({
  context: createContext,
  debug: process.env.NODE_ENV !== 'production',
  playground: true,
  schema: mergeSchemas({ schemas: [AuthSchema] }),
});

server.listen(4242)
  .then(({ url }) => console.log(`🚀 Gateway service ready at ${url}`))
  .catch((err) => console.log(err));
