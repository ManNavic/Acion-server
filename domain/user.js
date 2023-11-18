const User = require('../models/user')
const saltRounds = 10
const bcrypt = require('bcrypt')
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
const updateUser = async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await User.findOne({ email: req.user.email })

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    // Update user properties
    user.email = email

    if (password) {
      // Only update the password if a new one is provided
      const hash = await bcrypt.hash(password, saltRounds)
      user.password = hash
    }

    // Save the updated user
    const updatedUser = await user.save()

    // Respond with the updated user
    res.status(200).json({ message: 'User updated successfully', updatedUser })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
const updateUserProfile = async (req, res) => {
  const { firstName, lastName } = req.body

  try {
    const user = await User.findOne({ email: req.user.email })

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }
    const profile = user.profile[0]
    // Update user properties
    profile.firstName = firstName
    profile.lastName = lastName

    // Save the updated user
    const updatedUser = await user.save()

    // Respond with the updated user
    res
      .status(200)
      .json({ message: 'User profile updated successfully', updatedUser })
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
const addUserShippingAddress = async (req, res) => {
  const { street, houseNumber, city, country, postCode } = req.body
  try {
    const user = await User.findOne({ email: req.user.email })

    console.log(user)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    // Assuming you want to add the address to the first profile
    const profile = user.profile[0]
    const shippingAddress = user.profile[0].shippingAddress[0]

    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' })
    }
    if (shippingAddress) {
      return res.status(404).json({ message: 'Shipping Address already exist' })
    }

    const newAddress = {
      street,
      houseNumber,
      city,
      country,
      postCode
    }

    // Add the new address to the profile
    profile.shippingAddress.push(newAddress)

    await user.save()

    res
      .status(201)
      .json({ message: 'Shipping address added successfully', user })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
const updateShippingAddress = async (req, res) => {
  const { street, houseNumber, city, country, postCode } = req.body

  try {
    const user = await User.findOne({ email: req.user.email })

    console.log(user)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    // Assuming you want to update the address in the first profile
    const profile = user.profile[0]
    const address = user.profile[0].shippingAddress[0]

    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' })
    }
    if (!address) {
      return res.status(404).json({ message: 'Shipping address not found' })
    }

    // Update the existing address
    address.street = street
    address.houseNumber = houseNumber
    address.city = city
    address.country = country
    address.postCode = postCode

    await user.save()

    res
      .status(200)
      .json({ message: 'Shipping address updated successfully', user })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
const addUserBillingAddress = async (req, res) => {
  const { street, houseNumber, city, country, postCode } = req.body
  try {
    const user = await User.findOne({ email: req.user.email })

    console.log(user)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    // Assuming you want to add the address to the first profile
    const profile = user.profile[0]
    const address = user.profile[0].billingAddress[0]

    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' })
    }
    if (address) {
      return res.status(404).json({ message: 'Billing address already exist' })
    }

    const newAddress = {
      street,
      houseNumber,
      city,
      country,
      postCode
    }

    // Add the new address to the profile
    profile.billingAddress.push(newAddress)

    await user.save()

    res
      .status(201)
      .json({ message: 'Billing address added successfully', user })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
const updateBillingAddress = async (req, res) => {
  const { street, houseNumber, city, country, postCode } = req.body

  try {
    const user = await User.findOne({ email: req.user.email })

    console.log(user)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    // Assuming you want to update the address in the first profile
    const profile = user.profile[0]
    const address = user.profile[0].billingAddress[0]

    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' })
    }
    if (!address) {
      return res.status(404).json({ message: 'Billing Address not found' })
    }

    // Update the existing address
    address.street = street
    address.houseNumber = houseNumber
    address.city = city
    address.country = country
    address.postCode = postCode

    await user.save()

    res
      .status(200)
      .json({ message: 'Billing address updated successfully', user })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
const addAdditionalInfo = async (req, res) => {
  const { birthday, phoneNumber } = req.body
  try {
    const user = await User.findOne({ email: req.user.email })

    console.log(user)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    const profile = user.profile[0]
    const additionalInfo = user.profile[0].additionalInfo[0]

    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' })
    }
    if (additionalInfo) {
      return res.status(404).json({ message: 'Additional ifno already exist' })
    }

    const newInfo = {
      birthday,
      phoneNumber
    }

    // Add the new address to the profile
    profile.additionalInfo.push(newInfo)

    await user.save()

    res
      .status(201)
      .json({ message: 'Additional info added successfully', user })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
const updateAdditionalInfo = async (req, res) => {
  const { birthday, phoneNumber } = req.body

  try {
    const user = await User.findOne({ email: req.user.email })

    console.log(user)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    // Assuming you want to update the address in the first profile
    const profile = user.profile[0]
    const additionalInfo = user.profile[0].additionalInfo[0]

    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' })
    }
    if (!additionalInfo) {
      return res.status(404).json({ message: 'Additional info  not found' })
    }

    // Update the existing address
    additionalInfo.birthday = birthday
    additionalInfo.phoneNumber = phoneNumber

    await user.save()

    res
      .status(200)
      .json({ message: 'Additional info updated successfully', user })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = {
  getUser,
  updateUser,
  updateUserProfile,
  addUserShippingAddress,
  updateShippingAddress,
  addUserBillingAddress,
  updateBillingAddress,
  deleteUser,
  addAdditionalInfo,
  updateAdditionalInfo
}
