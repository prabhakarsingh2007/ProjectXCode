import React, { useContext, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { Sun, Moon, LogOut, LayoutDashboard, Code } from 'lucide-react';

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
    return location.pathname === path ? 'nav-link active' : 'nav-link';
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
    <nav className="navbar">
      <div className="container navbar-container">
        <Link to="/" className="nav-logo" onClick={handleLinkClick}>
          <Code size={28} color="hsl(var(--primary))" />
          <span className="text-gradient">ProjectXCode</span>
        </Link>

        {/* Mobile Hamburger Button */}
        <button 
          className={`nav-toggle ${isOpen ? 'open' : ''}`} 
          onClick={() => setIsOpen(!isOpen)} 
          aria-label="Toggle Navigation Menu"
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>

        {/* Links Panel */}
        <ul className={`nav-links ${isOpen ? 'open' : ''}`}>
          {navLinks.map((link) => (
            <li key={link.path}>
              <Link to={link.path} className={isActive(link.path)} onClick={handleLinkClick}>
                {link.label}
              </Link>
            </li>
          ))}
          
          <li className="nav-divider" style={{ borderLeft: '1px solid hsl(var(--border))', height: '24px', margin: '0 8px' }}></li>

          {/* Theme Toggle Button */}
          <li>
            <button onClick={toggleTheme} className="btn btn-secondary" style={{ padding: '8px', borderRadius: '50%', border: 'none' }} title="Toggle Theme">
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </li>

          {/* Auth Conditional Links */}
          {user ? (
            <>
              <li>
                <Link to="/dashboard" className="btn btn-secondary" onClick={handleLinkClick} style={{ gap: '6px', fontSize: '0.9rem', padding: '8px 16px' }}>
                  <LayoutDashboard size={16} />
                  Dashboard
                </Link>
              </li>
              <li>
                <button onClick={() => { logout(); handleLinkClick(); }} className="btn btn-primary" style={{ gap: '6px', fontSize: '0.9rem', padding: '8px 16px', background: 'hsl(var(--bg-surface-hover))', border: '1px solid hsl(var(--border))', color: 'hsl(var(--text-primary))' }}>
                  <LogOut size={16} />
                  Logout ({user.username})
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login" className="nav-link" onClick={handleLinkClick} style={{ fontSize: '0.95rem' }}>Login</Link>
              </li>
              <li>
                <Link to="/register" className="btn btn-primary" onClick={handleLinkClick} style={{ fontSize: '0.9rem', padding: '8px 20px' }}>Get Started</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
