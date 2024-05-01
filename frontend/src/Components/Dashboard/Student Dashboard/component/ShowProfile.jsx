import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useAuth } from "../../../../context/auth";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

function StudentProfile() {
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();

  const user = localStorage.getItem("auth");
  const parsedData = JSON.parse(user);

  const [studentName, setStudentName] = useState("");
  const [hostelName, setHostelName] = useState("");
  const [roomNumber, setRoomNumber] = useState("");

  const [gender, setGender] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [displayPicture, setDisplayPicture] = useState(null);
  const [imageUrl, setImageUrl] = useState(""); // Added state for image URL

  useEffect(() => {
    setStudentName(parsedData.user.name);
    setHostelName(parsedData.messName);
    setRoomNumber(parsedData.user.roomNo);

    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API}/api/profile/getUserDetails`
      );
      const {
        gender,
        dateOfBirth,
        contactNumber,
        image // Assuming the key for image URL is 'image'
      } = response.data.data.additionalDetails;
      const formattedDateOfBirth = new Date(dateOfBirth)
        .toISOString()
        .split("T")[0];
      setGender(gender);
      setDateOfBirth(formattedDateOfBirth);
      setContactNumber(contactNumber);
      setImageUrl(image); // Set the image URL state variable
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Validate contact number
      const contactNumStr = contactNumber.toString();
      if (contactNumStr.length !== 10) {
        toast.error("Contact number must be 10 digits long.");
        return;
      }
  
      const profileData = {
        gender,
        dateOfBirth,
        contactNumber,
      };
  
      // Update profile data
      const profileResponse = await axios.put(
        `${process.env.REACT_APP_API}/api/profile/updateProfile`,
        profileData
      );
  
      toast.success(profileResponse.data.message);
      console.log("Profile updated successfully:", profileResponse.data);
  
      // Refetch user data to update the UI
      fetchUserData();
  
      // Update display picture
      if (displayPicture) {
        const formData = new FormData();
        formData.append("displayPicture", displayPicture);
  
        const displayPictureResponse = await axios.put(
          `${process.env.REACT_APP_API}/api/profile/updateDisplayPicture`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
  
        console.log(displayPictureResponse);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };
  
  

  const handleDeleteProfile = async () => {
    if (
      window.confirm(
        "Are you sure you want to delete your account? This action cannot be undone."
      )
    ) {
      try {
        const response = await axios.delete(
          `${process.env.REACT_APP_API}/api/profile/deleteProfile`
        );

        
        toast.success(response.data.message);
        console.log("Profile deleted successfully:", response.data);
navigate("/login");
        localStorage.removeItem("auth");
        Cookies.remove("token");
        setAuth({
          user: null,
          token: "",
        });
        toast.success("Account Deletion Successful");
        
      } catch (error) {
        console.error("Error deleting profile:", error);
      }
    }
  };

  const handleImageChange = (e) => {
    setDisplayPicture(e.target.files[0]);
  };

  return (
    <Container>
      <Row className="justify-content-center mt-4">
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title style={{ fontSize: "2rem", textAlign: "center" }}>
                Hello {studentName}
              </Card.Title>
              <Card.Text style={{ fontSize: "1.5rem", textAlign: "center" }}>
                Hostel Name: {hostelName}
              </Card.Text>
              <Card.Text style={{ fontSize: "1.5rem", textAlign: "center" }}>
                Room Number: {roomNumber}
              </Card.Text>
              {imageUrl && (
                <div className="text-center mt-3">
                  <img src={imageUrl} alt="Profile" style={{ maxWidth: "100%", height: "auto" }} />
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="justify-content-center mt-4">
        <Col md={6}>
          <Card>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formImage">
                  <Form.Label>Profile Picture:</Form.Label>
                  <Form.Control
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </Form.Group>
                <Form.Group controlId="formGender">
                  <Form.Label>Gender:</Form.Label>
                  <Form.Check
                    type="radio"
                    label="Male"
                    name="gender"
                    value="male"
                    checked={gender === "male"}
                    onChange={(e) => setGender(e.target.value)}
                  />
                  <Form.Check
                    type="radio"
                    label="Female"
                    name="gender"
                    value="female"
                    checked={gender === "female"}
                    onChange={(e) => setGender(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="formDateOfBirth">
                  <Form.Label>Date of Birth:</Form.Label>
                  <Form.Control
                    type="date"
                    value={dateOfBirth}
                    onChange={(e) => setDateOfBirth(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="formContactNumber">
                  <Form.Label>Contact Number:</Form.Label>
                  <Form.Control
                    type="number"
                    value={contactNumber}
                    onChange={(e) => setContactNumber(e.target.value)}
                  />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Update Profile
                </Button>
                <Button
                  variant="danger"
                  onClick={handleDeleteProfile}
                  className="ml-2"
                >
                  Delete Profile
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default StudentProfile;
