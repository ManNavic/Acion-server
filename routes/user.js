const {
  getUser,
  addUserAddress,
  updateAddress,
  deleteUser
} = require('../domain/user')
const express = require('express')
const router = express.Router()

// GET
router.get('/', getUser)
router.post('/', addUserAddress)
router.patch('/', updateAddress)
router.delete('/', deleteUser)

module.exports = router
