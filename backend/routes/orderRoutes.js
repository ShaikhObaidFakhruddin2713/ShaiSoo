const express = require('express');

const { protect } = require('../middleware/authMiddleware');
const { admin } = require('../middleware/adminMiddleware');

const {
  addOrderItems,
  getMyOrders,
  getOrders,
  updateOrderStatus
} = require('../controller/orderController');

const router = express.Router();

// Create an order
router
  .route('/')
  .post(protect, addOrderItems);

// Get logged-in user's orders
router
  .route('/myorders')
  .get(protect, getMyOrders);

// Admin: get all orders
router
  .route('/all')
  .get(protect, admin, getOrders);

// Admin: update order status
router
  .route('/:id')
  .put(protect, admin, updateOrderStatus);

module.exports = router;