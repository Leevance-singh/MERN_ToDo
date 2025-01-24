const Sidebar = ({ toggleMenu, toggleDarkMode }) => {
  return (
    <div className="w-16 h-full flex flex-col justify-between items-center p-4 bg-gray-900 dark:bg-gray-700 fixed left-0 top-0 z-20">
      {/* Top Logo */}
      <div className="mb-10">
        <img
          src="/assets/sidebar_assets/ovals.png"
          alt="Top Logo"
          className="w-6 h-6 object-cover cursor-pointer"
          onClick={toggleMenu}
        />
      </div>

      {/* Main Logo */}
      <div className="mb-10">
        <img
          src="/assets/sidebar_assets/Logo.png"
          alt="Logo"
          className="w-6 h-6 object-cover"
        />
      </div>

      {/* Sidebar Icons */}
      <div className="flex-grow flex flex-col justify-start items-center gap-4">
        <img src="/assets/sidebar_assets/Icon.png" alt="Image 1" className="w-6 h-6 object-cover" />
        <img src="/assets/sidebar_assets/1.png" alt="Image 2" className="w-6 h-6 object-cover" />
        <img src="/assets/sidebar_assets/2.png" alt="Image 3" className="w-6 h-6 object-cover" />
        <img src="/assets/sidebar_assets/3.png" alt="Image 4" className="w-6 h-6 object-cover" />
        <img src="/assets/sidebar_assets/4.png" alt="Image 5" className="w-6 h-6 object-cover" />
        <img src="/assets/sidebar_assets/5.png" alt="Image 6" className="w-6 h-6 object-cover" />
        <img src="/assets/sidebar_assets/6.png" alt="Image 7" className="w-6 h-6 object-cover" />

        {/* Dark Mode Toggle */}
        <img
          src="/assets/sidebar_assets/maps.png"
          alt="Dark Mode Toggle"
          className="w-6 h-6 object-cover cursor-pointer"
          onClick={toggleDarkMode}
        />
      </div>

      {/* Bottom Logo */}
      <div className="mt-8">
        <img
          src="/assets/sidebar_assets/exit.png"
          alt="Exit Logo"
          className="w-6 h-6 object-cover"
        />
      </div>
    </div>
  );
};

export default Sidebar;
