const express = require('express');
const router = express.Router();
const adminUserController = require('../controllers/adminUserController');
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
router.post('/signup', adminUserController.signup);
router.post('/signin', adminUserController.signin);
router.post('/forgetPassword', adminUserController.forgetPassword);
router.put('/edituser/:id', upload.single('picture'), adminUserController.updateUserById);
router.put('/editpassword/:id', adminUserController.updatePasswordById);
// router.get('/verify/:token', adminUserController.verifyUserByToken);
router.get('/approved-users', adminUserController.getAllApprovedUsers);
router.get('/requested-users', adminUserController.requestedUsers);
router.get('/verify-user/:id', adminUserController.verifyUserByOwner);
router.get('/delete-user/:id', adminUserController.DeleteUserByOwner);
module.exports = router;
