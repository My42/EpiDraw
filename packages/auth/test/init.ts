import { after, before } from 'mocha'
import { connect, connection, disconnect } from '@shared/utils/db'

before(async () => {
  console.log('BEFORE')
  try {
    await connect('mongodb://database:27017/EpiDrawTest',
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
