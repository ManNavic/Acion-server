const {
  getUser,
  deleteUser,
  addUserBillingAddress,
  updateBillingAddress,
  addUserShippingAddress,
  updateShippingAddress,
  updateUser
} = require('../domain/user')
const express = require('express')
const router = express.Router()

// GET
router.get('/', getUser)
router.delete('/', deleteUser)
router.patch('/profile', updateUser)
router.post('/billing', addUserBillingAddress)
router.patch('/billing', updateBillingAddress)
router.post('/shipping', addUserShippingAddress)
router.patch('/shipping', updateShippingAddress)
module.exports = router
