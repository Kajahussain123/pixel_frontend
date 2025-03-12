import React, { useState, useEffect } from 'react';
import Header from '../Components/Header';
import WhatWeOfferSection from '../Components/WhatWeOffer/Section1';
import Footer from '../Components/Footer';
import Loader from '../Components/Loader/Loader'; // Import Loader

function WhatWeOffer() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); // Loader displays for 2 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {loading ? (
        <Loader /> // Show Loader while loading
      ) : (
        <>
          <Header />
          <WhatWeOfferSection />
          <Footer />
        </>
      )}
    </div>
  );
}

export default WhatWeOffer;
