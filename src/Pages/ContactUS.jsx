import React, { useState, useEffect } from 'react';
import Header from '../Components/Header';
import ContactUs from '../Components/ContactUS/Section1';
import Footer from '../Components/Footer';
import Loader from '../Components/Loader/Loader'; // Import Loader

function ContactUS() {
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
          <ContactUs />
          <Footer />
        </>
      )}
    </div>
  );
}

export default ContactUS;
