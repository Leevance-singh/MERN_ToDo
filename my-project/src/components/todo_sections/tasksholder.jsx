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
      <div className="tasks-holder flex flex-col gap-5 flex-grow h-[calc(100vh-140px)] p-5 sm:flex-row bg-gray-100 dark:bg-gray-900">
        {['todo', 'inProgress', 'done'].map((section) => (
          <Droppable droppableId={section} key={section}>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="flex-1 flex flex-col bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden"
              >
                {/* Section Heading */}
                <div className="bg-gray-200 dark:bg-gray-700 p-3 font-bold text-center">
                  {section === 'todo' && 'Todo'}
                  {section === 'inProgress' && 'In Progress'}
                  {section === 'done' && 'Done'}
                </div>
                {/* Scrollable Task Content */}
                <div className="flex-grow p-4 overflow-y-auto">
                  {tasks[section].map((task, index) => (
                    <TaskCard
                      key={task.id}
                      {...task}
                      deleteTask={() => deleteTask(task.id, section)}
                      onEdit={(taskData) => openTaskDialog({ ...taskData, section })}
                      index={index}
                    />
                  ))}
                  {provided.placeholder}
                </div>
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
};

export default TasksHolder;
