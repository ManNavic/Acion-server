const { getTest, createTest } = require('../domain/Test')
const express = require('express')
const router = express.Router()

// GET
router.get('/', getTest)
// POST
router.post('/', createTest)
module.exports = router
