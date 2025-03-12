import React from 'react';
import AdminHeader from '../Components/AdminHeader';
import Sidebar from '../Components/Sidebar';
import ViewOrders from '../Components/Orders/ViewOrders';

function Orders() {
  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      {/* Sidebar on the left */}
      <Sidebar />

      {/* Content section on the right */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'auto' }}>
        <AdminHeader />
        <div style={{ flex: 1, overflowY: 'auto', padding: '16px' }}>
          <ViewOrders />
        </div>
      </div>
    </div>
  );
}

export default Orders;
