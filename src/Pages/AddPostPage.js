import React from "react";
import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function AddPostPage() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });
  const params = useParams();

  const navigate = useNavigate();

  const createPost = async () => {
    try {
      // Assuming formData is defined somewhere in your component
      await axios.post(
        `http://localhost:5002/api/program/create/post/${params?.id}`,
        formData
      );

      setFormData({ title: "", description: "" });
      navigate(-1);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
      console.error(error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div style={{ marginBottom: "10px" }}>
          <label
            htmlFor="title"
            style={{
              fontWeight: "bold",
              marginRight: "10px",
              color: "white",
            }}
          >
            Title:
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
            style={{
              padding: "8px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              minWidth: "200px",
            }}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label
            htmlFor="description"
            style={{
              fontWeight: "bold",
              marginRight: "10px",
              color: "white",
            }}
          >
            Description:
          </label>
          <input
            type="text"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
            style={{
              padding: "8px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              minWidth: "200px",
            }}
          />
        </div>

        <button
          type="submit"
          style={{
            padding: "10px",
            backgroundColor: "#4caf50",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Add post
        </button>
      </div>
    </form>
  );
}

export default AddPostPage;
