import React, { useState, useEffect } from 'react';
import CheckoutPage from '../Components/Checkout/Section1';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import Loader from '../Components/Loader/Loader'; // Import Loader

function Checkout() {
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
          <CheckoutPage />
          <div style={{marginTop:"350px"}}><Footer  /></div>
        </>
      )}
    </div>
  );
}

export default Checkout;
