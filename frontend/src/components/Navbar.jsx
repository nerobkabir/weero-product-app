import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FiBox, FiMenu, FiX, FiLogOut, FiUser, FiSun, FiMoon } from 'react-icons/fi';
import useAuth from '../hooks/useAuth';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
    setMenuOpen(false);
  };

  const isActive = (path) => location.pathname === path;

  const navLink = (to, label) => (
    <Link
      to={to}
      onClick={() => setMenuOpen(false)}
      className={`text-sm font-medium transition-colors duration-200 px-3 py-1.5 rounded-lg
        ${isActive(to)
          ? 'bg-brand-500/10 text-brand-600 dark:text-brand-400'
          : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800'
        }`}
    >
      {label}
    </Link>
  );

  return (
    <nav className="sticky top-0 z-50 bg-white/90 dark:bg-black/90 backdrop-blur-md border-b border-slate-200/80 dark:border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* ── Logo ── */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 bg-brand-500 rounded-lg flex items-center justify-center shadow-lg shadow-brand-500/30 group-hover:shadow-brand-500/50 transition-shadow">
              <FiBox className="text-white" size={16} />
            </div>
            <span className="font-bold text-slate-900 dark:text-white text-lg tracking-tight">
              Weero<span className="text-brand-500">Hub</span>
            </span>
          </Link>

          {/* ── Desktop Nav ── */}
          <div className="hidden md:flex items-center gap-1">
            {navLink('/', 'Home')}
            {isAuthenticated && navLink('/products', 'Products')}
          </div>

          {/* ── Desktop Actions ── */}
          <div className="hidden md:flex items-center gap-2">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <FiSun size={18} /> : <FiMoon size={18} />}
            </button>

            {isAuthenticated ? (
              <>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800">
                  <div className="w-6 h-6 bg-brand-500 rounded-full flex items-center justify-center">
                    <FiUser size={12} className="text-white" />
                  </div>
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300 max-w-[120px] truncate">
                    {user?.name}
                  </span>
                </div>
                <button onClick={handleLogout} className="btn-secondary !py-1.5 !px-3">
                  <FiLogOut size={15} />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn-secondary !py-1.5 !px-4">Login</Link>
                <Link to="/register" className="btn-primary !py-1.5 !px-4">Register</Link>
              </>
            )}
          </div>

          {/* ── Mobile: theme + hamburger ── */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
            >
              {theme === 'dark' ? <FiSun size={18} /> : <FiMoon size={18} />}
            </button>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
            >
              {menuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* ── Mobile Menu ── */}
      {menuOpen && (
        <div className="md:hidden border-t border-slate-200 dark:border-white/[0.06] bg-white dark:bg-[#0a0a0a] animate-slide-up">
          <div className="px-4 py-4 flex flex-col gap-2">
            {navLink('/', 'Home')}
            {isAuthenticated && navLink('/products', 'Products')}

            <div className="border-t border-slate-200 dark:border-slate-800 my-2" />

            {isAuthenticated ? (
              <>
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-100 dark:bg-slate-800">
                  <div className="w-7 h-7 bg-brand-500 rounded-full flex items-center justify-center">
                    <FiUser size={13} className="text-white" />
                  </div>
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    {user?.name}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="btn-secondary w-full justify-center"
                >
                  <FiLogOut size={15} />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setMenuOpen(false)} className="btn-secondary w-full justify-center">
                  Login
                </Link>
                <Link to="/register" onClick={() => setMenuOpen(false)} className="btn-primary w-full justify-center">
                  Register
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