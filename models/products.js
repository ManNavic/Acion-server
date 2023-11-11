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
      required: true
    },
    width: {
      type: String,
      required: true
    },
    depth: {
      type: String,
      required: true
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
  }
})

module.exports = mongoose.model('Products', ProductSchema)
