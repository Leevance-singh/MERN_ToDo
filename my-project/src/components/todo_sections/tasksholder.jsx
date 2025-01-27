// TasksHolder.js
import React from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import TaskCard from './TaskCard';

const TasksHolder = ({ tasks, setTasks, openTaskDialog }) => {
  const deleteTask = async (id, section) => {
    const updatedSection = tasks[section].filter((task) => task.id !== id);
    const updatedTasks = {
      ...tasks,
      [section]: updatedSection,
    };
    setTasks(updatedTasks);
  };

  const onDragEnd = (result) => {
    const { source, destination } = result;
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
                {tasks[section].map((task, index) => (
                  <TaskCard
                    key={task.id}
                    {...task}
                    deleteTask={() => deleteTask(task.id, section)}
                    onEdit={(taskData) => openTaskDialog({ ...taskData, section })}
                  />
                ))}
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