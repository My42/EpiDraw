import { connect } from 'mongoose'

import { Users } from '@/interfaces'

console.log(Users)

import {
  ApolloServer,
  mergeSchemas
} from 'apollo-server'
import { createContext } from './graphQL/utils'
import authSchema from './graphQL/Auth'

connect('mongodb://database:27017/EpiDraw',
  { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    const server = new ApolloServer({
      context: createContext,
      playground: true,
      schema: mergeSchemas({ schemas: [authSchema] })
    })
    server.listen(4242)
      .then(({ url }) => console.log(`🚀  Server ready at ${url}`))
      .catch(err => console.log(err))
  })
  .catch(error => console.log(error))
