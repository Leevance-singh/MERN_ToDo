import React, { useState } from 'react';

const TaskCreationDialog = ({ closeDialog, addTask, updateTask, task }) => {
  const isEdit = !!task;
  const [formData, setFormData] = useState({
    id: task?.id || Date.now(),
    title: task?.title || '',
    description: task?.description || '',
    progress: task?.progress || 0,
    total: task?.total || 10,
    date: task?.date || '',
    comments: task?.comments || 0,
    pins: task?.pins || 0,
  });
  const [section, setSection] = useState(task?.section || 'todo');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (isEdit) {
      updateTask({ ...formData }, section);
    } else {
      addTask({ ...formData }, section);
    }
    closeDialog();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
        <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
          {isEdit ? 'Edit Task' : 'Create New Task'}
        </h3>
        <div className="space-y-3">
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Task Title"
            className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-blue-300"
          />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-blue-300"
          ></textarea>
          <label htmlFor="progress">Progress </label>
          <input
            type="number"
            name="progress"
            value={formData.progress}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-blue-300"
          />
          <label htmlFor="total">Progress out of: </label>
          <input
            type="number"
            name="total"
            value={formData.total}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-blue-300"
          />
          <label htmlFor="date">Date Created:</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-blue-300"
          />
          <label htmlFor="section">Select Section : </label>
          <select
            name="section"
            value={section}
            onChange={(e) => setSection(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-blue-300"
          >
            <option value="todo">To Do</option>
            <option value="inProgress">In Progress</option>
            <option value="done">Done</option>
          </select>
        </div>
        <div className="flex justify-end mt-4">
          <button
            onClick={closeDialog}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="ml-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCreationDialog;
