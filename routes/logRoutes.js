const express = require('express');
const getExerciseLogs = require('../controllers/logController');
const router = express.Router();

// Define routes
router.get('/users/:_id/logs', getExerciseLogs);

module.exports = router;
