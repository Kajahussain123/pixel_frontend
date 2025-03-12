import React from 'react';
import AdminHeader from '../Components/AdminHeader';
import Graphs from '../Components/Home/Section1';
import Sidebar from '../Components/Sidebar'; 
import PixelStatsCards from '../Components/Home/Section2';
import OrdersTable from '../Components/Home/Section3';

function AdminHome() {
  return (
    <div style={{ display: 'flex' }}>
      {/* Sidebar on the left */}
      <Sidebar />
      {/* Content section on the right */}
      <div style={{ flex: 1 }}>
        <AdminHeader />
        <div><PixelStatsCards></PixelStatsCards></div>
        <div>
          <Graphs />
        </div>
        <div><OrdersTable></OrdersTable></div>
      </div>
    </div>
  );
}

export default AdminHome;