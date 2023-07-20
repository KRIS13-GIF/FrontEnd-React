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
            }}>POSTS</h1>

            <div style={{ display: "flex", justifyContent: "start", padding: "10px" }}>
                <form onSubmit={handleSubmit}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <div style={{ marginBottom: '10px' }}>
                            <label htmlFor="title" style={{ fontWeight: 'bold', marginRight: '10px' }}>
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
                                    padding: '8px',
                                    border: '1px solid #ccc',
                                    borderRadius: '4px',
                                    minWidth: '200px',
                                }}
                            />
                        </div>

                        <div style={{ marginBottom: '10px' }}>
                            <label htmlFor="description" style={{ fontWeight: 'bold', marginRight: '10px' }}>
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
                                    padding: '8px',
                                    border: '1px solid #ccc',
                                    borderRadius: '4px',
                                    minWidth: '200px',
                                }}
                            />
                        </div>

                        <button
                            type="submit"
                            style={{
                                padding: '10px',
                                backgroundColor: '#4caf50',
                                color: '#fff',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer',
                            }}
                        >
                            Add post
                        </button>
                    </div>
                </form>
            </div>

            <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)", /* Creates 4 equal columns */
                gridGap: "10px",
                marginTop: "20px",
                marginLeft: "20px"
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