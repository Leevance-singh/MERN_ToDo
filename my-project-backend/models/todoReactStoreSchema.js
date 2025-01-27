import mongoose from 'mongoose';

const TaskSchema = mongoose.Schema({
  id: { type: String, required: true },        
  title: { type: String, required: true },     
  description: { type: String, required: true },
  progress: { type: Number, required: true },  
  total: { type: Number, required: true },     
  date: { type: String, required: true },      
  comments: { type: Number, required: true },  
  pins: { type: Number, required: true },      
});

const todoReactStoreSchema = mongoose.Schema({
  user_id: { type: String, required: true },
  todo_for_id: {
    todo: [TaskSchema],
    inProgress: [TaskSchema],
    done: [TaskSchema],
  },
});

const todoReactStoreModel = mongoose.model('todoReactStore', todoReactStoreSchema,'todoReactStore');

export {todoReactStoreModel};