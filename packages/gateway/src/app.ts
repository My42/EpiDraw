import {
  ApolloServer,
  mergeSchemas
} from 'apollo-server'
import { connect } from '@shared/utils/db'
// import { createContext } from '../utils'
import { AuthSchema } from './service/schemas'

connect('mongodb://database:27017/EpiDraw',
  { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    const server = new ApolloServer({
      // context: createContext,
      playground: true,
      schema: mergeSchemas({ schemas: [AuthSchema] })
    })
    server.listen(8081)
      .then(({ url }) => console.log(`🚀 Gateway service ready at ${url}`))
      .catch(err => console.log(err))
  })
  .catch(error => console.log(error))
