import React, { useState } from 'react';
import './comp.css';
import Profile from './Profile/Profile';

const Comp = () => {
  const [selectedComponent, setSelectedComponent] = useState(null);

  const handleComponentClick = (component) => {
    setSelectedComponent(component);
  };

  return (
    <>
      <div className='comp-body'>

        <div className={`comp-onent ${selectedComponent === 'Profile' ? 'active' : ''}`} onClick={() => handleComponentClick('Profile')}>
          <h1 className='comp-h1'>Profile</h1>
        </div>

        <div className={`comp-onent ${selectedComponent === 'Complaint' ? 'active' : ''}`} onClick={() => handleComponentClick('Complaint')}>
          <h1 className='comp-h1'>Complaint</h1>
        </div>

        <div className={`comp-onent ${selectedComponent === 'Hostel' ? 'active' : ''}`} onClick={() => handleComponentClick('Hostel')}>
          <h1 className='comp-h1'>Hostel</h1>
        </div>

        <div className={`comp-onent ${selectedComponent === 'Staff' ? 'active' : ''}`} onClick={() => handleComponentClick('Staff')}>
          <h1 className='comp-h1'>Staff</h1>
        </div>

      </div>
    </>
  );
};

export default Comp;
