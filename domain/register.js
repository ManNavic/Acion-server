const bcrypt = require('bcrypt')
const { passwordValidation } = require('../utils/passwordValidation')
// const { postCodeValidation } = require('../utils/postCodeValidation')
const { emailValidation } = require('../utils/emailValidation')
const User = require('../models/user')
const saltRounds = 10

const createUser = async (req, res) => {
  console.log(req.body)
  const { email, password } = req.body
  const validationErrors = passwordValidation(password)
  //   const validatePostCod = postCodeValidation(postCode)
  if (!emailValidation(email)) {
    return res
      .status(400)
      .json({ errors: ['Please enter valid email address'] })
  }
  if (validationErrors.length > 0) {
    return res.status(400).json({
      errors: validationErrors
    })
  }
  //   if (!firstName) {
  //     return res.status(400).json({ errors: ['Please enter your first name'] })
  //   }
  //   if (!lastName) {
  //     return res.status(400).json({ errors: ['Please enter your last name'] })
  //   }
  //   if (!street) {
  //     return res.status(400).json({ errors: ['Please enter your street name'] })
  //   }
  //   if (!houseNumber) {
  //     return res.status(400).json({ errors: ['Please enter your house number'] })
  //   }
  //   if (!city) {
  //     return res.status(400).json({ errors: ['Please enter your city name'] })
  //   }
  //   if (!postCode) {
  //     return res.status(400).json({ errors: ['Please enter your post code'] })
  //   }
  //   if (validatePostCod.length > 0) {
  //     return res.status(400).json({
  //       errors: validatePostCod
  //     })
  //   }
  //   if (!country) {
  //     return res.status(400).json({ errors: ['Please select your country'] })
  //   }
  try {
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res
        .status(409)
        .json({ errors: ['Email is already in use, please login'] })
    }
    const hash = await bcrypt.hash(password, saltRounds)
    const user = new User({
      email,
      password: hash
    })
    delete user.password
    const newUser = await user.save()
    res.status(201).json(newUser)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}
module.exports = { createUser }
