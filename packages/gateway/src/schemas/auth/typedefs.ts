import { gql } from 'apollo-server';

const typeDefs = gql`
  type SignInOutput {
      token: String
      me: User
  }
  
  type User {
      id: ID!
      email: String!
      username: String!
  }
  
  input SignUpInput {
      email: String!
      password: Password!
      username: String!
  }

  input SignInInput {
      email: String!
      password: Password!
  }

  type Query {
      me(vincent: Int, password: Password): String
      signIn(input: SignInInput!): SignInOutput
  }

  type Mutation {
      signUp(input: SignUpInput!): Boolean
  }
`;

export default typeDefs;
