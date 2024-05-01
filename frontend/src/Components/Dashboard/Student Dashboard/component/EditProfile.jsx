import React from "react";
import { Card, Form, Button } from "react-bootstrap";

const StudentProfileForm = ({
  gender,
  setGender,
  dateOfBirth,
  setDateOfBirth,
  contactNumber,
  setContactNumber,
  handleSubmit,
  handleDeleteProfile,
  handleImageChange,
}) => {
  return (
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
  );
};

export default StudentProfileForm;
