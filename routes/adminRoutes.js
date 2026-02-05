const express = require('express');
const adminUserController = require('../controllers/admin/user');

const router = express.Router();

// User routes
router.post('/users', adminUserController.createUser);
router.get('/users', adminUserController.getUsers);


module.exports = router;
