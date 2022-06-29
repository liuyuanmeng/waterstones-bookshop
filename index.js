import mongoose from 'mongoose'
import express from 'express'
import router from './config/router.js'
import 'dotenv/config'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const logger = (req, res, next) => {
  console.log(`🚨 - Incoming request on ${req.method} - ${req.url}`)
  next()
}

const startServer = async () => {

  const app = express()

  app.use(logger)
  app.use(express.json())
  app.use('/api', router)

  app.use(express.static(path.join(__dirname, 'client', 'build')))

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
  })


  // app.get('/', (req, res, next) => {
  //   return res.end('Welcome to our API.')
  // })

  await mongoose.connect(process.env.MONGODB_CONNECTION_STRING)
  console.log('Connected to MongoDB!')
  app.listen(process.env.PORT, () => console.log(`🚀 - Server listening on Port ${process.env.PORT}`))
} 

startServer()