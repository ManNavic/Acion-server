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
    const { title, description, dimensions, price, stock, imageUrl } = req.body

    // Check if any required property is missing
    if (
      !title ||
      !description ||
      !dimensions ||
      !price ||
      !stock ||
      !imageUrl
    ) {
      return res.status(400).json({ message: 'Invalid request body' })
    }

    // Check if dimensions object is present and has height, width, and depth properties
    if (
      !dimensions ||
      typeof dimensions !== 'object' ||
      !dimensions.height ||
      !dimensions.width ||
      !dimensions.depth
    ) {
      return res
        .status(400)
        .json({ message: 'Invalid dimensions in request body' })
    }
    // Create a new Product instance
    const product = new Product({
      title,
      description,
      dimensions: {
        height: dimensions.height,
        width: dimensions.width,
        depth: dimensions.depth
      },
      price,
      stock,
      imageUrl
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

module.exports = { getProducts, createProduct }
