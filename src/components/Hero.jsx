import React from 'react'
import world from '../assets/7EkkL7ODPfc.jpg'

function Hero() {
    
  return (
    <div className="relative w-full h-screen overflow-hidden">
        {/* <video autoPlay muted loop playsInline className="absolute top-0 left-0 w-full h-full object-cover">
            <source src={bgv}/>
            Your browser does not support the video tag.
        </video> */}
         <img src={world}
        className="absolute top-0 left-0 w-full h-full opacity-30"
        />

        <div className="relative z-20 flex flex-col items-center mt-6 lg:mt-12">
            <h1 className="text-yellow-300 mt-48 text-4xl sm:text-6xl lg:text-7xl text-center tracking-wide font-bold">
                BLAUQTRADING
            </h1>
            <p className="mt-10 text-lg text-center text-white max-w-4xl font-sans">
                Welcome to BLAUQTRADING — South Africa’s next wave in digital innovation.
                We’re not just building a crypto platform; we’re shaping the future of finance, marketing, and distribution.
                Whether you’re investing in the blockchain economy or scaling your business, our solutions are designed to empower and evolve with you.
                Join us and be part of the movement redefining what’s possible.
            </p>
        </div>
    </div>
  )
}

export default Hero
