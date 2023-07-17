import React, { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import NavbarK2 from "../Components/Navbar2";

function UpdateUserPage() {
  const params = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    password:"",
    email: "",
    address: ""
  });

  useEffect(() => {
    // Fetch user data from the server and populate the form fields
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:5002/api/program/user/${params.id}`);
        const user = response.data;
        setFormData(user); // Set the entire user object as formData
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUser();
  }, [params.id]);

  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  }

  async function updateUser() {
    try {
      await axios.put(`http://localhost:5002/api/program/update/user/${params.id}`, formData);
      navigate("/users"); // Redirect to the users page after successful update
    } catch (error) {
      console.error("Error updating user:", error);
    }
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

          <Button variant="primary" onClick={updateUser}>
            Submit
          </Button>
        </Form>
      </div>
    </>
  );
}

export default UpdateUserPage;
