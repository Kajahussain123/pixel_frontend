import React from 'react';
import AdminHeader from '../Components/AdminHeader';
import Sidebar from '../Components/Sidebar'; // Import Sidebar
import UserManagement from '../Components/Users/UserView';
import AdminMessages from '../Components/Messages/ViewMessages';

function Messages() {
  return (
    <div style={{ display: 'flex' }}>
      {/* Sidebar on the left */}
      <Sidebar />

      {/* Content section on the right */}
      <div style={{ flex: 1 }}>
        <AdminHeader />
        <div><AdminMessages></AdminMessages></div>
      </div>
    </div>
  );
}

export default Messages;
