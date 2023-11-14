const mongoose = require('mongoose')

const Schema = mongoose.Schema

const ProductSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  dimensions: {
    height: {
      type: String,
      required: false
    },
    width: {
      type: String,
      required: false
    },
    depth: {
      type: String,
      required: false
    }
  },
  price: {
    type: Number,
    required: true
  },
  stock: {
    type: Number,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Products', ProductSchema)
