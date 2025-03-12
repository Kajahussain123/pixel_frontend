import React from "react";
import { Navbar, Nav, Container, Button, Dropdown } from "react-bootstrap";
import { FaShoppingCart, FaEnvelope, FaUserCircle } from "react-icons/fa"; // Import profile icon
import { BsFillCartCheckFill } from "react-icons/bs";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Header.css";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("userId"); // Check for token

  const handleButtonClick = () => {
    if (token) {
      navigate("/buynow"); // If token exists, go to Buy Now
    } else {
      navigate("/login"); // If no token, go to Login
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("userId"); // Remove token
    localStorage.removeItem("token");
    navigate("/"); // Redirect to login
  };

  return (
    <Navbar expand="lg" className="bg-light shadow-sm">
      <Container>
        {/* Brand Name */}
        <Navbar.Brand href="/" className="fw-bold">
          <img
            src="https://i.postimg.cc/HLvgQ9Lw/pixel-logo-removebg-preview.png"
            alt="Brand Logo"
            style={{ height: "50px" }}
          />
        </Navbar.Brand>

        {/* Toggle Button for Mobile */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link style={{ fontFamily: "'Playfair Display', serif" }} href="/" className="fw-bold text-dark custom-link ms-4">
              Home
            </Nav.Link>
            <Nav.Link style={{ fontFamily: "'Playfair Display', serif" }} href="/howitworks" className="fw-bold text-dark custom-link ms-4">
              How it works
            </Nav.Link>
            <Nav.Link style={{ fontFamily: "'Playfair Display', serif" }} href="/contactus" className="fw-bold text-dark custom-link ms-4">
              Contact us
            </Nav.Link>
          </Nav>

          {/* Right Side Icons & Button */}
          <div className="d-flex align-items-center iconssection">
            {/* Show messages and cart icons only if token exists */}
            {token && (
              <>
                <Nav.Link href="/admin-messages" className="text-dark me-4">
                  <FaEnvelope size={22} />
                </Nav.Link>

                <Nav.Link href="/checkout" className="text-dark me-4">
                  <BsFillCartCheckFill size={22} />
                </Nav.Link>
              </>
            )}

            {/* Conditional Button */}
            <Button onClick={handleButtonClick} className="custom-button fw-bold" style={{ fontFamily: "'Playfair Display', serif" }}>
              {token ? "Buy Now" : "Buy Now"}
            </Button>

            {/* Profile Dropdown - Only shows if token exists */}
            {token && (
              <Dropdown align="end" className="ms-4">
                <Dropdown.Toggle variant="light" id="profile-dropdown" className="border-0 bg-transparent">
                  <FaUserCircle size={26} className="text-dark" />
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            )}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
