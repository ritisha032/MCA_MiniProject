import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
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
  
      setGender(userData.additionalDetails.gender);
      setPhoneNumber(userData.additionalDetails.contactNumber);
      setImageUrl(userData.additionalDetails.image);
  
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
        <Col md={8}>
          <Card className="bg-light"> {/* Add background color class here */}
            <Card.Body>
              <Row>
                <Col md={3} className="text-center">
                  {imageUrl && (
                    <img
                      src={imageUrl}
                      alt="Profile"
                      className="rounded-circle"
                      style={{
                        width: "150px",
                        height: "150px",
                        objectFit: "cover",
                        border: "4px solid #007bff", // Add a border color
                      }}
                    />
                  )}
                </Col>
                <Col md={9}>
                  <Card.Title style={{ fontSize: "2rem" }}>
                    Hello {studentName}
                  </Card.Title>
                  <Table
                    bordered
                    hover
                    responsive
                    style={{ backgroundColor: "#f8f9fa" }} 
                  >
                    <tbody>
                      <tr>
                        <td><strong>Hostel Name:</strong></td>
                        <td>{hostelName}</td>
                      </tr>
                      <tr>
                        <td><strong>Room Number:</strong></td>
                        <td>{roomNumber}</td>
                      </tr>
                      <tr>
                        <td><strong>Gender:</strong></td>
                        <td>{gender}</td>
                      </tr>
                      <tr>
                        <td><strong>Phone Number:</strong></td>
                        <td>{phoneNumber}</td>
                      </tr>
                      <tr>
                        <td><strong>Date of Birth:</strong></td>
                        <td>{dateOfBirth}</td>
                      </tr>
                    </tbody>
                  </Table>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default StudentProfile;
