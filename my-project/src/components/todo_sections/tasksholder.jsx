import React from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import ToDo from './section1_todo';
import InProgress from './section2_inprogress';
import Done from './section3_done';
import axios from 'axios';

const TasksHolder = ({ tasks, setTasks, openTaskDialog }) => {
  // Delete task function
  const deleteTask = async (id, section) => {
    try {
      // Call the backend API to delete the task
      await axios.delete(`http://localhost:3000/deleteTask/${id}`);

      // Update state to remove the task locally
      const updatedSection = tasks[section].filter((task) => task.id !== id);
      setTasks((prevTasks) => ({
        ...prevTasks,
        [section]: updatedSection,
      }));
    } catch (err) {
      console.error('Error deleting task:', err);
    }
  };

  const onDragEnd = (result) => {
    const { source, destination } = result;

    // If dropped outside a droppable area, do nothing
    if (!destination) return;

    const sourceList = Array.from(tasks[source.droppableId]);
    const destinationList = Array.from(tasks[destination.droppableId]);
    const [movedTask] = sourceList.splice(source.index, 1);

    destinationList.splice(destination.index, 0, movedTask);

    const updatedTasks = {
      ...tasks,
      [source.droppableId]: sourceList,
      [destination.droppableId]: destinationList,
    };

    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="tasks-holder flex flex-col gap-5 flex-grow h-[calc(100vh-140px)] p-5 overflow-auto sm:flex-row sm:overflow-visible bg-gray-100 dark:bg-gray-900">
        {['todo', 'inProgress', 'done'].map((section) => (
          <Droppable droppableId={section} key={section}>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="flex-1 min-h-full"
              >
                {section === 'todo' && (
                  <ToDo
                    tasks={tasks[section]}
                    deleteTask={(id) => deleteTask(id, section)}
                    openTaskDialog={openTaskDialog} // Pass the dialog open function
                  />
                )}
                {section === 'inProgress' && (
                  <InProgress
                    tasks={tasks[section]}
                    deleteTask={(id) => deleteTask(id, section)}
                    openTaskDialog={openTaskDialog} // Pass the dialog open function
                  />
                )}
                {section === 'done' && (
                  <Done
                    tasks={tasks[section]}
                    deleteTask={(id) => deleteTask(id, section)}
                    openTaskDialog={openTaskDialog} // Pass the dialog open function
                  />
                )}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
};

export default TasksHolder;
