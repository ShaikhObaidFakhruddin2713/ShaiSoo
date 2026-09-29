const express = require('express');
const multer = require('multer');

const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct
} = require('../controller/productController');

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage()
});

router.get('/', getProducts);

router.get('/:id', getProductById);

router.post('/', upload.single('image'), createProduct);

router.put('/:id', upload.single('image'), updateProduct);

module.exports = router;