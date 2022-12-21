const workoutModel = require("../models/workoutModel");
const mongoose = require("mongoose");

//get all workouts
const getWorkouts = async (req, res) => {
  const workouts = await workoutModel.find({}).sort({ createdAt: -1 });

  res.status(200).json(workouts);
};

//get a single workout
const getWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such workout" });
  }

  const workout = await workoutModel.findById(id).sort({ createdAt: -1 });

  if (!workout) {
    return res.status(404).json({ error: "No such workout" });
  }

  res.status(200).json(workout);
};

//create a new workout
const createWorkout = async (req, res) => {
  const { title, reps, load } = req.body;

  //add doc to db
  try {
    const workout = await workoutModel.create({ title, reps, load });
    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//delete a workout
const deleteWorkout = async (req, res) => {
  try {
    const { id } = req.params;
    const workout = await workoutModel.findById(id);

    if (!workout) {
      return res.status(404).send({ error: "Workout not found" });
    }

    await workoutModel.removeById(id);
    return res.send({ message: "Workout deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error: "Error deleting workout" });
  }
};

//update a workout

module.exports = {
  createWorkout,
  getWorkouts,
  getWorkout,
  deleteWorkout,
};
