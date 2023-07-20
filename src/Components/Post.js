import Card from "react-bootstrap/Card";
import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import "../Components/stylingCard.css";

function Post({ post }) {
  const navigate = useNavigate();
  const params = useParams();

  function deletePost() {
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
          .put(`http://localhost:5002/api/program/delete/post/${post.id}`)
          .then((res) => {
            Swal.fire("Deleted!", "Your file has been deleted.", "success");
            console.log("Deleted");
            window.location.reload();
          })
          .catch((error) => {
            console.error("Error fetching posts:", error);
          });
      }
    });
  }

  function addFav() {
    axios
      .post(`http://localhost:5002/api/program/addFav/${post.id}`)
      .then((res) => {
        console.log("Added to favorite");
        alert("Post added to favorite !");
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
  }

  return (
    <>
      <Card
        style={{
          width: "18rem",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
          transition: "box-shadow 0.3s ease",
          borderRadius: "8px",
          cursor: "pointer",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = "0px 4px 8px rgba(0, 0, 0, 0.3)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = "0px 4px 8px rgba(0, 0, 0, 0.1)";
        }}
      >
        <FontAwesomeIcon icon={faImage} size="3x" />
        <Card.Body style={{ paddingTop: "10px" }}>
          <Card.Title
            style={{
              color: "#333",
              fontWeight: "bold",
              fontSize: "24px",
              marginBottom: "10px",
            }}
          >
            {post.title}
          </Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            {post.address}
          </Card.Subtitle>
          <Card.Subtitle className="mb-2 text-muted">
            {post.status}
          </Card.Subtitle>
          <Card.Subtitle className="mb-2 text-muted">
            {post.user.username}
          </Card.Subtitle>

          <Card.Text
            style={{ color: "#666", fontSize: "18px", marginBottom: "20px" }}
          >
            {post.description}
          </Card.Text>
          <Card.Link
            className="link"
            style={{
              cursor: "pointer",

              marginRight: "10px",
              fontSize: "16px",
            }}
            onClick={() => deletePost()}
          >
            Delete
          </Card.Link>
          {post.status !== "APPROVED" && (
            <Card.Link
              className="link"
              style={{
                cursor: "pointer",
                marginRight: "10px",
                fontSize: "16px",
              }}
              onClick={() => navigate(`/update/${post.id}`)}
            >
              Edit
            </Card.Link>
          )}
          <Card.Link
            className="link"
            style={{
              cursor: "pointer",

              marginRight: "10px",
              fontSize: "16px",
            }}
            onClick={() => addFav()}
          >
            Add fav
          </Card.Link>
        </Card.Body>
      </Card>
    </>
  );
}

export default Post;
