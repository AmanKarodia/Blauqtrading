import { Menu, X, ShoppingBag, ChevronDown, Italic } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { auth } from '../../firebase';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import logo from "../assets/logo.png";
import { navItems } from "../constants";
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef();
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/');
  };

  const toggleNavbar = () => {
    setMobileDrawerOpen(!mobileDrawerOpen);
  };

  const scrollToPrice = () => {
    const el = document.getElementById('price');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      console.error('No element with id="price" found');
    }
  };

  const scrollToFp = () => {
    const el = document.getElementById('fp');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      console.error('No element with id="fp" found');
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownOpen]);

  return (
    <nav className="relative top-0 z-20 py-10 backdrop-blur-lg">
      <div className="container px-4 mx-auto relative lg:text-sm">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex justify-between items-center flex-shrink-0">
            <img className="h-8 w-8 mr-2" src={logo} alt="Logo" />
            <span className="text-xl tracking-tight">BLAUQTRADING</span>
          </div>

          {/* Desktop Nav Items */}
          <div className="hidden lg:flex space-x-8 items-center">
            <button onClick={scrollToFp}>FAQ</button>
            <button onClick={() => navigate("/services")}>Services</button>
            <button onClick={scrollToPrice}>
              <ShoppingBag />
            </button>
          </div>

          {/* User Avatar + Dropdown (Desktop) */}
          <div className="hidden lg:flex justify-center space-x-4 items-center relative">
            {currentUser ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center space-x-2 focus:outline-none"
                >
                  <img
                    src={currentUser.photoURL || 'https://ui-avatars.com/api/?name=User'}
                    alt="User"
                    className="w-8 h-8 rounded-full"
                  />
                  <ChevronDown className="w-4 h-4 text-white" />
                </button>

                {dropdownOpen && (
                  <div className="raletive right-0 mt-4 w-56 bg-neutral-900 border border-neutral-700 rounded z-50">
                    <div className="px-4 py-3 text-sm text-white border-b border-neutral-700">
                      <div className="font-medium truncate">{currentUser.displayName || 'User'}</div>
                      <div className="text-xs text-gray-400 truncate">{currentUser.email}</div>
                    </div>

                    <button
                      onClick={() => alert('/profile')}
                      className="block w-full text-left px-4 py-2 hover:bg-neutral-800 text-white"
                    >
                      Profile
                    </button>
                    <button
                      onClick={() => navigate("/profile")}
                      className="block w-full text-left px-4 py-2 hover:bg-neutral-800 text-white"
                    >
                      Settings
                    </button>

                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 hover:bg-red-600 text-white border-t border-neutral-700"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : null}
          </div>

          {/* Mobile Menu Icon */}
          <div className="lg:hidden md:flex flex-col justify-end">
            <button onClick={toggleNavbar}>
              {mobileDrawerOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        {mobileDrawerOpen && (
          <div className="right-0 z-20 bg-neutral-900 p-12 w-full flex flex-col justify-center items-center lg:hidden">
              {navItems.map((item, index) => (
                <ul key={index} className="py-4 text-white">
                  {item.scrollTo ? (
                    <button
                      onClick={() => {
                        const el = document.getElementById(item.scrollTo);
                        if (el) {
                          el.scrollIntoView({ behavior: 'smooth' });
                          setMobileDrawerOpen(false);
                        }
                      }}
                      className="text-white"
                    >
                      {item.label}
                    </button>
                  ) : item.href ? (
                    <button
                    onClick={() => {
                      navigate(item.href);
                      setMobileDrawerOpen(false);
                    }}
                    >
                      {item.label}
                    </button>
                  ): null}
                </ul>
              ))}

            {/* Mobile User Info */}
            {currentUser && (
              <div className="flex flex-col items-center mt-6 w-full space-y-2">
                <img
                  src={currentUser.photoURL || 'https://ui-avatars.com/api/?name=User'}
                  alt="User"
                  className="w-12 h-12 rounded-full border-2 border-white"
                />
                <p className="text-white font-medium">{currentUser.displayName || 'User'}</p>
                <p className="text-sm text-gray-400">{currentUser.email}</p>

                <button
                  onClick={() => alert('Go to Profile')}
                  className="w-full text-center text-white py-2 hover:bg-neutral-800"
                >
                  Profile
                </button>
                <button
                  onClick={() => alert('Open Settings')}
                  className="w-full text-center text-white py-2 hover:bg-neutral-800"
                >
                  Settings
                </button>
                <button
                  onClick={handleLogout}
                  className="bg-red-600 w-full text-white py-2 rounded hover:bg-red-700"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;