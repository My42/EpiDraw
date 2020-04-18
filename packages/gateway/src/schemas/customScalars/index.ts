import { gql } from 'apollo-server';

import { Password } from './Password';

const typeDefs = gql`    
  scalar Password
`;

const resolvers = {
  Password,
};

const CustomScalar = { resolvers, typeDefs };

export default CustomScalar;
