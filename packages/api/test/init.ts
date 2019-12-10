import { after, before } from 'mocha'
import * as mongoose from 'mongoose'

before(async () => {
  console.log('BEFORE')
  try {
    await mongoose.connect('mongodb://database:27017/EpiDrawTest',
      { useNewUrlParser: true, useUnifiedTopology: true })
  } catch (e) {
    console.log('ERROR = ', e)
  }
})

after(async () => {
  console.log('AFTER')
  try {
    await mongoose.connection.dropDatabase()
    await mongoose.disconnect()
  } catch (e) {
    console.log('ERROR = ', e)
  }
})
