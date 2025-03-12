import React, { useState, useEffect } from 'react';
import Header from '../Components/Header';
import EventSection from '../Components/Event/Section1';
import Footer from '../Components/Footer';
import Loader from '../Components/Loader/Loader'; // Import Loader

function Event() {
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
          <EventSection />
          <Footer />
        </>
      )}
    </div>
  );
}

export default Event;
