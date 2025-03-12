import React from 'react';
import AdminHeader from '../Components/AdminHeader';
import Sidebar from '../Components/Sidebar'; // Import Sidebar
import PixelsManagement from '../Components/Pixels/ManagePixels';

function Pixels() {
  return (
    <div style={{ display: 'flex' }}>
      {/* Sidebar on the left */}
      <Sidebar />

      {/* Content section on the right */}
      <div style={{ flex: 1 }}>
        <AdminHeader />
        <div><PixelsManagement></PixelsManagement></div>
      </div>
    </div>
  );
}

export default Pixels;
