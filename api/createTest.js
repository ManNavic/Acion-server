const mongoose = require('mongoose')
const Test = require('../models/Test')

const mongoUri =
  'mongodb+srv://navickis:YbSUQpHy83YGDJ3h@avion.hio6z2s.mongodb.net/?retryWrites=true&w=majority'

mongoose.connect(mongoUri)

module.exports = async (req, res) => {
  try {
    const feed = new Test({
      title: req.body.title,
      description: req.body.description,
      imageUrl: req.body.imageUrl
    })
    const newFeed = await feed.save()
    return res.status(201).json(newFeed)
  } catch (error) {
    return res.status(400).json({ message: error.message })
  }
}
