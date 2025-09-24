import React from 'react';
import { Link } from "react-router-dom";

function Hero() {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background Video (optional) */}
      {/* <video autoPlay muted loop playsInline className="absolute top-0 left-0 w-full h-full object-cover">
          <source src={bgv}/>
          Your browser does not support the video tag.
      </video> */}

      {/* Background Image
      <img
        src={null}
        alt="Hero background"
        className="absolute top-0 left-0 w-full h-full object-cover opacity-30"
      /> */}

      {/* Content */}
      <div className="relative z-20 flex flex-col justify-center h-full px-6 sm:px-12 md:px-20 lg:px-32 xl:px-48">
        <h1 className="text-yellow-300 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-wide">
          BLAUQTRADING - <span className="text-white">Africa's Next Wave in Digital Innovation</span>
        </h1>

        <p className="mt-6 sm:mt-8 text-white text-lg sm:text-xl md:text-2xl max-w-xl md:max-w-2xl lg:max-w-3xl">
          We empower businesses and communities through finance, logistics, telecom, and product affiliation. Partner with us to scale and redefine what’s possible.
        </p>

        {/* Buttons */}
        <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row sm:space-x-4 space-y-3 sm:space-y-0">
          <Link 
          to="/partner"
          className="text-black bg-yellow-500 rounded-lg py-3 px-6 text-lg hover:bg-yellow-500 hover:text-black transition">
            Partner with Us
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Hero;
