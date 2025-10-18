
import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { SignedIn, SignedOut, useUser, UserButton } from '@clerk/clerk-react';
import { Ticket, LayoutDashboard, Home, Sun, Moon } from 'lucide-react';

const ORGANIZER_USER_ID = 'user_2jFeqyYQfKk8fXgY6sZ7tBvWc9a'; // Replace with a real User ID from your Clerk dashboard for testing

const Header: React.FC = () => {
  const { user } = useUser();
  const isOrganizer = user?.id === ORGANIZER_USER_ID;
  
  // State for theme management, initialized from the class on the <html> element
  const [isDarkMode, setIsDarkMode] = useState(() => document.documentElement.classList.contains('dark'));

  // Effect to apply theme changes to the DOM and localStorage
  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  const NavItem = ({ to, children }: { to: string; children: React.ReactNode }) => (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
          isActive
            ? 'bg-blue-600 text-white'
            : 'text-gray-300 hover:bg-gray-700 hover:text-white'
        }`
      }
    >
      {children}
    </NavLink>
  );
  
  return (
    <header className="bg-gray-800 shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 text-white text-xl font-bold flex items-center gap-2">
              <Ticket className="text-blue-400" size={28}/>
              <span>EventHive</span>
            </Link>
            <nav className="hidden md:flex md:ml-10 md:space-x-4">
              <NavItem to="/events">
                <Home size={16} /> Events
              </NavItem>
              <SignedIn>
                <NavItem to="/my-tickets">
                  <Ticket size={16} /> My Tickets
                </NavItem>
                {isOrganizer && (
                  <NavItem to="/dashboard">
                    <LayoutDashboard size={16} /> Dashboard
                  </NavItem>
                )}
              </SignedIn>
            </nav>
          </div>
          <div className="flex items-center">
            <button
              onClick={toggleTheme}
              className="mr-4 p-2 rounded-full text-gray-300 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white transition-colors"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <SignedOut>
              <div className="space-x-2">
                <Link
                  to="/sign-in"
                  className="px-4 py-2 text-sm font-medium text-white bg-gray-600 rounded-md hover:bg-gray-700 transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/sign-up"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            </SignedOut>
            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;