import React from 'react'
import Navbar from './components/Navbar'
import Hero from "./components/Hero"
import Feature from './components/Feature'
import FeaturedProduct from "./components/FeaturedProduct"
import Benefits from './components/Benefits'
import Price from "./components/Price"
import Footer from './components/Footer'

const App = () => {
  return (
    <>
    <Navbar />
    <div className="max-w-full mx-auto px-6">
      <Hero />
      <Feature />
      <FeaturedProduct />
      <Benefits />
      <Price />
      <Footer />
    </div>
    </>
  )
}

export default App
