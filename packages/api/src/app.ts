import * as mongoose from 'mongoose'

import {
  ApolloServer,
  mergeSchemas
} from 'apollo-server'
import authSchema from './services/auth/graphQL'

mongoose.connect('mongodb://localhost:27017/EpiDraw',
  { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    const server = new ApolloServer({
      playground: true,
      schema: mergeSchemas({ schemas: [authSchema] })
    })

    server.listen(4242)
      .then(({ url }) => console.log(`🚀  Server ready at ${url}`))
      .catch(err => console.log(err))
  })
  .catch(error => console.log(error))
