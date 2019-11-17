import { after, before } from 'mocha'
import * as mongoose from 'mongoose'

console.log('INIT TESTS', before)

before(async () => {
  console.log('BEFORE')
  await mongoose.connect('mongodb://localhost:27017/EpiDrawTest',
    { useNewUrlParser: true, useUnifiedTopology: true })
})

after(async () => {
  console.log('AFTER')
  await mongoose.connection.dropDatabase()
  await mongoose.disconnect()
})
