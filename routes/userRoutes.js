const express = require('express');
const { createUser, getAllUsers } = require('../controllers/userControllers');
const router = express.Router();

// define routes for user endpoint
router.post('/users', createUser);
router.get('/users', getAllUsers);

module.exports = router;
