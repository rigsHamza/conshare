// src/routes/containerRoutes.js

const express = require('express');
const router = express.Router();
const containerController = require('../controllers/containerController');

router.get('/available-containers', containerController.getAvailableContainer);
router.get('/all-available-containers', containerController.getAllAvailableContainerAdmin);
router.post('/container', containerController.createContainer);
router.patch('container/:containerId', containerController.updateContainerSpace);
router.patch('/container/:containerId/shipped', containerController.markContainerAsShipped);

module.exports = router;
