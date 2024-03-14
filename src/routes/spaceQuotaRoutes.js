// src/routes/spaceQuotaRoutes.js

const express = require('express');
const router = express.Router();
const spaceQuotaController = require('../controllers/spaceQuotaController');

router.get('/space/user/:userId', spaceQuotaController.getUserSpaceQuota);
router.post('/space/user/:userId', spaceQuotaController.updateUserSpaceQuota);

module.exports = router;
