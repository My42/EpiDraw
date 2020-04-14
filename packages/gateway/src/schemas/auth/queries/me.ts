import { Context } from '../../../utils'

const me = async (obj, args, context: Context) => {
  console.log('QUERY: me')
  await context.services.user.search()
}

export default me
