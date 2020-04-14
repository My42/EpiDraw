import { gql } from 'apollo-server';

const typeDefs = gql`
  type Query {
      me: String
  }
  
  type Mutation {
      signUp: Boolean
  }
`;

export default typeDefs;
