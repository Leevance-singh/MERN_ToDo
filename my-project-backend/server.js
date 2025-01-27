//...........................................................Core Components import
import express from 'express' ;
import cors from 'cors' ;

//...........................................................Models Import
import {todoReactStoreModel } from './models/todoReactStoreSchema.js' ;

//...........................................................MongoDB configure
import mongoose from 'mongoose' ;
mongoose.connect("mongodb://localhost:27017/ToDo_React")
    .then(()=>{console.log("----MongoDB has been connected successfully!")})
    .catch((err) => console.log("----Mongo Connection Error!", err));  

//...........................................................Creating app instance
const app = express() ;
app.use(express.json());

//...........................................................Middlewares setup
app.use(cors({
    origin: '*',
}));
app.use((req, res, next) => {
  console.log("----request.method :", req.method);
  console.log("----request.url :"   , req.url); 
  next();
});

//...........................................................Paths Configuring
  app.get('/entiredata', async (req, res) => {
    try {
      const fetchedData = await todoReactStoreModel.find();
      res.json(fetchedData);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

  app.post('/updateTasks', async (req, res) => {
    try {
      const { tasks } = req.body; 
      const userId = "123"; 
      console.log("----The tasks are :",tasks);
      const result = await todoReactStoreModel.updateOne(
        { user_id: userId },
        { $set: { todo_for_id: tasks } },
        { upsert: true }
      );
      console.log("----Database update result:", result);
  
      res.status(200).json({ message: "----Tasks updated successfully" });
    }
    catch (err) {
      console.error("----Error updating tasks:", err);
      res.status(500).json({ message: "----Failed to update tasks", error: err.message });
    }
  });

  app.post('updatePreviousTasks', async (req, res) => {
    try{
      const { tasks } = req.body; 
      const userId = "123"; 
      console.log("----The tasks are :",tasks);
      const result = await todoReactStoreModel.updateOne(
        { user_id: userId },
        { $set: { todo_for_id: tasks } },
      );
      console.log("----Database update result:", result);
  
      res.status(200).json( { message: "----Tasks updated successfully" } ); }
    catch{
      console.error("----Error updating tasks:", err);
    }
  });
  app.delete('/deleteTask/:id', async (req, res) => {
    const { id } = req.params;
    const userId = "123"; //Would get replaced by the : later(dynamic later)
  
    try {
      const userData = await todoReactStoreModel.findOne({ user_id: userId });
  
      if (!userData) {
        return res.status(404).json({ message: "User not found" });
      }
  
      const updatedTasks = {
        todo: userData.todo_for_id.todo.filter((task) => task.id !== id),
        inProgress: userData.todo_for_id.inProgress.filter((task) => task.id !== id),
        done: userData.todo_for_id.done.filter((task) => task.id !== id),
      };
  
      // Update the database
      await todoReactStoreModel.updateOne(
        { user_id: userId },
        { $set: { todo_for_id: updatedTasks } }
      );
  
      res.status(200).json({ message: "Task deleted successfully" });
    } catch (err) {
      console.error("Error deleting task:", err);
      res.status(500).json({ message: "Failed to delete task", error: err.message });
    }
  });
  
//...........................................................Server setup
app.listen(3000, () =>{
    console.log("Server is running at port 3000");
})
