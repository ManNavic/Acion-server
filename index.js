require('dotenv').config()
const bodyParser = require('body-parser')
const express = require('express')
const mongoose = require('mongoose')
const auth = require('./utils/tokenAuth')
const app = express()
const PORT = process.env.PORT || 4000
app.use(bodyParser.json())
mongoose.set('strictQuery', false)
const cors = require('cors')
app.use(cors())
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI)
    console.log(`MongoDB Connected: ${conn.connection.host}`)
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}
// NEW ROUTES TO TEST
const productsRouter = require('./routes/products')
app.use('/products', productsRouter)

const registerRouter = require('./routes/register')
app.use('/register', registerRouter)

const subscriberRouter = require('./routes/subsciber')
app.use('/subscriber', subscriberRouter)

const loginRouter = require('./routes/login')
app.use('/login', loginRouter)

const usersRouters = require('./routes/user')
app.use('/user', auth, usersRouters)
///

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`listening for requests on ${PORT}`)
  })
})
