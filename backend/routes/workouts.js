const express = require('express');
const router = express.Router();
const {
    createWorkout,
    getAllWorkouts,
    getWorkoutById,
    deleteWorkout,
    updateWorkout
} = require('../controllers/workoutControllers');


//get all workouts
router.get('/', getAllWorkouts);
// get single workout
router.get('/:id', getWorkoutById);
// post single workout
router.post('/', createWorkout);

// delete single workout
router.delete('/:id', deleteWorkout);

// update single workout
router.patch('/:id', updateWorkout);

module.exports = router