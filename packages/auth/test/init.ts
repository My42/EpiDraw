import { after, before } from 'mocha'
import { connect, connection, disconnect } from 'mongoose'

before(async () => {
  console.log('BEFORE')
  try {
    await connect(`mongodb://${process.env.DATABASE_HOST || 'localhost'}:27017/EpiDrawTest`,
      { useNewUrlParser: true, useUnifiedTopology: true })
  } catch (e) {
    console.log('ERROR = ', e)
  }
})

after(async () => {
  console.log('AFTER')
  try {
    await connection.dropDatabase()
    await disconnect()
  } catch (e) {
    console.log('ERROR = ', e)
  }
})
