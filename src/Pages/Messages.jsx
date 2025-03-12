import React, { useState, useEffect } from 'react';
import UserMessages from '../Components/Messages/ViewMessages';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import Loader from '../Components/Loader/Loader'; // Import Loader

function AdminMessages() {
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
          <UserMessages />
          <div style={{marginTop:"450px"}}><Footer /></div>
        </>
      )}
    </div>
  );
}

export default AdminMessages;
