import { Context } from '@auth/types/Context'

const signUp = async (_, { email, password, username }, ctx: Context) => {
  // await ctx.services.auth.signUp({ email, password, username })
}

export default signUp
