const { addSubscriber } = require('../domain/subscriber')
const express = require('express')
const router = express.Router()

// GET
router.post('/', addSubscriber)

module.exports = router
