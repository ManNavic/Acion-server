const User = require('../models/user')
const { passwordValidation } = require('../utils/passwordValidation')
const saltRounds = 10
const bcrypt = require('bcrypt')
const getUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user.email })
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }
    const userDataToSend = {
      email: user.email,
      profile: [
        {
          firstName: user.profile[0].firstName,
          lastName: user.profile[0].lastName,
          additionalInfo: [
            {
              birthday: user.profile[0].additionalInfo.birthday,
              phoneNumber: user.profile[0].additionalInfo.phoneNumber
            }
          ]
        }
      ]
    }

    res.status(200).json(userDataToSend)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
const updateUserPassword = async (req, res) => {
  const { password } = req.body
  const validationErrors = passwordValidation(password)

  if (validationErrors.length > 0) {
    return res.status(400).json({
      errors: validationErrors
    })
  }

  try {
    const user = await User.findOne({ email: req.user.email })
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    const hash = await bcrypt.hash(password, saltRounds)
    user.password = hash

    const updatedUser = await user.save()

    res.status(200).json(updatedUser)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

const updateUser = async (req, res) => {
  const { email, profile } = req.body
  const { firstName, lastName, additionalInfo } = profile[0]
  const { birthday, phoneNumber } = additionalInfo[0]

  try {
    const user = await User.findOne({ email: req.user.email })

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    user.email = email

    const profiles = user.profile

    if (!profiles || profiles.length === 0) {
      return res.status(404).json({ message: 'Profile not found' })
    }

    const userProfile = profiles[0]

    userProfile.firstName = firstName
    userProfile.lastName = lastName

    // Check and add additional info
    if (additionalInfo) {
      const existingInfo = userProfile.additionalInfo[0]

      if (!existingInfo) {
        const newInfo = {
          birthday,
          phoneNumber
        }

        userProfile.additionalInfo.push(newInfo)
      } else {
        // If additional info exists, update it
        existingInfo.birthday = birthday
        existingInfo.phoneNumber = phoneNumber
      }
    }

    const updatedUser = await user.save()
    res.status(200).json({ message: 'User updated successfully', updatedUser })
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

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    // Assuming you want to update the address in the first profile
    const profile = user.profile[0]
    const address = profile.shippingAddress[0] // Fix: Use profile.shippingAddress instead of user.profile[0].shippingAddress

    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' })
    }

    if (!address) {
      const newAddress = {
        street,
        houseNumber,
        city,
        country,
        postCode
      }

      // Add the new address to the profile
      profile.shippingAddress.push(newAddress) // Fix: Use profile.shippingAddress instead of profile.billingAddress

      await user.save()
      return res
        .status(200)
        .json({ message: 'Shipping address added successfully', user })
    }

    // Update the existing address
    address.street = street
    address.houseNumber = houseNumber
    address.city = city
    address.country = country
    address.postCode = postCode

    await user.save()

    return res
      .status(200)
      .json({ message: 'Shipping address updated successfully', user })
  } catch (error) {
    return res.status(500).json({ message: error.message })
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

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    // Assuming you want to update the address in the first profile
    const profile = user.profile[0]
    const address = profile.billingAddress[0] // Fix: Use profile.billingAddress instead of user.profile[0].billingAddress

    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' })
    }

    if (!address) {
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
      return res
        .status(200)
        .json({ message: 'Billing address added successfully', user })
    }

    // Update the existing address
    address.street = street
    address.houseNumber = houseNumber
    address.city = city
    address.country = country
    address.postCode = postCode

    await user.save()

    return res
      .status(200)
      .json({ message: 'Billing address updated successfully', user })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

module.exports = {
  getUser,
  updateUser,
  addUserShippingAddress,
  updateShippingAddress,
  addUserBillingAddress,
  updateBillingAddress,
  deleteUser,
  updateUserPassword
}
