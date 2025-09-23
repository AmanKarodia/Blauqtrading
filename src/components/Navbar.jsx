import { ShoppingBag } from 'lucide-react';
import { useState } from 'react';
import logo from "../assets/logo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToPrice = () => {
    const el = document.getElementById('price');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToFp = () => {
    const el = document.getElementById('fp');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className="relative top-0 z-20 py-10 backdrop-blur-lg">
      <div className="container px-4 mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center flex-shrink-0">
          <img className="h-8 w-8 mr-2" src={logo} alt="Logo" />
          <span className="text-xl tracking-tight">BLAUQTRADING</span>
        </div>

        {/* Desktop Nav Items */}
        <div className="hidden md:flex flex-grow justify-end space-x-8 items-end">
          <button onClick={scrollToFp} className="hover:text-yellow-500 transition">FAQ</button>
          <button className="hover:text-yellow-500 transition">Services</button>
          <button onClick={scrollToPrice} className="hover:text-yellow-500 transition">
            <ShoppingBag />
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-md hover:bg-gray-200"
          >
            {/* Hamburger icon */}
            {isOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden shadow-md py-2 px-4 flex flex-col space-y-2">
          <button onClick={scrollToFp} className="text-left hover:text-yellow-500 transition">FAQ</button>
          <button className="text-left hover:text-yellow-500 transition">Services</button>
          <button onClick={scrollToPrice} className="text-left hover:text-yellow-500 transition">
            <ShoppingBag />
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
