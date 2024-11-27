const express = require('express');
const router = express.Router();
const userController = require('../controllers/userControllers');

router.get('/management', userController.getAllUsers);
router.get('/management/edit/:id', userController.editUser);


router.post('/add-user', userController.addUser);
router.post('/delete/:id', userController.deleteUser);
router.post('/edit/:id', userController.updateUser);

module.exports = router;
