const { getUser } = require('../domain/user')
const express = require('express')
const router = express.Router()

// GET
router.get('/', getUser)

module.exports = router
