import React, { useState, useEffect } from "react";
import NavbarK2 from "../Components/Navbar2";
import { useParams } from "react-router-dom";
import axios from "axios";
import Post2 from "../Components/Post2";
import { useNavigate } from "react-router-dom";

function AdminPage() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [searchData, setSearchData] = useState({
    title: "",
    description: "",
    status: null
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
  }, [id, navigate]);

  const getAllPosts = () => {
    axios
      .get("http://localhost:5002/api/program/showPosts")
      .then((response) => {
        console.log(response);
        setPosts(response.data);
        console.log("data: ", response.data);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
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
        <h1 style={{

          textAlign: 'center',
          background: 'linear-gradient(to right, #ff4b1f, #1fddff)',
          padding: '10px',
          fontFamily: 'Arial, sans-serif',
          fontSize: '48px',
          fontWeight: 'bold',
          textTransform: 'uppercase',
          color: '#ffffff',
          letterSpacing: '4px',
          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.4)',
        }}>ADMIN</h1>
        <input
          type="text"
          placeholder="Title"
          value={searchData.title}
          onChange={(e) =>
            setSearchData({ ...searchData, title: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Description"
          value={searchData.description}
          onChange={(e) =>
            setSearchData({ ...searchData, description: e.target.value })
          }
        />
        <select
          value={searchData.status || ""}
          onChange={(e) =>
            setSearchData({
              ...searchData,
              status: e.target.value === "" ? null : e.target.value
            })
          }
        >
          <option value="">Select Status</option>
          <option value="PENDING">PENDING</option>
          <option value="APPROVED">APPROVED</option>
        </select>
        <button onClick={searchPosts}>Search</button>
      </div>
      <br />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gridGap: "10px"
        }}
      >
        {posts.map((post) => (
          <Post2 key={post.id} id={id} post={post} />
        ))}
      </div>
    </>
  );
}

export default AdminPage;
