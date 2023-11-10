const mongoose = require('mongoose')
const Test = require('../models/Test')

const mongoUri =
  'mongodb+srv://navickis:YbSUQpHy83YGDJ3h@avion.hio6z2s.mongodb.net/?retryWrites=true&w=majority'

mongoose.connect(mongoUri)

module.exports = async (req, res) => {
  try {
    const feed = await Test.find()
    if (!feed) {
      return res.status(404).json({ message: 'Feed not found' })
    } else {
      return res.json(feed)
    }
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}
