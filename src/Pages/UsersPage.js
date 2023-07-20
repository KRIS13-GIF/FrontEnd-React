import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import UserComponentAdmin from "../Components/UserComponentAdmin";
import NavbarK2 from "../Components/Navbar2";

function UserPage() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = () => {
    axios
      .get(`http://localhost:5002/api/program/showAllUsers`)
      .then((response) => {
        console.log(response);
        setUsers(response.data);
        console.log("data: ", response.data);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
  };

  return (
    <>
      <NavbarK2 />
      <h1
        style={{
          textAlign: "center",
          background: "linear-gradient(to right, #ff4b1f, #1fddff)",
          padding: "10px",
          fontFamily: "Arial, sans-serif",
          fontSize: "48px",
          fontWeight: "bold",
          textTransform: "uppercase",
          color: "#ffffff",
          letterSpacing: "4px",
          textShadow: "2px 2px 4px rgba(0, 0, 0, 0.4)",
        }}
      >
        ADMIN
      </h1>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginRight: "20px",
          marginTop: "20px",
        }}
      >
        <button
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            fontWeight: "bold",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
          onClick={() => navigate("/users/createUsers")}
        >
          Create User
        </button>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gridGap: "20px",
          marginTop: "20px",
          marginLeft: "20px",
        }}
      >
        {users.map((user, idx) => (
          <UserComponentAdmin key={idx} user={user}></UserComponentAdmin>
        ))}
      </div>
    </>
  );
}

export default UserPage;
