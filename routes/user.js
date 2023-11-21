const {
  getUser,
  deleteUser,
  addUserBillingAddress,
  updateBillingAddress,
  addUserShippingAddress,
  updateShippingAddress,
  updateUser,
  updateUserPassword,
  getUserFullData
} = require('../domain/user')
const express = require('express')
const router = express.Router()

router.get('/', getUser)
router.get('/user', getUserFullData)
router.delete('/', deleteUser)
router.patch('/profile', updateUser)
router.patch('/password', updateUserPassword)
router.post('/billing', addUserBillingAddress)
router.patch('/billing', updateBillingAddress)
router.post('/shipping', addUserShippingAddress)
router.patch('/shipping', updateShippingAddress)
module.exports = router
