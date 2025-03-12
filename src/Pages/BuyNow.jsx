import React, { useState, useEffect } from 'react';
import Header from '../Components/Header';
import BuyNowForm from '../Components/BuyNow/Section1';
import Footer from '../Components/Footer';
import Loader from '../Components/Loader/Loader'; // Import Loader

function BuyNow() {
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
          <BuyNowForm />
          <Footer />
        </>
      )}
    </div>
  );
}

export default BuyNow;
