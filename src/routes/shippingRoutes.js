const express = require('express');
const router = express.Router();
const shippingController = require('../controllers/shippingController');

// Shipping routes
router.post('/users/:userId/shippings', shippingController.createShipping);
router.put('/shippings/:shippingId', shippingController.updateShipping);
router.get('/users/:userId/shippings', shippingController.getShippingByUserId);

module.exports = router;
