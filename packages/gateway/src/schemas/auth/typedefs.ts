import { gql } from 'apollo-server';

const typeDefs = gql`
  type Query {
      me: String
  }
  
  input SignUpInput {
      email: String
      password: String
      username: String
  }
  
  type Mutation {
      signUp(input: SignUpInput): Boolean
  }
`;

export default typeDefs;
