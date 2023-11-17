const Subscriber = require('../models/subscriber')
const { emailValidation } = require('../utils/emailValidation')

const addSubscriber = async (req, res) => {
  const { email } = req.body

  if (!emailValidation(email)) {
    return res
      .status(400)
      .json({ errors: ['Please enter valid email address'] })
  }
  try {
    const existingSubscriber = await Subscriber.findOne({ email })
    if (existingSubscriber) {
      return res
        .status(409)
        .json({ errors: ['Email is already in use, please login'] })
    }

    const subscriber = new Subscriber({
      email
    })
    const newSubscriber = await subscriber.save()
    res.status(201).json(newSubscriber)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}
module.exports = { addSubscriber }
