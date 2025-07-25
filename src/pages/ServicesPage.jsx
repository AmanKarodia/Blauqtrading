import React from 'react';
import Navbar from '../components/Navbar';
import OS from '../assets/cytonn.jpg';
import { OurServices } from "../constants";
import { useNavigate } from 'react-router-dom';

function ServicesPage() {
    const navigate = useNavigate();

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <div className="relative w-full h-screen overflow-hidden">
        <img
          src={OS}
          className="absolute top-0 left-0 w-full h-full object-cover opacity-30"
          alt="Background"
        />
        <div className="relative z-20 flex flex-col items-center justify-center h-full px-4 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-wide mt-40 sm:mt-20 lg:mt-0">
            Services
          </h1>
        </div>
      </div>

      {/* Service Cards Section */}
      <div className="mt-20 px-4 sm:px-6 lg:px-20 h-screen">
        <h2 className="text-2xl sm:text-4xl font-bold mb-10 text-center text-yellow-300">
          Our Services
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 py-4 px-1">
          { OurServices.map((service, index) => (
            <div
              key={index}
              className="bg-neutral-800 border border-neutral-700 rounded-2xl shadow-md overflow-hidden hover:shadow-yellow-300/25 transition-shadow duration-300"
            >
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl mb-2 text-yellow-300">
                  {service.title}
                </h3>
                <p className="text-neutral-400 mb-4">{service.description}</p>
                <button 
                type='button'
                onClick={() => navigate('/DelForm')}
                className="inline-block bg-yellow-300 text-black text-xs font-medium px-3 py-1 rounded-full active:bg-black active:text-white">
                  {service.button}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default ServicesPage