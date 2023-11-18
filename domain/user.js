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
const deleteUser = async (req, res) => {
  try {
    const user = await User.findOneAndDelete({ email: req.user.email })
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }
    res
      .status(200)
      .json({ message: 'User deleted successfully', deletedUser: user })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
const addUserAddress = async (req, res) => {
  const { street, houseNumber, city, country, postCode } = req.body
  try {
    const user = await User.findOne({ email: req.user.email })

    console.log(user)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    // Assuming you want to add the address to the first profile
    const profile = user.profile[0]
    const address = user.profile[0].address[0]

    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' })
    }
    if (address) {
      return res.status(404).json({ message: 'Address already exist' })
    }

    const newAddress = {
      street,
      houseNumber,
      city,
      country,
      postCode
    }

    // Add the new address to the profile
    profile.address.push(newAddress)

    await user.save()

    res.status(201).json({ message: 'Address added successfully', user })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
const updateAddress = async (req, res) => {
  const { street, houseNumber, city, country, postCode } = req.body

  try {
    const user = await User.findOne({ email: req.user.email })

    console.log(user)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    // Assuming you want to update the address in the first profile
    const profile = user.profile[0]
    const address = user.profile[0].address[0]

    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' })
    }
    if (!address) {
      return res.status(404).json({ message: 'Address not found' })
    }

    // Update the existing address
    address.street = street
    address.houseNumber = houseNumber
    address.city = city
    address.country = country
    address.postCode = postCode

    await user.save()

    res.status(200).json({ message: 'Address updated successfully', user })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = { getUser, addUserAddress, updateAddress, deleteUser }
