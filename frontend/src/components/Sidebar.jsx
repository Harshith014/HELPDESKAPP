// src/components/Sidebar.jsx
import { ChartBarIcon, ChevronLeftIcon, ChevronRightIcon, CogIcon, TicketIcon, UsersIcon } from '@heroicons/react/24/solid';
import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function Sidebar({ isSidebarOpen, toggleSidebar }) {
  const { user } = useContext(AuthContext);

  return (
    <>
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 w-64 bg-gray-50 dark:bg-gray-800 p-4 shadow-lg transform transition-transform duration-300 z-40
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
          md:static md:translate-x-0 md:w-64 md:top-0 md:h-screen
          top-16 h-[calc(100vh-64px)]`} // Start below navbar (64px) on mobile
      >
        <nav className="space-y-2">
          <NavLink
            to="/tickets"
            className={({ isActive }) =>
              `flex items-center gap-2 p-3 rounded-lg text-sm font-medium transition-all ${
                isActive ? 'bg-primary text-white' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`
            }
            onClick={() => window.innerWidth < 768 && toggleSidebar()} // Close sidebar on mobile after clicking a link
          >
            <TicketIcon className="w-5 h-5" /> Tickets
          </NavLink>
          {(user?.role === 'agent' || user?.role === 'admin') && (
            <NavLink
              to="/customers"
              className={({ isActive }) =>
                `flex items-center gap-2 p-3 rounded-lg text-sm font-medium transition-all ${
                  isActive ? 'bg-primary text-white' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`
              }
              onClick={() => window.innerWidth < 768 && toggleSidebar()}
            >
              <UsersIcon className="w-5 h-5" /> Customers
            </NavLink>
          )}
          {user?.role === 'admin' && (
            <>
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  `flex items-center gap-2 p-3 rounded-lg text-sm font-medium transition-all ${
                    isActive ? 'bg-primary text-white' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`
                }
                onClick={() => window.innerWidth < 768 && toggleSidebar()}
              >
                <ChartBarIcon className="w-5 h-5" /> Dashboard
              </NavLink>
              <NavLink
                to="/admin/users"
                className={({ isActive }) =>
                  `flex items-center gap-2 p-3 rounded-lg text-sm font-medium transition-all ${
                    isActive ? 'bg-primary text-white' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`
                }
                onClick={() => window.innerWidth < 768 && toggleSidebar()}
              >
                <CogIcon className="w-5 h-5" /> Manage Users
              </NavLink>
            </>
          )}
        </nav>
      </div>

      {/* Floating toggle button below navbar on mobile screens */}
      <button
        onClick={toggleSidebar}
        className="md:hidden fixed top-20 left-4 p-2 bg-primary text-white rounded-full shadow-lg z-50 transition-all hover:bg-blue-600"
      >
        {isSidebarOpen ? <ChevronLeftIcon className="w-6 h-6" /> : <ChevronRightIcon className="w-6 h-6" />}
      </button>

      {/* Backdrop for mobile screens when sidebar is open */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={toggleSidebar} // Close sidebar when clicking outside
        />
      )}
    </>
  );
}