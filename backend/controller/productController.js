const Product = require('../models/Product');
const cloudinary = require('../config/cloudinary');

const uploadToCloudinary = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: 'shaisoo-products'
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );

    stream.end(fileBuffer);
  });
};

const getProducts = async (req, res) => {
  try {
    const products = await Product.find();

    res.status(200).json(products);
  } catch (error) {
    console.log('Get products error:', error);

    res.status(500).json({
      message: error.message
    });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: 'Product not found'
      });
    }

    res.status(200).json(product);
  } catch (error) {
    console.log('Get product error:', error);

    res.status(500).json({
      message: error.message
    });
  }
};

const createProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      stockQuantity
    } = req.body;

    if (
      !name ||
      !description ||
      !price ||
      !category ||
      stockQuantity === undefined
    ) {
      return res.status(400).json({
        message: 'All product fields are required'
      });
    }

    let imageUrl = '';

    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer);
      imageUrl = result.secure_url;
    }

    const product = await Product.create({
      name,
      description,
      price: Number(price),
      category,
      stockQuantity: Number(stockQuantity),
      imageUrl
    });

    res.status(201).json(product);
  } catch (error) {
    console.log('Create product error:', error);

    res.status(500).json({
      message: error.message
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: 'Product not found'
      });
    }

    const {
      name,
      description,
      price,
      category,
      stockQuantity
    } = req.body;

    if (name) {
      product.name = name;
    }

    if (description) {
      product.description = description;
    }

    if (price !== undefined) {
      product.price = Number(price);
    }

    if (category) {
      product.category = category;
    }

    if (stockQuantity !== undefined) {
      product.stockQuantity = Number(stockQuantity);
    }

    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer);
      product.imageUrl = result.secure_url;
    }

    const updatedProduct = await product.save();

    res.status(200).json(updatedProduct);
  } catch (error) {
    console.log('Update product error:', error);

    res.status(500).json({
      message: error.message
    });
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct
};