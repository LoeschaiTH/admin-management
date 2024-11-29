const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsControllers');


router.get('/products', productsController.getProducts);

router.post('/add-product', productsController.addProduct);
router.post('/delete-product/:id', productsController.deleteProduct);
router.post('/upload-information', productsController.uploadFile);


module.exports = router;