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

  const fetchUserDetails = async (userId) => {
    try {
      // Fetch user details
      const response = await axios.get(`${process.env.REACT_APP_API}/api/profile/getUserDetails`);
      console.log("responseeeeeeeeeeeee= ",response);
      // Extract phone number from the response
      return response.data.contactNumber;
    } catch (error) {
      console.error('Error fetching user details:', error);
      return null;
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      // Ask for confirmation
      const confirmDelete = window.confirm("Are you sure you want to delete this user?");
      if (!confirmDelete) {
        return; // If the user cancels, exit the function
      }

      // Send delete request to the server
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

  useEffect(() => {
    // Fetch user details for each user
    const fetchUserDetailsForAllUsers = async () => {
      const promises = users.map(user => fetchUserDetails(user._id));
      const phoneNumbers = await Promise.all(promises);

      // Update users array with phone numbers
      const updatedUsers = users.map((user, index) => ({
        ...user,
        phoneNumber: phoneNumbers[index]
      }));
      setUsers(updatedUsers);
    };

    fetchUserDetailsForAllUsers();
  }, [users]); // Fetch user details whenever users state changes

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
                  <strong>Phone No:</strong> {user.phoneNumber}<br /> {/* Display fetched phone number */}
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
