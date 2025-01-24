//...........................................................Core Components import............................
import express from 'express' ;
import cors from 'cors' ;

//...........................................................Models Import.....................................
import {todoReactStoreModel } from './models/todoReactStoreSchema.js' ;
import ExampleData from './models/examplemodel.js';

//...........................................................MongoDB configure.................................
import mongoose from 'mongoose' ;
mongoose.connect("mongodb://localhost:27017/ToDo_React")
    .then(()=>{console.log("----MongoDB has been connected successfully!")})
    .catch((err) => console.log("----Mongo Connection Error!", err));  

//...........................................................Creating app instance.............................
const app = express() ;
app.use(express.json());

//...........................................................Sample/Mock data..................................
//This is not needed curretnly and is only used for demonstration purposes
const mockData = {
    todo: [
      { id: '1', title: 'Design new UI presentation', description: 'Dribbble marketing', progress: 7, total: 10, date: '24 Aug 2022', comments: 2, pins: 2 },
    ],
    inProgress: [
      { id: '2', title: 'Design system update', description: 'Oreo website project', progress: 3, total: 10, date: '12 Nov 2022', comments: 2, pins: 2 },
    ],
    done: [
      { id: '3', title: 'Add product to the market', description: 'UI8 marketplace', progress: 10, total: 10, date: '6 Jan 2022', comments: 5, pins: 1 },
    ],
  };

//...........................................................Middlewares setup.................................
app.use(cors({
    origin: '*',
}));
app.use((req, res, next) => {
  console.log("----request.method :", req.method);
  console.log("----request.url :"   , req.url); 
  next();
});

//...........................................................Configuring Paths.................................
  app.get('/entiredata', async (req, res) => {
    try {
      const fetchedData = await todoReactStoreModel.find(); // Fetch all tasks
      res.json(fetchedData); // Send the tasks as JSON
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  app.post('/updateTasks', async (req, res) => {
    try {
      const { tasks } = req.body; // Get the updated tasks from the request body
      const userId = "123"; // Replace with dynamic user_id as needed
      console.log("----The tasks are :",tasks);
      // Update the todo_for_id field for the user
      const result = await todoReactStoreModel.updateOne(
        { user_id: userId },
        { $set: { todo_for_id: tasks } }, // Update the tasks
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
      const { tasks } = req.body; // Get the updated tasks from the request body
      const userId = "123"; // Replace with dynamic user_id as needed
      console.log("----The tasks are :",tasks);
      // Update the todo_for_id field for the user
      const result = await todoReactStoreModel.updateOne(
        { user_id: userId },
        { $set: { todo_for_id: tasks } }, // Update the tasks
      );
      console.log("----Database update result:", result);
  
      res.status(200).json( { message: "----Tasks updated successfully" } ); }
    catch{
      console.error("----Error updating tasks:", err);
    }
  });
  app.delete('/deleteTask/:id', async (req, res) => {
    const { id } = req.params;
    const userId = "123"; // Replace with dynamic user_id as needed
  
    try {
      // Fetch the user's data
      const userData = await todoReactStoreModel.findOne({ user_id: userId });
  
      if (!userData) {
        return res.status(404).json({ message: "User not found" });
      }
  
      // Filter out the task from each section
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
  
//...........................................................Server setup......................................
app.listen(3000, () =>{
    console.log("Server is running at port 3000");
})
