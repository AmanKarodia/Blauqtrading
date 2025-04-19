import React from 'react'
import bgv from "../assets/bgv.mp4"

function Hero() {
  return (
    <div className="relative w-full h-screen overflow-hidden">
        <video autoPlay muted loop playsInline className="absolute top-0 left-0 w-full h-full object-cover">
            <source src={bgv}/>
            Your browser does not support the video tag.
        </video>

        <div className="relative z-20 flex flex-col items-center mt-6 lg:mt-12">
            <h1 className="mt-48 text-4xl sm:text-6xl lg:text-7xl text-center tracking-wide font-bold">
                BLAUQTRADING
            </h1>
            <p className="mt-10 text-lg text-center text-neutral-300 max-w-4xl font-sans">
                Welcome to BlauqTrading, South Africa's next big innovation in cryptocurrency.
                We're here to revolutionize your perspective on digital with cutting-edge solutions and opportunities.
                Join us on this exciting journey as we reshape the future of finance together, while also offering marketing and distribution solutions to meet your needs.
                Let's explore the possibilities of the digital currency landscape.
            </p>
        </div>
    </div>
  )
}

export default Hero
