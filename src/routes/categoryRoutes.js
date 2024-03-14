const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
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

// Routes
router.post('/categories', upload.single('picture'), categoryController.createCategory);
router.get('/categories', categoryController.getAllCategories);
router.get('/categories/:id', categoryController.getCategoryById);
router.delete('/category/:id', categoryController.deleteCategoryById);

module.exports = router;
