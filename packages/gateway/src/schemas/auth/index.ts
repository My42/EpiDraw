import { me } from './queries';
import { signUp } from './mutations';
import typeDefs from './typedefs';

const resolvers = {
  Query: {
    me,
  },
  Mutation: {
    signUp,
  },
};

const Auth = { typeDefs, resolvers };

export default Auth;
