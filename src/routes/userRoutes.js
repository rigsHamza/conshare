const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
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
router.post('/signup', userController.signup);
router.post('/signin', userController.signin);
router.post('/forgetPassword', userController.forgetPassword);
router.put('/edituser/:id', upload.single('picture'), userController.updateUserById);
router.get('/verify/:token', userController.verifyUserByToken);
router.get('/all-users', userController.GetAllUsers);
module.exports = router;
