import React, { useState, useEffect } from "react";
import NavbarK2 from "../Components/Navbar2";
import { useParams } from "react-router-dom";
import axios from "axios";
import Post2 from "../Components/Post2";
import { useNavigate } from "react-router-dom";

function  AdminPage() {
 const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [searchData, setSearchData] = useState({
    title: "",
    description: "",
    status: null
  });

  const { id } = useParams();
  
  useEffect(() => {
    
    axios.get(`http://localhost:5002/api/program/user/${id}`)
    .then((response) => {
        console.log(response);
    
       
        if(!response.data){
          navigate("/")
        }
   
        if(response.data&&response.data.role==="USER"){

          navigate("/")
        }
 
    })
    .catch((error) => {
        console.error('Error fetching posts:', error);
    });
    getAllPosts();
  }, []);

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
        setPosts([response.data]); // Assuming the response is a single post object, update the state accordingly
      })
      .catch((error) => {
        console.error("Error searching posts:", error);
      });
  };

  return (
    <>
      <div>
        <NavbarK2 />
        <h1>ADMIN</h1>
        <hr></hr>
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
      <br></br>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)", /* Creates 4 equal columns */
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
