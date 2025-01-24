import React from 'react';

const Topbar1 = ({ openTaskDialog }) => {
  return (
    <div className="topbar1 flex justify-between items-center p-4 bg-white dark:bg-gray-800 shadow-md">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Tasks Dashboard</h2>
      <div className="flex items-center gap-4">
        <button
          onClick={openTaskDialog}
          className="p-2 bg-gray-200 dark:bg-gray-700 rounded-full"
        >
          <img src="/assets/topbar1_assets/addd_task.svg" alt="More" className="w-6 h-6" />
        </button>
        <button className="btn-primary">New Template</button>
      </div>
    </div>
  );
};

export default Topbar1;
