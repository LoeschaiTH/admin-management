const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportControllers');


router.get('/reports', reportController.getReport);
module.exports = router;