import NavbarK2 from "../Components/Navbar2";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Swal from "sweetalert2";

function CreateUserPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    password: "",
    email: "",
    address: "",
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  function createUser() {
    if (
      !formData.username ||
      !formData.firstName ||
      !formData.lastName ||
      !formData.password ||
      !formData.email ||
      !formData.address
    ) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please fill all fields!",
      });
    } else {
      axios
        .post(`http://localhost:5002/api/program/create/user`, formData)
        .then((response) => {
          console.log(response);
          Swal.fire("User added!");

          navigate("/users");
        })
        .catch((error) => {
          Swal.fire({
            title: "<strong>Not Allowed! <u>User problem</u></strong>",
            icon: "info",
            showCloseButton: true,
            showCancelButton: true,
            focusConfirm: false,
          });
          console.error("Error creating user:", error);
        });
    }
  }

  function refresh() {
    window.location.reload();
  }

  return (
    <>
      <div>
        <NavbarK2 />
      </div>
      <div
        style={{ marginLeft: "50px", marginRight: "50px", marginTop: "50px" }}
      >
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control
              style={{ width: "800px", height: "50px" }}
              type="text"
              placeholder="Username"
              name="username"
              onChange={handleInputChange}
              value={formData.username}
            />
            <Form.Text className="text-muted"></Form.Text>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              style={{ width: "800px", height: "50px" }}
              placeholder="Firstname"
              type="name"
              name="firstName"
              onChange={handleInputChange}
              value={formData.firstName}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Lastname</Form.Label>
            <Form.Control
              style={{ width: "800px", height: "50px" }}
              type="lastname"
              placeholder="Lastname"
              name="lastName"
              onChange={handleInputChange}
              value={formData.lastName}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              style={{ width: "800px", height: "50px" }}
              placeholder="Password"
              type="password"
              name="password"
              onChange={handleInputChange}
              value={formData.password}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              style={{ width: "800px", height: "50px" }}
              placeholder="Email"
              type="text"
              name="email"
              onChange={handleInputChange}
              value={formData.email}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Address</Form.Label>
            <Form.Control
              style={{ width: "800px", height: "50px" }}
              placeholder="Address"
              type="text"
              name="address"
              onChange={handleInputChange}
              value={formData.address}
            />
          </Form.Group>
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              marginTop: "20px",
            }}
          >
            <Button
              variant="primary"
              style={{
                fontSize: "20px",
                padding: "15px 30px",
                backgroundColor: "#007bff",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                transition: "background-color 0.3s ease",
              }}
              onClick={createUser}
            >
              Submit
            </Button>

            <Button
              variant="primary"
              onClick={refresh}
              style={{
                fontSize: "20px",
                padding: "15px 30px",
                backgroundColor: "#28a745",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                transition: "background-color 0.3s ease",
              }}
            >
              Refresh
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
}

export default CreateUserPage;
