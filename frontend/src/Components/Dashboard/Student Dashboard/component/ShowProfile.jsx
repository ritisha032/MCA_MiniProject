import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import { useAuth } from "../../../../context/auth";
import axios from "axios";

function StudentProfile() {
  const { auth, setAuth } = useAuth();

  const user = localStorage.getItem("auth");
  const parsedData = JSON.parse(user);

  const [studentName, setStudentName] = useState("");
  const [hostelName, setHostelName] = useState("");
  const [roomNumber, setRoomNumber] = useState("");
  const [gender, setGender] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const fetchUserData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API}/api/profile/getUserDetails`
      );
      const userData = response.data.data;
      console.log("user data= ", userData);
  
      // Set gender, phone number, and image URL
      setGender(userData.additionalDetails.gender);
      setPhoneNumber(userData.additionalDetails.contactNumber);
      setImageUrl(userData.additionalDetails.image);
  
      // Format date of birth
      const dob = new Date(userData.additionalDetails.dateOfBirth);
      const formattedDob = `${dob.getDate()}/${dob.getMonth() + 1}/${dob.getFullYear()}`;
      setDateOfBirth(formattedDob);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };
  

  useEffect(() => {
    setStudentName(parsedData.user.name);
    setHostelName(parsedData.messName);
    setRoomNumber(parsedData.user.roomNo);

    fetchUserData();
  }, []);

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
              <Card.Text style={{ fontSize: "1.5rem", textAlign: "center" }}>
                Gender: {gender}
              </Card.Text>
              <Card.Text style={{ fontSize: "1.5rem", textAlign: "center" }}>
                Phone Number: {phoneNumber}
              </Card.Text>
              <Card.Text style={{ fontSize: "1.5rem", textAlign: "center" }}>
                Date of Birth: {dateOfBirth}
              </Card.Text>
              {imageUrl && (
                <div className="text-center mt-3">
                  <img
                    src={imageUrl}
                    alt="Profile"
                    style={{ maxWidth: "100%", height: "auto" }}
                  />
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default StudentProfile;
