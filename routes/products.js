const {
  getProducts,
  createProduct,
  getProductsByCategory
} = require('../domain/products')
const express = require('express')
const router = express.Router()

// GET
router.get('/', getProducts)
// POST
router.post('/', createProduct)

router.post('/:category', getProductsByCategory)

module.exports = router
