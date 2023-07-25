import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";

function Post2({ post, id }) {
  const [img, setImg] = useState(null);

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

  function changeStatus(idToSend) {
    axios
      .put(`http://localhost:5002/api/program/changeStatus/${id}/${idToSend}`)
      .then((res) => {
        console.log("Status Changed");
        Swal.fire("Status Updated!", "Now the post is Approved", post.username);
        window.location.reload();
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Status is already changed!",
        });
        console.error("Error fetching posts:", error);
      });
  }

  const handleDelete = () => {
    axios
      .delete(`http://localhost:5002/api/program/deleteHardPost/${post.id}`)
      .then((response) => {
        console.log("Post deleted successfully:", response);
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error deleting post:", error);
      });
  };

  return (
    <Card
      style={{
        width: "20rem",
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
    >
      {img ? (
        <img
          src={img}
          alt="Post Image"
          style={{ width: "100%", height: "150px", objectFit: "cover" }}
        />
      ) : (
        <FontAwesomeIcon icon={faImage} size="3x" />
      )}
      <Card.Body>
        <Card.Title>
          <b>Title:</b> {post.title}
        </Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          <b>Address:</b> {post.address}
        </Card.Subtitle>
        <Card.Subtitle className="mb-2 text-muted">
          <b>Status:</b> {post.status}
        </Card.Subtitle>
        <Card.Subtitle className="mb-2 text-muted">
          <b>Username:</b> {post.user.username}
        </Card.Subtitle>

        <Card.Text>
          <b>Description:</b> {post.description}
        </Card.Text>

        {post.deleted == 1 && (
          <h4>
            {""}
            Deleted{"  "}
            <FontAwesomeIcon icon={faTrashAlt} />
          </h4>
        )}

        {post.status != "APPROVED" && post.deleted == 0 && (
          <button
            style={{
              fontSize: "18px",
              padding: "10px 20px",
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
            onClick={() => changeStatus(post.id)}
          >
            Change status
          </button>
        )}

        <button
          onClick={handleDelete}
          style={{
            width: "70px",
            height: "60px",
            borderRadius: "50%",
            fontWeight: "bold",
            backgroundColor: "#fff",
            transition: "background-color 0.3s",
            cursor: "pointer",
            position: "relative",
            overflow: "hidden",
            borderWidth: "4px",
            borderColor: "red",
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = "red";
            e.target.style.color = "#fff";
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = "#fff";
            e.target.style.color = "#000";
          }}
        >
          Delete
        </button>
      </Card.Body>
    </Card>
  );
}

export default Post2;
