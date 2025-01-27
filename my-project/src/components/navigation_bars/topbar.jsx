import React from 'react';

const Topbar = () => {
  return (
    <div className="flex justify-between items-center px-3 py-2 sm:px-5 sm:py-3 bg-white dark:bg-gray-800 shadow-md  w-full">
      {/* Left Section */}
      <div className="flex items-center">
        <h1 className="text-base font-bold text-gray-900 dark:text-gray-100 sm:text-lg md:text-xl lg:text-2xl">
          Welcome back, Vincent 👋
        </h1>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-2 sm:gap-4">
        <img
          src="/assets/topbar_assets/search.svg"
          alt="Search"
          className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8"
        />
        <img
          src="/assets/topbar_assets/Notifications.svg"
          alt="Notifications"
          className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8"
        />
        <img
          src="/assets/topbar_assets/calender.svg"
          alt="Calendar"
          className="w-6 h-6 rounded-full sm:w-8 sm:h-8 md:w-10 md:h-10"
        />
        <p className="hidden md:block text-xs sm:text-sm text-gray-600 dark:text-gray-300">
          18 September 2022
        </p>
        <img
          src="/assets/topbar_assets/Imageprofile.png"
          alt="Profile"
          className="w-6 h-6 rounded-full sm:w-8 sm:h-8 md:w-10 md:h-10"
        />
      </div>
    </div>
  );
};

export default Topbar;
