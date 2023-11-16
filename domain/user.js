const User = require('../models/user')
const getUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user.email })
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }
    res.status(200).json(user)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
module.exports = { getUser }
