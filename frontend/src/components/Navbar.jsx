// src/components/Navbar.jsx
import { UserCircleIcon } from '@heroicons/react/24/solid';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import DarkModeToggle from './DarkModeToggle';

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="bg-primary text-white p-4 shadow-lg sticky top-0 z-50 w-full max-w-[32em] sm:max-w-[32em] md:max-w-full mx-auto">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight animate-fade-in">Helpdesk</h1>
        <div className="flex items-center gap-2 sm:gap-4">
          <DarkModeToggle />
          {user && (
            <div className="flex items-center gap-1 sm:gap-3">
              <div className="flex items-center gap-1 sm:gap-2">
                <UserCircleIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                <span className="text-xs sm:text-sm font-medium">
                  {user.name} <span className="text-xs capitalize">({user.role})</span>
                </span>
              </div>
              <button
                onClick={logout}
                className="bg-red-500 px-2 sm:px-4 py-1 sm:py-2 rounded-lg hover:bg-red-600 text-xs sm:text-sm font-medium transition-all"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}