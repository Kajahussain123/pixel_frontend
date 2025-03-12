import React, { useState, useEffect } from 'react';
import Header from '../Components/Header';
import Section1 from '../Components/Home/Section1';
import EventDetails from '../Components/Home/Section2';
import EventSection from '../Components/Home/Section3';
import WhatWeOfferSection from '../Components/Home/Section4';
import Footer from '../Components/Footer';
import Loader from '../Components/Loader/Loader';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';


function Home() {
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const googleToken = urlParams.get("token");
    const googleUserId = urlParams.get("userId");

    console.log("Google Token:", googleToken); // Log the token
    console.log("Google User ID:", googleUserId); // Log the user ID

    if (googleToken && googleUserId) {
      localStorage.setItem("token", googleToken);
      localStorage.setItem("userId", googleUserId);

      console.log("Token and User ID saved to localStorage"); // Log success

      toast.success("Google signup successful!", { position: "top-right" });

      // Optionally, you can clear the URL parameters after saving the token and user ID
      window.history.replaceState({}, document.title, window.location.pathname);
    } else {
      console.log("Token or User ID not found in URL parameters"); // Log if not found
    }
  }, [location.search]);

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
        <Loader /> // Show Loader if Loading is True
      ) : (
        <>
          <Header />
          <Section1 />
          <EventDetails />
          <EventSection />
          <WhatWeOfferSection />
          <Footer />
        </>
      )}
    </div>
  );
}

export default Home;
