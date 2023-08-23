const Workout = require('../models/WorkoutModel.js');
const mongoose = require('mongoose');


//get all workouts
const getAllWorkouts = async(req, res) => {
    try {
        const workouts = await Workout.find().sort({createdAt:-1});
        res.status(200).json(workouts);
    }catch (err) {
        res.status(400).json({error: err.message});
    };
};


//get a single workout
const getWorkoutById = async(req, res) => {
    const {id} = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such workout with this id.'});
    };

    try {
        const workout = await Workout.findById(id);
        res.status(200).json(workout);
    }catch (err) {
        res.status(400).json({error: err.message});
    };
};

//create a new workout
const createWorkout = async(req, res) => {
    const {title, reps, load} = req.body;
    let emptyFields = []

    if (!title) {
        emptyFields.push('title');
    };
    if (!reps) {
        emptyFields.push('reps');
    };
    if (!load) {
        emptyFields.push('load');
    };
    if (emptyFields.length > 0) {
        return res.status(400).json({error: 'Please fill in all fields.', emptyFields});
    };
    
    // add doc to db
    try {
        const newWorkout = await Workout.create({title, reps, load});
        res.status(200).json(newWorkout);
    }catch (err) {
        res.status(400).json({error: err.message});
    };
};

//delete a workout

const deleteWorkout = async(req, res) => {
    const {id} = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such workout with this id.'});
    };
    try {
        const workout = await Workout.findByIdAndDelete(req.params.id);
        res.status(200).json(workout);
    }catch (err) {
        res.status(400).json({error: err.message});
    };
};

//update a workout
const updateWorkout = async(req, res) => {
    const {id} = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such workout with this id.'});
    };
    try {
        const workout = await Workout.findByIdAndUpdate(id, {...req.body}, {new: true});
        res.status(200).json(workout);
    }catch (err) {
        res.status(400).json({error: err.message});
    };
};


module.exports = {
    createWorkout,
    getAllWorkouts,
    getWorkoutById,  
    deleteWorkout,
    updateWorkout
};