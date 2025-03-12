import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const AdminPrivateRoute = () => {
  // Check if adminToken exists in localStorage
  const isAuthenticated = localStorage.getItem("adminToken");

  // If authenticated, render the child routes (Outlet)
  // Otherwise, redirect to /adminLogin
  return isAuthenticated ? <Outlet /> : <Navigate to="/adminLogin" />;
};

export default AdminPrivateRoute;