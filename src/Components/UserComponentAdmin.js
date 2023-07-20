import Card from "react-bootstrap/Card";
import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import "./stylingCard.css";

function UserComponentAdmin({ user }) {
  const navigate = useNavigate();
  function deleteUser() {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:5002/api/program/delete/user/${user?.id}`)
          .then((response) => {
            console.log("data: ", response.data);
            console.log("deleted");
            window.location.reload();
          })
          .catch((error) => {
            console.error("Error fetching posts:", error);
          });
      }
    });
  }

  return (
    <Card className="shining-card" style={{ width: "18rem" }}>
      <FontAwesomeIcon
        icon={faUser}
        size="3x"
        style={{
          marginBottom: "10px",
          alignContent: "center",
          marginTop: "20px",
        }}
      />
      <Card.Body>
        <Card.Title>{user.username}</Card.Title>
        <Card.Text>
          <b>First name: </b>
          {user.firstName}
        </Card.Text>
        <Card.Text>
          <b>Last name: </b>
          {user.lastName}
        </Card.Text>
        <div>
          {user.deleted ? (
            <Card.Text>
              <b>Status:</b> Disabled
            </Card.Text>
          ) : (
            <Card.Text>
              <b>Status:</b> Enabled
            </Card.Text>
          )}
        </div>
        <Card.Link style={{ cursor: "pointer" }} onClick={() => deleteUser()}>
          Delete
        </Card.Link>
        <Card.Link
          style={{ cursor: "pointer" }}
          onClick={() => navigate(`updateUsers/${user.id}`)}
        >
          Update
        </Card.Link>
      </Card.Body>
    </Card>
  );
}

export default UserComponentAdmin;
