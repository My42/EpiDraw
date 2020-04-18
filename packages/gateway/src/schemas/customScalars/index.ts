import { gql } from 'apollo-server';

import { Email } from './Email';
import { Password } from './Password';

const resolvers = {
  Email,
  Password,
};

const typeDefs = gql`    
  scalar Email
  scalar Password
`;

const CustomScalar = { resolvers, typeDefs };

export default CustomScalar;
