import { makeExecutableSchema } from 'apollo-server';
import Auth from './auth';
import CustomScalar from './customScalars';

const schema = makeExecutableSchema({
  resolvers: [
    Auth.resolvers,
    CustomScalar.resolvers,
  ],
  typeDefs: [
    Auth.typeDefs,
    CustomScalar.typeDefs,
  ],
});

export default schema;
