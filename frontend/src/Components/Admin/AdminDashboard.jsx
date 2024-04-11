import React from 'react';
import { useAuth } from '../../context/auth'; // Update the path
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
const AdminDashboard = () => {
 
  const [auth, setAuth] = useAuth();
  const navigate=useNavigate();
  const handleLogout = () => {
    // Clear user details and token from local storage
    localStorage.removeItem("auth");
    // Reset auth state using setAuth
    setAuth({
      user: null,
      token: ""
    });
    // Navigate to "/" route
    toast.success("Logout Successful");
    navigate("/");
  };

  return (
    <>
      <div className="admin-dashboard">
        <p>Hello everyone</p>
        <button
          style={{
            backgroundColor: 'black',
            color: 'white',
            padding: '8px 16px',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </>
  );
};

export default AdminDashboard;
