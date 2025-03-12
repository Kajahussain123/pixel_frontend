import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import Dropdown from "react-bootstrap/Dropdown";
import { PersonCircle, Bell } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";

function AdminHeader() {
  const navigate = useNavigate()
  const handleLogout = () => {
    localStorage.removeItem("adminId"); // Remove token
    localStorage.removeItem("adminToken");
    navigate("/adminLogin"); 
  };
  return (
    <Navbar className="bg-body-tertiary" >
      <Container>
      {/* <Navbar.Brand href="#home"><b>Pixel</b></Navbar.Brand> */}
        {/* Search Bar in the Center */}
        <Form className="d-flex mx-auto" style={{ maxWidth: "500px", width: "100%" }}>
          <Form.Control
            type="search"
            placeholder="Search"
            className="me-2"
            aria-label="Search"
          />
        </Form>

        {/* Right Side: Notification Icon and Profile Dropdown */}
        <div className="d-flex align-items-center">
          {/* Notification Icon */}
          <Bell className="me-3" size={20} style={{ cursor: "pointer" }} />

          {/* Profile Dropdown */}
          <Dropdown align="end">
            <Dropdown.Toggle variant="light" id="dropdown-profile">
              <PersonCircle size={24} />
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="/adminLogin" onClick={handleLogout}>Login</Dropdown.Item>
              <Dropdown.Item href="/adminLogin" onClick={handleLogout}>Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </Container>
    </Navbar>
  );
}

export default AdminHeader;