import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import NavbarK2 from "../Components/Navbar2";
import Swal from "sweetalert2";

function UpdateUserPage() {
  const params = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    password: "",
    email: "",
    address: "",
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5002/api/program/user/${params.id}`
        );
        const user = response.data;
        setFormData(user);
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
      [name]: value,
    }));
  }

  async function updateUser() {
    try {
      await axios.put(
        `http://localhost:5002/api/program/update/user/${params.id}`,
        formData
      );
      navigate("/users");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please, fill all fields!",
      });
      console.error("Error updating user:", error);
    }
  }

  return (
    <>
      <div>
        <NavbarK2 />
      </div>
      <div
        style={{
          marginLeft: "50px",
          marginRight: "50px",
          marginTop: "50px",
          position: "center",
        }}
      >
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control
              style={{ width: "800px", height: "50px" }}
              type="text"
              name="username"
              onChange={handleInputChange}
              value={formData.username}
              placeholder="Username"
            />
            <Form.Text className="text-muted"></Form.Text>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              style={{ width: "800px", height: "50px" }}
              type="name"
              name="firstName"
              onChange={handleInputChange}
              value={formData.firstName}
              placeholder="Firstname"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Lastname</Form.Label>
            <Form.Control
              style={{ width: "800px", height: "50px" }}
              type="lastname"
              name="lastName"
              onChange={handleInputChange}
              value={formData.lastName}
              placeholder="Lastname"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              style={{ width: "800px", height: "50px" }}
              type="password"
              name="password"
              onChange={handleInputChange}
              value={formData.password}
              placeholder="password"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              style={{ width: "800px", height: "50px" }}
              type="text"
              name="email"
              onChange={handleInputChange}
              value={formData.email}
              placeholder="Email"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Address</Form.Label>
            <Form.Control
              style={{ width: "800px", height: "50px" }}
              type="text"
              name="address"
              onChange={handleInputChange}
              value={formData.address}
              placeholder="Address"
            />
          </Form.Group>

          <Button
            variant="primary"
            onClick={updateUser}
            style={{
              fontSize: "18px",
              padding: "10px 20px",
              color: "black",
              margin: "8px",
              border: "2px solid #000",
              borderRadius: "4px",
              fontWeight: "bold",
              backgroundColor: "#fff",
              transition: "all 0.3s",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = "#000";
              e.target.style.color = "#fff";
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = "#fff";
              e.target.style.color = "#000";
            }}
          >
            Submit
          </Button>
        </Form>
      </div>
    </>
  );
}

export default UpdateUserPage;
