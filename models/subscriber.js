const mongoose = require('mongoose')

const Schema = mongoose.Schema

const SubscriberSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  subscriberSince: {
    type: Date,
    required: true,
    default: Date.now
  }
})

module.exports = mongoose.model('Subscribers', SubscriberSchema)
