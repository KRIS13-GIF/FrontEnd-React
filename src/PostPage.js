import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Post from "./Components/Post";
import Swal from "sweetalert2";

const PostPage = () => {
  const [posts, setPosts] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const [searchData, setSearchData] = useState({
    title: "",
    description: "",
    status: null,
  });

  const params = useParams();

  useEffect(() => {
    getPosts();
  }, []);

  const searchPosts = () => {
    axios
      .post(
        `http://localhost:5002/api/program/find/postUser/${params?.id}`,
        searchData
      )
      .then((response) => {
        console.log(response);
        setPosts(response.data);
      })
      .catch((error) => {
        console.error("Error searching posts:", error);
      });
  };

  const getPosts = () => {
    axios
      .get(`http://localhost:5002/api/program/post/${params?.id}`)
      .then((response) => {
        console.log(response);
        setPosts(response.data);
        console.log("data: ", response.data);
        console.log("Hello world");
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        `http://localhost:5002/api/program/create/post/${params?.id}`,
        formData
      );

      setFormData({ title: "", description: "" });
      getPosts();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
      console.error(error);
    }
  };

  return (
    <>
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
        POSTS
      </h1>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "20px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          <input
            type="text"
            placeholder="Title"
            value={searchData.title}
            onChange={(e) =>
              setSearchData({ ...searchData, title: e.target.value })
            }
            style={{ fontSize: "16px", padding: "8px", margin: "8px" }}
          />
          <input
            type="text"
            placeholder="Description"
            value={searchData.description}
            onChange={(e) =>
              setSearchData({ ...searchData, description: e.target.value })
            }
            style={{ fontSize: "16px", padding: "8px", margin: "8px" }}
          />
          <div
            style={{
              marginLeft: "8px",
              marginRight: "8px",
              marginBottom: "8px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <select
              value={searchData.status || ""}
              onChange={(e) =>
                setSearchData({
                  ...searchData,
                  status: e.target.value === "" ? null : e.target.value,
                })
              }
              style={{ fontSize: "16px", padding: "8px" }}
            >
              <option value="">Select Status</option>
              <option value="PENDING">PENDING</option>
              <option value="APPROVED">APPROVED</option>
            </select>
          </div>
          <button
            onClick={searchPosts}
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
          >
            Search
          </button>
        </div>
      </div>
      <div
        style={{ display: "flex", justifyContent: "start", padding: "10px" }}
      >
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
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)" /* Creates 4 equal columns */,
          gridGap: "20px" /* Increase the gap between posts */,
          marginTop: "20px",
          marginLeft: "20px",
        }}
      >
        {posts
          .filter((post) => post.deleted === false)
          .map((post, idx) => (
            <Post key={idx} post={post} />
          ))}
      </div>
    </>
  );
};

export default PostPage;
