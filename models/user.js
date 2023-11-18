const mongoose = require('mongoose')

const billingAddressSchema = new mongoose.Schema({
  street: {
    type: String,
    required: true
  },
  houseNumber: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  postCode: {
    type: String,
    required: true
  }
})
const additionalInfoSchema = new mongoose.Schema({
  birthday: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  }
})
const shippingAddressSchema = new mongoose.Schema({
  street: {
    type: String,
    required: true
  },
  houseNumber: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  postCode: {
    type: String,
    required: true
  }
})

const profileSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  billingAddress: [billingAddressSchema],
  shippingAddress: [shippingAddressSchema],
  additionalInfo: [additionalInfoSchema]
})

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      required: true,
      default: Date.now
    },
    updatedAt: {
      type: Date,
      required: true,
      default: Date.now
    },
    profile: [profileSchema]
  },
  {
    timestamps: true,
    versionKey: false
  }
)

module.exports = mongoose.model('User', userSchema)
