import React, { useState, useEffect } from 'react';
import Header from '../Components/Header';
import BenefitSection from '../Components/Benefit/Section1';
import Footer from '../Components/Footer';
import Loader from '../Components/Loader/Loader';

function Benefit() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); // Show loader for 2 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {loading ? (
        <Loader /> // Show Loader while loading
      ) : (
        <>
          <Header />
          <BenefitSection />
          <Footer />
        </>
      )}
    </div>
  );
}

export default Benefit;
