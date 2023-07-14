import React from "react";
import NavbarK2 from "../Components/Navbar2";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import Post2 from "../Components/Post2";

function AdminPage() {
    const [posts, setPosts] = useState([]);
const {id} = useParams()
    useEffect(() => {
        getAllPosts();
    }, []);

    const getAllPosts = () => {
        axios.get(`http://localhost:5002/api/program/showPosts`)
            .then((response) => {
                console.log(response);
                setPosts(response.data);
                console.log("data: ", response.data);
            })
            .catch((error) => {
                console.error('Error fetching posts:', error);
            });
    };
console.log(posts,"posts")

    return (

        <>
            <div>

                <NavbarK2 />
                <h1>ADMIN</h1>
            </div>
            <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)", /* Creates 4 equal columns */
                gridGap: "10px"
            }}>
                {
                    posts.map((post, idx) => <Post2 key={post.id} id={id} post={post} />)

                }
            </div>

        </>

    )



}

export default AdminPage;