import React, { useContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { Sun, Moon, LogOut, LayoutDashboard, Menu, X, Code } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const location = useLocation();
  const [theme, setTheme] = useState('dark');
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleTheme = () => {
    const isLight = document.body.classList.toggle('light-mode');
    setTheme(isLight ? 'light' : 'dark');
  };

  const isActive = (path) => {
    return location.pathname === path ? 'nav-link active' : 'nav-link';
  };

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Services', path: '/services' },
    { label: 'Portfolio', path: '/portfolio' },
    { label: 'Pricing', path: '/pricing' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' },
  ];

  return (
    <nav className="navbar">
      <div className="container navbar-container">
        <Link to="/" className="nav-logo" onClick={() => setMobileOpen(false)}>
          <Code size={28} color="hsl(var(--primary))" />
          <span className="text-gradient">ProjectXCode</span>
        </Link>

        {/* Desktop navigation */}
        <ul className="nav-links">
          {navLinks.map((link) => (
            <li key={link.path}>
              <Link to={link.path} className={isActive(link.path)}>
                {link.label}
              </Link>
            </li>
          ))}
          
          <li style={{ borderLeft: '1px solid hsl(var(--border))', height: '24px', margin: '0 8px' }}></li>

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
                <Link to="/dashboard" className="btn btn-secondary" style={{ gap: '6px', fontSize: '0.9rem', padding: '8px 16px' }}>
                  <LayoutDashboard size={16} />
                  Dashboard
                </Link>
              </li>
              <li>
                <button onClick={logout} className="btn btn-primary" style={{ gap: '6px', fontSize: '0.9rem', padding: '8px 16px', background: 'hsl(var(--bg-surface-hover))', border: '1px solid hsl(var(--border))', color: 'hsl(var(--text-primary))' }}>
                  <LogOut size={16} />
                  Logout ({user.username})
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login" className="nav-link" style={{ fontSize: '0.95rem' }}>Login</Link>
              </li>
              <li>
                <Link to="/register" className="btn btn-primary" style={{ fontSize: '0.9rem', padding: '8px 20px' }}>Get Started</Link>
              </li>
            </>
          )}
        </ul>

        {/* Mobile menu controls */}
        <div style={{ display: 'none' }} className="mobile-only">
          {/* Handled by media query in css to toggle display block */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
