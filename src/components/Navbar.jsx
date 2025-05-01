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

  return (
    <nav className="sticky top-0 z-20 py-10 backdrop-blur-lg">
      <div className="container px-4 mx-auto relative lg:text-sm">
        <div className="flex justify-between items-center">
          <div className="flex justify-between items-center flex-shrink-0">
            <img className="h-8 w-8 mr-2" src={logo} alt="Logo" />
            <span className="text-xl tracking-tight">BLAUQTRADING</span>
          </div>
            <div className="hidden lg:flex space-x-8 items-center">
              <a href="#" className="cursor-pointer">
                FAQ
              </a>
              <button>
                <ShoppingBag />
              </button>
            </div>
            <div className="hidden lg:flex justify-center space-x-12 items-center">
              <a href="https://t.me/ThoughGoldBullGroup" className="bg-yellow-400 text-white py-2 px-3 rounded-3xl">
                Join Now
              </a>
            </div>
          <div className="lg:hidden md:flex flex-col justify-end">
            <button>
              <ShoppingBag />
            </button>
            <button onClick={toggleNavbar}>
              {mobileDrawerOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
        {mobileDrawerOpen && (
          <div className="fixed right-0 z-20 bg-neutral-900 w-full p-12 flex flex-col justify-center items-center lg:hidden">
            <ul>
              {navItems.map((item, index) => (
                <li key={index} className="py-4">
                  <a href={item.href}>{item.label}</a>
                </li>
              ))}
            </ul>
            <div className="flex space-x-6">
              <a href="https://t.me/ThoughGoldBullGroup" className="py-2 px-3 rounded-3xl bg-yellow-400 text-white">
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
