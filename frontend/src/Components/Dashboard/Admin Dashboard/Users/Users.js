import React, { useState, useEffect } from 'react';
import axios from "axios";

const Users = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      // Retrieve auth data from local storage
      const auth = JSON.parse(localStorage.getItem("auth"));

      // Fetch users data
      const response = await axios.get(`${process.env.REACT_APP_API}/api/admin/${auth.messName}`);
     
      console.log("users ka data= ",response);      
      const data = response.data; // Accessing the 'data' property
      setUsers(data); // Set users state
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    // Fetch data when component mounts
    fetchUsers();

    // Clean up function to avoid memory leaks
    return () => {
      // cleanup code here if needed
    };
  }, []);

  const handleDeleteUser = async (userId) => {
    try {
      // Ask for confirmation
      const confirmDelete = window.confirm("Are you sure you want to delete this user?");
      if (!confirmDelete) {
        return; // If the user cancels, exit the function
      }

      // Send delete request to the server
      console.log("user Id= ", userId);
      const response = await axios.delete(`${process.env.REACT_APP_API}/api/admin/${userId}`);
      console.log("response= ", response);

      if (response.data.success) {
        // If deletion was successful, re-fetch the user list
        fetchUsers();
      } else {
        console.error('Failed to delete user:', response.data.error);
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div className="container">
      <h2 className="my-4">User List</h2>
      <div className="row">
        {users.map(user => (
          <div key={user._id} className="col-md-4 mb-4">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">{user.name}</h5>
                <p className="card-text">
                  <strong>Room No:</strong> {user.roomNo}<br />
                  <strong>Phone No:</strong> {user.phoneNo}<br />
                  <strong>Address:</strong> {user.address}
                </p>
              </div>
              <div className="card-footer">
                <button className="btn btn-danger w-100" onClick={() => handleDeleteUser(user._id)}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Users;
