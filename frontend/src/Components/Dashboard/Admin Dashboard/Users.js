import React, { useState, useEffect } from 'react';
import axios from "axios";

const Users = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      // Retrieve auth data from localStorage
      const auth = JSON.parse(localStorage.getItem("auth"));
      
      // Fetch users data
      const response = await axios.get(`${process.env.REACT_APP_API}/api/admin/${auth.messName}`);
      
      const data = response.data; // Accessing the 'data' property
      setUsers(data); // Set users state
    } catch (error) {
      console.error(error);
      // Handle error
    }
  };

  useEffect(() => {
    // Fetch data when component mounts
    fetchUsers();

    // Clean up function to avoid memory leaks
    return () => {
      // cleanup code here if needed
    };
  }, []); // Empty dependency array ensures this effect runs only once when component mounts

  const handleDeleteUser = async (userId) => {
    try {
      // Ask for confirmation
      const confirmDelete = window.confirm("Are you sure you want to delete this user?");
      if (!confirmDelete) {
        return; // If user cancels, do nothing
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
        // Handle failure to delete user
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      // Handle error
    }
  };

  return (
    <div>
      <h2>User List</h2>
      <ul>
        {users.map(user => (
          <li key={user._id}>
            {user.name}
            <button onClick={() => handleDeleteUser(user._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Users;
