import React, { useState } from "react";
import PropTypes from "prop-types";

const TaskCard = ({ title, description, progress, total, date, comments, pins, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState({
    title,
    description,
    progress,
    total,
  });

  const progressPercentage = editedTask.total > 0 ? (editedTask.progress / editedTask.total) * 100 : 0;

  // Handlers
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedTask((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    onSave(editedTask); // Call parent-provided onSave
    setIsEditing(false); // Exit editing mode
  };

  const handleCancel = () => {
    setEditedTask({ title, description, progress, total }); // Reset changes
    setIsEditing(false); // Exit editing mode
  };

  return (
    <div className="task-card border border-gray-300 dark:border-gray-700 rounded-lg p-4 mb-4 bg-white dark:bg-gray-800">
      {isEditing ? (
        <>
          {/* Editable Form */}
          <div className="task-header flex justify-between items-center">
            <input
              type="text"
              name="title"
              value={editedTask.title}
              onChange={handleChange}
              className="text-lg font-semibold text-gray-900 dark:text-gray-100 border-b border-gray-300 dark:border-gray-700"
              placeholder="Task Title"
            />
            <button
              onClick={handleCancel}
              className="text-gray-500 dark:text-gray-400 hover:text-red-500"
            >
              ✖
            </button>
          </div>
          <textarea
            name="description"
            value={editedTask.description}
            onChange={handleChange}
            className="task-description w-full my-3 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-700 rounded-lg p-2"
            placeholder="Task Description"
          />
          <div className="task-progress flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <label>
              Progress:
              <input
                type="number"
                name="progress"
                value={editedTask.progress}
                onChange={handleChange}
                className="ml-2 w-16 p-1 border border-gray-300 dark:border-gray-700 rounded-lg"
              />
            </label>
            <label>
              Total:
              <input
                type="number"
                name="total"
                value={editedTask.total}
                onChange={handleChange}
                className="ml-2 w-16 p-1 border border-gray-300 dark:border-gray-700 rounded-lg"
              />
            </label>
          </div>
          <div className="task-footer flex justify-between items-center mt-4">
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
            >
              Save
            </button>
          </div>
        </>
      ) : (
        <>
          {/* View Mode */}
          <div className="task-header flex justify-between items-center">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{title}</h4>
            <button
              onClick={() => setIsEditing(true)}
              className="text-gray-500 dark:text-gray-400 hover:text-blue-500"
            >
              ✏️
            </button>
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
        </>
      )}
    </div>
  );
};

TaskCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  progress: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  date: PropTypes.string.isRequired,
  comments: PropTypes.number.isRequired,
  pins: PropTypes.number.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default TaskCard;
