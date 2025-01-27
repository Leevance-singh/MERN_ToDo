// TaskCard.js
import React from 'react';
import PropTypes from 'prop-types';

const TaskCard = ({
  id,
  title,
  description,
  progress,
  total,
  date,
  comments,
  pins,
  deleteTask,
  onEdit,
}) => {
  const progressPercentage = total > 0 ? (progress / total) * 100 : 0;

  return (
    <div className="task-card border border-gray-300 dark:border-gray-700 rounded-lg p-4 mb-4 bg-white dark:bg-gray-800">
      <div className="task-header flex justify-between items-center">
        <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{title}</h4>
        <div className="actions flex gap-2">
          <button
            onClick={() => onEdit({ id, title, description, progress, total, date })}
            className="text-gray-500 dark:text-gray-400 hover:text-blue-500"
          >
            ✏️
          </button>
          <button
            onClick={deleteTask}
            className="text-gray-500 dark:text-gray-400 hover:text-red-500"
          >
            🗑️
          </button>
        </div>
      </div>
      <p className="task-description my-3 text-gray-700 dark:text-gray-300">{description}</p>
      <div className="task-progress text-sm text-gray-600 dark:text-gray-400">
        <span>{`${progress}/${total}`}</span>
      </div>
      <div className="progress-bar h-2 bg-gray-200 dark:bg-gray-700 rounded-lg mt-2 mb-4">
        <div
          className="progress-fill h-full bg-orange-500"
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
      <div className="task-footer flex justify-between items-center">
        <span className="task-date bg-gray-200 dark:bg-gray-700 text-sm text-gray-600 dark:text-gray-300 px-3 py-1 rounded-full">
          {date}
        </span>
        <div className="task-icons flex gap-3 text-gray-600 dark:text-gray-300">
          <span className="icon text-sm">💬 {comments}</span>
          <span className="icon text-sm">📌 {pins}</span>
        </div>
      </div>
    </div>
  );
};

TaskCard.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  progress: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  date: PropTypes.string.isRequired,
  comments: PropTypes.number.isRequired,
  pins: PropTypes.number.isRequired,
  deleteTask: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default TaskCard;
