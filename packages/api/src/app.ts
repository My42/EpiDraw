import {
  ApolloServer,
  mergeSchemas
} from 'apollo-server'
import authSchema from './services/auth/graphQL'

const server = new ApolloServer({
  playground: true,
  schema: mergeSchemas({ schemas: [authSchema] })
})

server.listen(4242)
  .then(({ url }) => console.log(`🚀  Server ready at ${url}`))
  .catch(err => console.log(err))
