const {
  getUser,
  deleteUser,
  addAdditionalInfo,
  updateAdditionalInfo,
  addUserBillingAddress,
  updateBillingAddress,
  addUserShippingAddress,
  updateShippingAddress,
  updateUser,
  updateUserProfile
} = require('../domain/user')
const express = require('express')
const router = express.Router()

// GET
router.get('/', getUser)
router.delete('/', deleteUser)
router.patch('/user', updateUser)
router.patch('/profile', updateUserProfile)
router.post('/billing', addUserBillingAddress)
router.patch('/billing', updateBillingAddress)
router.post('/shipping', addUserShippingAddress)
router.patch('/shipping', updateShippingAddress)
router.post('/info', addAdditionalInfo)
router.patch('/info', updateAdditionalInfo)

module.exports = router
