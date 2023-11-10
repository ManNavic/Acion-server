const Test = require('../models/Test')

const getTest = async (req, res) => {
  try {
    const feed = await Test.find()
    if (!feed) {
      return res.status(404).json({ message: 'Feed not found' })
    } else return res.json(feed)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
const createTest = async (req, res) => {
  try {
    const feed = new Test({
      title: req.body.title,
      description: req.body.description,
      imageUrl: req.body.imageUrl
    })
    const newFeed = await feed.save()
    res.status(201).json(newFeed)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}
module.exports = { getTest, createTest }
