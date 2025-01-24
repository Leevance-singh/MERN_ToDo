// section2_inprogress.jsx
import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import TaskCard from './TaskCard';

const InProgress = ({ tasks ,deleteTask}) => (
  <div className="task-section flex flex-col h-full border border-gray-300 dark:border-gray-700 rounded-lg p-5 bg-gray-100 dark:bg-gray-800">
    <h3 className="mb-4 text-xl font-semibold text-gray-900 dark:text-gray-100">In Progress</h3>
    <div className="task-list flex-grow overflow-y-auto pr-2">
      {tasks.map((task, index) => (
        <Draggable key={task.id} draggableId={task.id} index={index}>
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
            >
              <TaskCard {...task} />
              <button
                onClick={() => deleteTask(task.id)}
                className="text-red-500 hover:underline text-sm"
              >Delete</button>
            </div>
          )}
        </Draggable>
      ))}

    </div>
    
  </div>
);

export default InProgress;
