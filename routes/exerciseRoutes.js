const express = require('express');
const {
  createExercise,
  deleteExercisesAndUsers,
} = require('../controllers/exerciseController');
const router = express.Router();

router.post('/users/:_id/exercises', createExercise);
router.delete('/users', deleteExercisesAndUsers);
module.exports = router;
