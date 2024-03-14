const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// CRUD routes for orders
router.post('/orders', orderController.createOrder);
router.get('/orders', orderController.getAllOrders);
router.get('/orders/:orderId', orderController.getOrderById);
router.put('/orders/:orderId/status', orderController.updateOrderStatus);
router.delete('/orders/:orderId', orderController.deleteOrder);
router.get('/orders/user/:userId', orderController.getOrdersByUserID);

module.exports = router;
