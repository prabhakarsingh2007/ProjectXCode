import React, { useContext, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { Sun, Moon, LogOut, LayoutDashboard, Code, Menu, X } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const location = useLocation();
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'dark';
  });
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (theme === 'light') {
      document.body.classList.add('light-mode');
    } else {
      document.body.classList.remove('light-mode');
    }
  }, [theme]);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    localStorage.setItem('theme', nextTheme);
  };

  const isActive = (path) => {
    return location.pathname === path 
      ? 'tw-text-blue-400 tw-font-bold' 
      : 'tw-text-gray-300 hover:tw-text-blue-400';
  };

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Services', path: '/services' },
    { label: 'Completed Projects', path: '/completed-projects' },
    { label: 'Pricing', path: '/pricing' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' },
  ];

  return (
    <nav className="tw-sticky tw-top-0 tw-z-50 tw-bg-[#0F172A]/85 tw-backdrop-blur-md tw-border-b tw-border-gray-800 tw-py-4">
      <div className="tw-max-w-7xl tw-mx-auto tw-px-6 tw-flex tw-items-center tw-justify-between">
        
        {/* Brand Logo */}
        <Link to="/" className="tw-flex tw-items-center tw-gap-2.5 tw-no-underline" onClick={handleLinkClick}>
          <Code size={24} className="tw-text-blue-500" />
          <span className="tw-font-black tw-text-lg tw-tracking-tight tw-text-white">
            Project<span className="tw-bg-gradient-to-r tw-from-blue-400 tw-to-cyan-400 tw-bg-clip-text tw-text-transparent">XCode</span>
          </span>
        </Link>

        {/* Desktop Menu Links */}
        <ul className="tw-hidden lg:tw-flex tw-items-center tw-gap-8 tw-list-none tw-mb-0 tw-pl-0">
          {navLinks.map((link) => (
            <li key={link.path}>
              <Link 
                to={link.path} 
                className={`tw-text-xs tw-font-semibold tw-tracking-wide tw-uppercase tw-no-underline tw-transition-colors ${isActive(link.path)}`}
                onClick={handleLinkClick}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Actions (Desktop) */}
        <div className="tw-hidden lg:tw-flex tw-items-center tw-gap-4">
          
          {/* Theme Switcher Toggle */}
          <button 
            onClick={toggleTheme} 
            className="tw-p-2 tw-rounded-full tw-bg-gray-800 hover:tw-bg-gray-700 tw-text-gray-300 tw-border tw-border-gray-700 tw-transition-all"
            title="Toggle Light/Dark Theme"
          >
            {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
          </button>

          {user ? (
            <>
              <Link 
                to="/dashboard" 
                className="tw-flex tw-items-center tw-gap-1.5 tw-bg-gray-800 hover:tw-bg-gray-700 tw-text-white tw-px-4 tw-py-2 tw-rounded-xl tw-text-xs tw-font-bold tw-no-underline tw-border tw-border-gray-700"
                onClick={handleLinkClick}
              >
                <LayoutDashboard size={14} />
                Dashboard
              </Link>
              <button 
                onClick={() => { logout(); handleLinkClick(); }} 
                className="tw-flex tw-items-center tw-gap-1.5 tw-bg-slate-900 hover:tw-bg-slate-800 tw-text-gray-400 tw-px-4 tw-py-2 tw-rounded-xl tw-text-xs tw-font-bold tw-border tw-border-gray-800"
              >
                <LogOut size={14} />
                Logout
              </button>
            </>
          ) : (
            <>
              <Link 
                to="/login" 
                className="tw-text-xs tw-font-bold tw-text-gray-300 hover:tw-text-white tw-no-underline"
                onClick={handleLinkClick}
              >
                Login
              </Link>
              <Link 
                to="/register" 
                className="tw-bg-blue-600 hover:tw-bg-blue-500 tw-text-white tw-px-5 tw-py-2.5 tw-rounded-xl tw-text-xs tw-font-bold tw-no-underline tw-shadow-lg tw-shadow-blue-600/15"
                onClick={handleLinkClick}
              >
                Get Started
              </Link>
            </>
          )}

        </div>

        {/* Mobile menu toggle trigger */}
        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className="lg:tw-hidden tw-text-gray-400 hover:tw-text-white tw-p-1"
          aria-label="Toggle Menu"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

      </div>

      {/* Mobile Menu Panel */}
      {isOpen && (
        <div className="lg:tw-hidden tw-bg-[#0F172A] tw-border-b tw-border-gray-800 tw-py-4 tw-px-6 tw-space-y-4">
          <ul className="tw-space-y-3 tw-list-none tw-pl-0">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link 
                  to={link.path} 
                  className={`tw-block tw-text-xs tw-font-bold tw-uppercase tw-no-underline tw-py-1 ${isActive(link.path)}`}
                  onClick={handleLinkClick}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="tw-pt-3 tw-border-t tw-border-gray-800 tw-flex tw-flex-col tw-gap-3">
            
            <button 
              onClick={() => { toggleTheme(); handleLinkClick(); }} 
              className="tw-flex tw-items-center tw-justify-between tw-bg-gray-800 tw-text-gray-300 tw-px-4 tw-py-2 tw-rounded-xl tw-text-xs tw-font-bold"
            >
              <span>Toggle Mode</span>
              {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
            </button>

            {user ? (
              <>
                <Link 
                  to="/dashboard" 
                  className="tw-flex tw-items-center tw-justify-center tw-gap-1.5 tw-bg-blue-600 tw-text-white tw-py-2.5 tw-rounded-xl tw-text-xs tw-font-bold tw-no-underline"
                  onClick={handleLinkClick}
                >
                  <LayoutDashboard size={14} />
                  Dashboard
                </Link>
                <button 
                  onClick={() => { logout(); handleLinkClick(); }} 
                  className="tw-flex tw-items-center tw-justify-center tw-gap-1.5 tw-bg-gray-800 tw-text-gray-400 tw-py-2.5 tw-rounded-xl tw-text-xs tw-font-bold"
                >
                  <LogOut size={14} />
                  Logout ({user.username})
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="tw-text-center tw-text-xs tw-font-bold tw-text-gray-300 tw-py-2 tw-no-underline"
                  onClick={handleLinkClick}
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="tw-bg-blue-600 tw-text-center tw-text-white tw-py-2.5 tw-rounded-xl tw-text-xs tw-font-bold tw-no-underline"
                  onClick={handleLinkClick}
                >
                  Get Started
                </Link>
              </>
            )}

          </div>
        </div>
      )}

    </nav>
  );
};

export default Navbar;
