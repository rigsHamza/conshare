// productRoutes.js
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
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
// CRUD routes for products
router.get('/products', productController.getAllProducts);
router.get('/productsi/user/:id', productController.getProductsByOwnerId);
router.get('/productsi/:id', productController.getProductById);
// router.get('/products/:productId', productController.getProductById);
router.post('/products', upload.single('picture'), productController.createProduct);
router.put('/products/:productId',  upload.single('picture'), productController.updateProduct);
router.delete('/products/:productId', productController.deleteProduct);
router.get('/products/category/:categoryId', productController.getProductsByCategoryId);
router.get('/products/order/:orderId', productController.getProductsByOrderId);
module.exports = router;
