import { connect } from 'mongoose'
import bodyParser from 'body-parser'
import express from 'express'
import 'express-async-errors'

import { Users as UsersInterface } from '@auth/models'
import { Auth } from '@auth/service'
import { EpiDrawError } from '@auth/errors'

connect('mongodb://database:27017/EpiDraw',
  { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    const service = new Auth(new UsersInterface())

    const app = express()

    app.use(bodyParser.json())

    app.post('/signUp', async (req, res) => {
      const { email, username, password } = req.body || { }

      const result = await service.signUp({ email, username, password })
      return res.json(result)
    })

    app.post('/signIn', async (req, res) => {
      const { email, password } = req.body || { }
      const token = await service.signIn({ email, password })

      return res.json({ token })
    })

    app.get('/verify', async (req, res) => {
      const { token } = req.body || { }
      const decoded = await service.verify({ token })

      return res.json({ token: decoded })
    })

    app.use((err, req, res, next) => {
      if (!err) return next()
      if (err instanceof EpiDrawError) {
        const { code, message } = err as EpiDrawError
        res.status(400).send({ code, message })
      } else {
        res.status(500).send('Internal Server Error')
      }
    })

    app.listen(8081, () => console.log(`🚀 Auth service ready on port '${8081}'`))
  })
  .catch(error => console.log(error))
