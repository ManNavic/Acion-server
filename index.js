require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const app = express()
const port = 4000
const mongoUri =
  'mongodb+srv://navickis:YbSUQpHy83YGDJ3h@avion.hio6z2s.mongodb.net/?retryWrites=true&w=majority'

const cors = require('cors')
console.log(mongoUri)
mongoose.connect(mongoUri)
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))
app.use(express.json())
app.use(cors())

const feedRouter = require('./routes/Test')
app.use('/test', feedRouter)

app.listen(port, () => {
  console.log(`Server is running on ${port} port`)
})
