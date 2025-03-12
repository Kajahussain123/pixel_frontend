import React from "react";
import { Box } from "@mui/material";
import Sidebar from "./Sidebar";
import AdminHeader from "./AdminHeader";

const AdminLayout = ({ children }) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      {/* Fixed Header at the Top */}
      <AdminHeader />

      {/* Sidebar on the Left & Main Content on the Right */}
      <Box sx={{ display: "flex", flexGrow: 1 }}>
        <Sidebar />
        <Box sx={{ flexGrow: 1, p: 3, overflowY: "auto" }}>{children}</Box>
      </Box>
    </Box>
  );
};

export default AdminLayout;
