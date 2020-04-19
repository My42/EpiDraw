import { AuthenticationError } from 'apollo-server';
import bcrypt from 'bcrypt';

import { Resolver } from '@gateway/types/Resolver';

interface Args {
  input: {
    email: string;
    password: string;
  }
}

export const signIn: Resolver<Args> = async (_, { input }, context) => {
  const { email, password } = input;
  const [user] = await context.services.user.find({ email });

  const isGoodPassword = await bcrypt.compare(password, user.password || '');
  if (!isGoodPassword) throw new AuthenticationError('User not found');

  const token = await context.services.auth.getToken({ userId: user.id });

  return {
    token,
    me: user,
  };
};
