import React from 'react';
import AdminHeader from '../Components/AdminHeader';
import Sidebar from '../Components/Sidebar'; // Import Sidebar
import AdminMessages from '../Components/Messages/ViewMessages';
import AdminBuyNowForm from '../Components/BuyPixel/Form';

function AdminBuyPixel() {
  return (
    <div style={{ display: 'flex' }}>
      {/* Sidebar on the left */}
      <Sidebar />

      {/* Content section on the right */}
      <div style={{ flex: 1 }}>
        <AdminHeader />
        <div><AdminBuyNowForm></AdminBuyNowForm></div>
      </div>
    </div>
  );
}

export default AdminBuyPixel;
