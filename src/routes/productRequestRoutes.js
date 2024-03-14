// productRequestRoutes.js
const express = require('express');
const router = express.Router();
const productRequestController = require('../controllers/productRequestController');
const multer = require('multer');
const path = require('path');

// Set up multer storage
const storage = multer.diskStorage({
    destination: '/tmp',
    filename: (req, file, cb) => {
        // Ensure unique filenames by appending current timestamp
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
        const extension = path.extname(file.originalname);
        cb(null, `${file.fieldname}-${uniqueSuffix}${extension}`);
    }
});

// Set up multer upload middleware
const upload = multer({ storage: storage });
// Product request routes
router.post('/products/request',  upload.single('picture'), productRequestController.createProductRequest);
router.get('/products/requests', productRequestController.getAllProductRequests);
router.get('/products/requests/:requestId', productRequestController.getProductRequestById);
router.put('/products/requests/:requestId/status', productRequestController.updateProductRequestStatus);
router.get('/products/reques/user/:userId', productRequestController.getProductRequestsByUserId);

module.exports = router;
