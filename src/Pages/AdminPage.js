import React, { useState, useEffect } from "react";
import NavbarK2 from "../Components/Navbar2";
import { useParams } from "react-router-dom";
import axios from "axios";
import Post2 from "../Components/Post2";
import { useNavigate } from "react-router-dom";

function AdminPage() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(3);

  const [searchData, setSearchData] = useState({
    title: "",
    description: "",
    status: null,
  });

  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:5002/api/program/user/${id}`)
      .then((response) => {
        console.log(response);

        if (!response.data) {
          navigate("/");
        }

        if (response.data && response.data.role === "USER") {
          navigate("/");
        }
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });

    getAllPosts();
  }, [id, navigate, currentPage]);

  const getAllPosts = () => {
    axios
      .get(`http://localhost:5002/api/program/showPosts`, {
        params: { page: currentPage, size: pageSize },
      })
      .then((response) => {
        console.log(response);
        setPosts(response.data);
        console.log("data: ", response.data);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
  };

  const handlePagination = (page) => {
    setCurrentPage(page);
  };

  const searchPosts = () => {
    axios
      .post("http://localhost:5002/api/program/find/post", searchData)
      .then((response) => {
        console.log(response);
        setPosts(response.data);
      })
      .catch((error) => {
        console.error("Error searching posts:", error);
      });
  };

  return (
    <>
      <div>
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
      </div>
      <br />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gridGap: "50px",
          marginBottom: "80px",
          marginLeft: "50px",
        }}
      >
        {posts.map((post) => (
          <Post2 style={{}} key={post.id} id={id} post={post} />
        ))}
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <button
          disabled={currentPage === 0}
          onClick={() => handlePagination(currentPage - 1)}
          style={{ marginRight: "10px" }}
        >
          Previous
        </button>
        <button
          onClick={() => handlePagination(currentPage + 1)}
          disabled={posts.length < pageSize}
          style={{ marginLeft: "10px" }}
        >
          Next
        </button>
      </div>
    </>
  );
}

export default AdminPage;
