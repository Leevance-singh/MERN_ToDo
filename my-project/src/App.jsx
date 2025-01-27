//...........................................................................Importing Core Components
import React, { useEffect, useState } from 'react';
import axios from 'axios';

//...........................................................................Importing Custom Components
import Sidebar from './components/navigation_bars/sidebar';
import Topbar from './components/navigation_bars/topbar';
import Topbar1 from './components/navigation_bars/topbar1';
import TasksHolder from './components/todo_sections/tasksholder';
import { Side_collapsable_menu } from './components/menu/side_collapsable_menu';
import TaskCreationDialog from './components/TaskCreationDialog';
import './index.css';

//...........................................................................Main app Component
const App = () => {
  const [tasks, setTasks] = useState({ todo: [], inProgress: [], done: [] });
  const [isMenuVisible, setMenuVisible] = useState(false);
  const [isDialogVisible, setDialogVisible] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isDarkMode, setDarkMode] = useState(false);

//...........................................................................Functions/Functionalities
  const fetchTasksFromBackend = async () => {
    try {
      const response = await axios.get('http://localhost:3000/entiredata');
      const data = response.data[0]?.todo_for_id;
      // const data = response.data[0]?.todo_for_id || { todo: [], inProgress: [], done: [] };   currently not usable coz schema change in progress hehehe
      setTasks(data);
    } catch (err) {
      console.error('Error fetching tasks:', err);
    }
  };

  const toggleMenu = () => setMenuVisible((prev) => !prev);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
    document.documentElement.classList.toggle('dark', !isDarkMode);
  };
  
  const openTaskDialog = (task) => {
    setSelectedTask(task);
    setDialogVisible(true); 
  };

  const closeTaskDialog = () => {
    setSelectedTask(null);
    setDialogVisible(false);
  };
  const updateTask = async (updatedTask, section) => {
    try {
      const updatedTasks = {
        ...tasks,
        [section]: tasks[section].map((t) =>
          t.id === updatedTask.id ? updatedTask : t
        ),
      };
      await axios.post('http://localhost:3000/updateTasks', { tasks: updatedTasks });
      setTasks(updatedTasks);
    } catch (err) {
      console.error('Error updating task:', err);
    }
  };
//...........................................................................Use Effects
  useEffect(() => {
    fetchTasksFromBackend();
  }, []);

//...........................................................................Main return statement
  return (
    <div className="app-container flex h-screen w-full overflow-auto">
      <Sidebar toggleMenu={toggleMenu} toggleDarkMode={toggleDarkMode} />
      <Side_collapsable_menu isVisible={isMenuVisible} toggleMenu={toggleMenu} />
      <div className="main-content flex flex-col w-full h-full ml-16">
        <Topbar />
        <Topbar1 openTaskDialog={() => openTaskDialog(null)} />
        <div className="content-area flex-grow overflow-auto bg-slate-600">
          <TasksHolder
            tasks={tasks}
            setTasks={setTasks}
            openTaskDialog={openTaskDialog}
          />
        </div>
      </div>
      {isDialogVisible && (
        <TaskCreationDialog
          closeDialog={closeTaskDialog}
          addTask={(task, section) => setTasks((prev) => ({
            ...prev,
            [section]: [...prev[section], task],
          }))}
          updateTask={updateTask}
          task={selectedTask}
        />
      )}
    </div>
  );
};

export default App;