import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Post from "./Components/Post";

const PostPage = () => {
    const [posts, setPosts] = useState([]);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
    });

    const params = useParams();

    useEffect(() => {
        getPosts();
    }, []);

     const getPosts = () => {
        axios
            .get(`http://localhost:5002/api/program/post/${params?.id}`)
            .then((response) => {
                console.log(response);
                setPosts(response.data);
                console.log("data: ", response.data);
            })
            .catch((error) => {
                console.error('Error fetching posts:', error);
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
            console.error(error);
        }
    };

    return (
        <>

            <div style={{display:"flex", justifyContent:"end", padding:"20px" }}>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="title">Title:</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="description">Description:</label>
                        <input
                            type="text"
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <button type="submit">Add post</button>
                </form>
            </div>

            <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)", /* Creates 4 equal columns */
                gridGap: "10px"
            }}>
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