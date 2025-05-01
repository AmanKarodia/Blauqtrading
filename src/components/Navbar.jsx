import { Menu, X } from "lucide-react";
import { useState } from "react";
import { ShoppingBag } from 'lucide-react';
import logo from "../assets/logo.png";
import { navItems } from "../constants";

const Navbar = () => {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

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

  return (
    <nav className="sticky top-0 z-20 py-10 backdrop-blur-lg">
      <div className="container px-4 mx-auto relative lg:text-sm">
        <div className="flex justify-between items-center">
          <div className="flex justify-between items-center flex-shrink-0">
            <img className="h-8 w-8 mr-2" src={logo} alt="Logo" />
            <span className="text-xl tracking-tight">BLAUQTRADING</span>
          </div>
            <div className="hidden lg:flex space-x-8 items-center">
              <button onClick={scrollToFp}>
                FAQ
              </button>
              <button onClick={scrollToPrice}>
                <ShoppingBag />
              </button>
            </div>
            <div className="hidden lg:flex justify-center space-x-12 items-center">
              <a href="https://t.me/ThoughGoldBullGroup" className="bg-yellow-400 text-white py-2 px-3 rounded-3xl">
                Join Now
              </a>
            </div>
          <div className="lg:hidden md:flex flex-col justify-end">
            <button onClick={toggleNavbar}>
              {mobileDrawerOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
        {mobileDrawerOpen && (
          <div className="right-0 z-20 bg-neutral-900 p-12 w-full flex flex-col justify-center items-center lg:hidden">
            <ul>
            {navItems.map((item, index) => (
                <li key={index} className="py-4 text-white">
                  {item.scrollTo ? (
                    <button
                      onClick={() => {
                        const el = document.getElementById(item.scrollTo);
                        if (el) {
                          el.scrollIntoView({ behavior: 'smooth' });
                          setMobileDrawerOpen(false); // close drawer
                        }
                      }}
                      className="text-white"
                    >
                      {item.label}
                    </button>
                  ) : (
                    <a href={item.href} className="text-white">
                      {item.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
            <div className="flex">
              <a 
              href="https://t.me/ThoughGoldBullGroup" 
              className="bg-yellow-400 text-white py-2 px-3 rounded-3xl"
              target="_blank"
              >
                Join Now
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar
