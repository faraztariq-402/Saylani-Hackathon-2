import React, { useState } from 'react';
// 

import StudentAttendance from '../screens/adminPanel/studentsAttendance';
const Drawer = ({ open: initialOpen = true, setOpen }) => {
  const [isDrawerOpen, setDrawerOpen] = useState(initialOpen);

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
    if (setOpen) {
      setOpen(true);
    }
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
    if (setOpen) {
      setOpen(false);
    }
  };

  return (
    <div>
      <button onClick={handleDrawerOpen} style={{ height: 10, backgroundColor: 'gray', padding: 13, display: 'flex', justifyContent: 'center', alignItems: 'center', outline: 'none', border: 'none', borderRadius: 5 }}>Open</button>
      {isDrawerOpen && (
        <div
          style={{
            width: '200px',
            height: '100vh',
            backgroundColor: '#f0f0f0',
            position: 'fixed',
            top: 0,
            left: 0,
            zIndex: 1000,
            padding: '16px',
            boxSizing: 'border-box',
          }}
        >
          <button onClick={handleDrawerClose} style={{ height: 10, backgroundColor: 'gray', padding: 13, display: 'flex', justifyContent: 'center', alignItems: 'center', outline: 'none', border: 'none', borderRadius: 5 }}>Close</button>
          <p style={{cursor:'pointer'}}>Students</p>
          <p style={{cursor:'pointer'}} onClick={StudentAttendance}>Attendance</p>
          {/* Add your drawer content here */}
        </div>
      )}
    </div>
  );
};

export default Drawer;