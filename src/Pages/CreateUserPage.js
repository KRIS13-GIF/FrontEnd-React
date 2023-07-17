import NavbarK2 from "../Components/Navbar2";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function CreateUserPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    password: "",
    email: "",
    address: ""
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  function createUser() {
    axios.post(`http://localhost:5002/api/program/create/user`, formData)
      .then(response => {
        console.log(response);
        // Handle successful response or redirect to another page
        navigate("/users"); // Redirect to the users page after successful user creation
      })
      .catch(error => {
        console.error('Error creating user:', error);
      });
  }

  return (
    <>
      <div>
        <NavbarK2 />
      </div>
      <div style={{ marginLeft: "50px", marginRight: "50px", marginTop: "50px" }}>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" name="username" onChange={handleInputChange} value={formData.username} />
            <Form.Text className="text-muted"></Form.Text>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control type="name" name="firstName" onChange={handleInputChange} value={formData.firstName} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Lastname</Form.Label>
            <Form.Control type="lastname" name="lastName" onChange={handleInputChange} value={formData.lastName} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" name="password" onChange={handleInputChange} value={formData.password} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control type="text" name="email" onChange={handleInputChange} value={formData.email} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Address</Form.Label>
            <Form.Control type="text" name="address" onChange={handleInputChange} value={formData.address} />
          </Form.Group>

          <Button variant="primary" onClick={createUser}>
            Submit
          </Button>
        </Form>
      </div>
    </>
  );
}

export default CreateUserPage;
