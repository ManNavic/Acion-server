const {
  getProducts,
  createProduct,
  getProductsByCategory,
  getProductById
} = require('../domain/products')
const express = require('express')
const router = express.Router()

// GET
router.get('/', getProducts)
// POST
router.post('/', createProduct)

router.get('/category', getProductsByCategory)

router.get('/:id', getProductById)

module.exports = router
