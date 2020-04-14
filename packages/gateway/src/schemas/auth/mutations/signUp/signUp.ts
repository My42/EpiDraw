import { Resolver } from '@gateway/types/Resolver';

interface Args {
  input: {
    email: string;
    password: string;
    username: string;
  }
}

const signUp: Resolver<Args> = async (
  _,
  { input },
  ctx,
) => {
  await ctx.services.user.createOne(input);
  return true;
};

export default signUp;
