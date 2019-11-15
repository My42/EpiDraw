import { makeExecutableSchema } from 'apollo-server'
import typeDefs from './typedefs'
import { me } from './queries'
import { signUp } from './mutations'

const resolvers = {
  Query: {
    me
  },
  Mutation: {
    signUp
  }
}

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})

export { typeDefs, resolvers }

export default schema
