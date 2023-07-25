import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import axios from "axios";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import "../Components/stylingCard.css";
import { useNavigate } from "react-router-dom";

function Post({ post }) {
  const [img, setImg] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    fetchImage(post.id);
  }, [post.id]);

  const fetchImage = async (id) => {
    try {
      const imageUrl = `http://localhost:5002/api/program/${id}`;
      const res = await fetch(imageUrl);

      if (res.ok) {
        const imageBlob = await res.blob();
        const imageObjectURL = URL.createObjectURL(imageBlob);
        setImg(imageObjectURL);
      } else {
        setImg(null);
      }
    } catch (error) {
      console.error("Error:", error);

      setImg(null);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) {
      return;
    }
    const formData = new FormData();
    formData.append("image", file);

    axios
      .post(`http://localhost:5002/api/program/upload/${post.id}`, formData)
      .then((res) => {
        console.log("Image uploaded successfully.");

        fetchImage(post.id);
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error uploading image:", error);
      });
  };

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
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "You can not put two times the same favourite !",
        });
        console.error("Error fetching posts:", error);
      });
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString();
  };

  return (
    <>
      <Card
        style={{
          width: "25rem",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
          transition: "box-shadow 0.3s ease",
          borderRadius: "8px",
          cursor: "pointer",
          border: "4px solid red",
          borderRadius: "10px",
          padding: "10px",
          fontWeight: "bold",
          color: "black",
          fontSize: "16px",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = "0px 4px 8px rgba(0, 0, 0, 0.3)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = "0px 4px 8px rgba(0, 0, 0, 0.1)";
        }}
      >
        {img ? (
          <img
            src={img}
            alt="Post Image"
            style={{ width: "100%", maxHeight: "200px", objectFit: "cover" }}
          />
        ) : (
          <FontAwesomeIcon icon={faImage} size="5x" />
        )}
        <Card.Body style={{ paddingTop: "10px" }}>
          <Card.Title
            style={{
              color: "#333",
              fontWeight: "bold",
              fontSize: "24px",
              marginBottom: "10px",
            }}
          >
            Title: {post.title}
          </Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            <u>Address:</u> {post.address}
          </Card.Subtitle>
          <Card.Subtitle className="mb-2 text-muted">
            <u>Status</u> {post.status}
          </Card.Subtitle>
          <Card.Subtitle className="mb-2 text-muted">
            <u>Username</u> {post.user.username}
          </Card.Subtitle>

          <Card.Text
            style={{ color: "#666", fontSize: "18px", marginBottom: "20px" }}
          >
            <u>Description</u> {post.description}
          </Card.Text>

          <Card.Text
            style={{ color: "#666", fontSize: "18px", marginBottom: "20px" }}
          >
            Created at: {formatDate(post.createdAt)}{" "}
            {formatTime(post.createdAt)}
          </Card.Text>

          <div style={{ display: "flex", alignItems: "center" }}>
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
            <input type="file" accept="image/*" onChange={handleImageChange} />
            <Card.Link
              className="link"
              style={{
                cursor: "pointer",
                marginRight: "10px",
                fontSize: "16px",
                marginTop: "10px",
              }}
              onClick={() => addFav()}
            >
              Add fav
            </Card.Link>
          </div>
        </Card.Body>
      </Card>
    </>
  );
}

export default Post;
