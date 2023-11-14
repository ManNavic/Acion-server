const Product = require('../models/products')

const getProducts = async (req, res) => {
  try {
    const products = await Product.find()
    if (!products) {
      return res.status(404).json({ message: 'Products not found' })
    } else return res.json(products)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
const createProduct = async (req, res) => {
  try {
    // Destructure the required properties from req.body
    const { title, description, dimensions, price, stock, imageUrl, category } =
      req.body

    // Create a new Product instance

    const product = new Product({
      title,
      description,
      dimensions: dimensions || {}, // Set default empty object if dimensions is undefined
      price,
      stock,
      imageUrl,
      category
    })

    // Save the new product to the database
    const newProduct = await product.save()

    // Respond with the newly created product
    res.status(201).json(newProduct)
  } catch (error) {
    console.log(req.body)
    // Handle any errors during the process
    res.status(400).json({ message: error.message })
  }
}
const getProductsByCategory = async (req, res) => {
  try {
    // Assuming the category is provided in the request query (e.g., /products?category=electronics)
    const category = req.query.category
    console.log(category)
    if (!category) {
      return res.status(400).json({ message: 'Category parameter is missing' })
    }

    const products = await Product.find({ category })

    if (!products || products.length === 0) {
      return res
        .status(404)
        .json({ message: `Products not found for category: ${category}` })
    }

    return res.json(products)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
const getProductById = async (req, res) => {
  try {
    // Assuming the ID is provided as a route parameter (e.g., /products/:id)
    const id = req.params.id

    console.log(id)

    if (!id) {
      return res.status(400).json({ message: 'ID parameter is missing' })
    }

    const product = await Product.findById(id)

    if (!product) {
      return res
        .status(404)
        .json({ message: `Product not found for ID: ${id}` })
    }

    return res.json(product)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = {
  getProducts,
  createProduct,
  getProductsByCategory,
  getProductById
}
