import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import './Section1.css';
import { useNavigate } from "react-router-dom";
import image1 from '../../assets/image1.png'
import image2 from '../../assets/image2.png'
import image3 from '../../assets/image3.png'

function Kaja() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true }); // Initialize AOS
  }, []);

  const navigate = useNavigate();
  const token = localStorage.getItem("userId"); // Check for token

  const handleButtonClick = () => {
    if (token) {
      navigate("/buynow"); // If token exists, go to Buy Now
    } else {
      navigate("/login"); // If no token, go to Login
    }
  };

  return (
    <div className="container1">
      <p className="top-text" data-aos="fade-down" style={{ fontFamily: '"Inter", sans-serif' }}>
        Turn Your Brand Into the Star of a Viral Event!
      </p>
      <div className="content" data-aos="zoom-in">
        <h2 className="heading-main" style={{ fontFamily: "'Playfair Display', serif" }}>
          Welcome to the Treasure Hunt Challenge <br /> Where innovation meets opportunity
        </h2>
        <button onClick={handleButtonClick} className="buy-now-btn" style={{ fontFamily: "'Playfair Display', serif" }} data-aos="fade-up">{token ? "Participate Now" : "Participate Now"}</button>
      </div>
      <p className="bottom-text" data-aos="fade-up" style={{ fontFamily: '"Inter", sans-serif' }}>
        Imagine your brand front and center in a unique,<br /> interactive event that thousands of people are excited to join and share.
      </p>
      <img src={image1} 
           alt="Corner 1" className="corner top-left" data-aos="fade-in" />
      <img src={image2} 
           alt="Corner 2" className="corner top-right" data-aos="fade-in" />
      <img src={image3} 
           alt="Corner 3" className="corner bottom-left" data-aos="fade-in" />
      <img src={image3}
           alt="Corner 4" className="corner bottom-right" data-aos="fade-in" />
    </div>
  );
}

export default Kaja;
