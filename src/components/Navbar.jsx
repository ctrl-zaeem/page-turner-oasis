
import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/80 backdrop-blur-lg shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-bookhaven-700 to-bookhaven-500">
                BookHaven
              </span>
            </Link>
          </div>

          {/* Desktop menu */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`text-sm font-medium transition-colors hover:text-bookhaven-600 ${
                location.pathname === '/' ? 'text-bookhaven-600' : 'text-foreground'
              }`}
            >
              Browse
            </Link>
            {user && (
              <>
                <Link 
                  to="/favorites" 
                  className={`text-sm font-medium transition-colors hover:text-bookhaven-600 ${
                    location.pathname === '/favorites' ? 'text-bookhaven-600' : 'text-foreground'
                  }`}
                >
                  Favorites
                </Link>
                <Link 
                  to="/add-book" 
                  className={`text-sm font-medium transition-colors hover:text-bookhaven-600 ${
                    location.pathname === '/add-book' ? 'text-bookhaven-600' : 'text-foreground'
                  }`}
                >
                  Add Book
                </Link>
              </>
            )}
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium text-gray-600">
                  Hello, {user.name}
                </span>
                <button
                  onClick={handleLogout}
                  className="text-sm font-medium text-bookhaven-600 hover:text-bookhaven-800 transition-colors"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-sm font-medium text-gray-600 hover:text-bookhaven-600 transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="inline-flex items-center justify-center h-9 px-4 py-2 text-sm font-medium text-white bg-bookhaven-600 rounded-md shadow-sm hover:bg-bookhaven-700 transition-colors"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button 
              type="button" 
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-bookhaven-600 hover:bg-gray-100 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {/* Icon for menu toggle */}
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 animate-fade-in">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link 
              to="/" 
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                location.pathname === '/' ? 'text-bookhaven-600 bg-gray-50' : 'text-gray-700 hover:bg-gray-50 hover:text-bookhaven-600'
              }`}
            >
              Browse
            </Link>
            {user && (
              <>
                <Link 
                  to="/favorites" 
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    location.pathname === '/favorites' ? 'text-bookhaven-600 bg-gray-50' : 'text-gray-700 hover:bg-gray-50 hover:text-bookhaven-600'
                  }`}
                >
                  Favorites
                </Link>
                <Link 
                  to="/add-book" 
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    location.pathname === '/add-book' ? 'text-bookhaven-600 bg-gray-50' : 'text-gray-700 hover:bg-gray-50 hover:text-bookhaven-600'
                  }`}
                >
                  Add Book
                </Link>
              </>
            )}
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            {user ? (
              <div className="flex items-center px-5">
                <div className="ml-3">
                  <div className="text-base font-medium text-gray-800">
                    {user.name}
                  </div>
                  <div className="text-sm font-medium text-gray-500">
                    {user.email}
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="ml-auto flex-shrink-0 bg-white p-1 text-gray-700 rounded-full hover:text-bookhaven-600 focus:outline-none"
                >
                  <span className="sr-only">Sign out</span>
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                </button>
              </div>
            ) : (
              <div className="px-5 flex flex-col space-y-2">
                <Link
                  to="/login"
                  className="block text-center w-full px-4 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-bookhaven-600 rounded-md"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="block text-center w-full px-4 py-2 text-base font-medium text-white bg-bookhaven-600 hover:bg-bookhaven-700 rounded-md"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
