import mongoose from 'mongoose';

const TaskSchema = mongoose.Schema({
  id: { type: String, required: true },         // Task ID
  title: { type: String, required: true },      // Title of the task
  description: { type: String, required: true },// Description of the task
  progress: { type: Number, required: true },   // Progress value (e.g. 7 out of 10)
  total: { type: Number, required: true },      // Total number (e.g. 10)
  date: { type: String, required: true },       // Date (e.g. "24 Aug 2022")
  comments: { type: Number, required: true },   // Number of comments
  pins: { type: Number, required: true },       // Number of pins
});

const todoReactStoreSchema = mongoose.Schema({
  user_id: { type: String, required: true }, // User ID for the user
  todo_for_id: {
    todo: [TaskSchema],
    inProgress: [TaskSchema],
    done: [TaskSchema],
  },
});

const todoReactStoreModel = mongoose.model('todoReactStore', todoReactStoreSchema,'todoReactStore');

export {todoReactStoreModel};