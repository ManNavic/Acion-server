const { getProducts, createProduct } = require('../domain/products')
const express = require('express')
const router = express.Router()

// GET
router.get('/', getProducts)
// POST
router.post('/', createProduct)

module.exports = router
