const mongoose = require('mongoose')

const testSchema = new mongoose.Schema({
  title: {
    type: String
  },
  description: {
    type: String
  },
  imageUrl: {
    type: String
  }
})
module.exports = mongoose.model('Test', testSchema)
