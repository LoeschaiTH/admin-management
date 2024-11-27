const express = require('express');
const router = express.Router();
const settingController = require('../controllers/settingControllers');


router.get('/settings', settingController.setting);
module.exports = router;