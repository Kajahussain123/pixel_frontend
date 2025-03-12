import React from 'react';
import AdminHeader from '../Components/AdminHeader';
import Sidebar from '../Components/Sidebar'; // Import Sidebar
import UserManagement from '../Components/Users/UserView';

function Users() {
  return (
    <div style={{ display: 'flex' }}>
      {/* Sidebar on the left */}
      <Sidebar />

      {/* Content section on the right */}
      <div style={{ flex: 1 }}>
        <AdminHeader />
        <div><UserManagement></UserManagement></div>
      </div>
    </div>
  );
}

export default Users;
