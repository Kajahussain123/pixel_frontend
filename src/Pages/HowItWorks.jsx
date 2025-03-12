import React, { useState, useEffect } from 'react';
import Header from '../Components/Header';
import HowItWorksDesign from '../Components/HowItWorks/Section1';
import HowItWorksDesign1 from '../Components/HowItWorks/Section2';
import Footer from '../Components/Footer';
import Loader from '../Components/Loader/Loader'; // Import Loader

function HowItWorks() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); // Loader shows for 2 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {loading ? (
        <Loader /> // Show Loader while loading
      ) : (
        <>
          <Header />
          <HowItWorksDesign />
          <HowItWorksDesign1 />
          <Footer />
        </>
      )}
    </div>
  );
}

export default HowItWorks;
