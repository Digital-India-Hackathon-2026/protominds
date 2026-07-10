import React from 'react';
import { NavLink } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const Navbar: React.FC = () => {
  const { notifications } = useApp();

  const desktopLinkClass = ({ isActive }: { isActive: boolean }) =>
    `px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
      isActive
        ? 'bg-emerald-600 text-white shadow-md'
        : 'text-slate-300 hover:bg-slate-800 hover:text-white'
    }`;

  const mobileLinkClass = ({ isActive }: { isActive: boolean }) =>
    `flex flex-col items-center space-y-0.5 text-xs font-medium transition-colors ${
      isActive ? 'text-emerald-400' : 'text-slate-400'
    }`;

  return (
    <nav className="bg-slate-900 text-white shadow-md border-b border-slate-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <NavLink to="/" className="flex items-center space-x-3">
            <div className="bg-emerald-600 p-2 rounded-lg text-white font-bold tracking-wider text-xl shadow-inner">
              JM
            </div>
            <div>
              <span className="font-bold text-lg tracking-tight block text-emerald-400">JanMithra AI</span>
              <span className="text-xs text-slate-400 block -mt-1 font-medium">Government Service Portal</span>
            </div>
          </NavLink>
          
          <div className="hidden md:flex space-x-1 items-center">
            <NavLink to="/dashboard" className={desktopLinkClass}>
              Dashboard
            </NavLink>
            <NavLink to="/documents" className={desktopLinkClass}>
              Documents Center
            </NavLink>
            <NavLink to="/login" className={desktopLinkClass}>
              Login
            </NavLink>
            <NavLink to="/register" className={desktopLinkClass}>
              Register
            </NavLink>
            <NavLink to="/logout" className={desktopLinkClass}>
              Logout
            </NavLink>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative cursor-pointer group">
              <div className="p-2 bg-slate-800 hover:bg-slate-700 rounded-full text-slate-300 relative transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                {notifications.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-rose-600 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold animate-pulse">
                    {notifications.length}
                  </span>
                )}
              </div>
            </div>
            
            <div className="flex items-center space-x-2 border-l border-slate-700 pl-4">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-600 flex items-center justify-center text-white font-bold shadow-md">
                U
              </div>
              <span className="text-sm font-semibold hidden sm:inline-block text-slate-200">Applicant Node</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="md:hidden flex justify-around bg-slate-800 border-t border-slate-700 py-2">
        <NavLink to="/dashboard" className={mobileLinkClass}>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <span>Dashboard</span>
        </NavLink>
        <NavLink to="/documents" className={mobileLinkClass}>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <span>Documents</span>
        </NavLink>
        <NavLink to="/login" className={mobileLinkClass}>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
          </svg>
          <span>Login</span>
        </NavLink>
        <NavLink to="/register" className={mobileLinkClass}>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
          </svg>
          <span>Register</span>
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;