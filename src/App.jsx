import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Feature from './components/Feature';
import Footer from './components/Footer';
import WhyUs from './components/WhyUs';
import PartnerWithUs from './components/PartnerWithUs';

// Named export for LandingPage
export const LandingPage = () => (
  <>
    <Navbar />
    <div className="max-w-full mx-auto px-7">
      <Hero />
      <Feature />
      <WhyUs />
      <Footer />
    </div>
  </>
);

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/partner" element={<PartnerWithUs />} />
      </Routes>
    </Router>
  );
}

export default App;