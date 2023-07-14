import Card from 'react-bootstrap/Card';
import React from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";

function Post({post}){

  const navigate=useNavigate();
  const params = useParams();

   function deletePost(){
    axios.put(`http://localhost:5002/api/program/delete/post/${post.id}`)
    .then((res)=>{
      console.log("Deleted")
      window.location.reload();
    })
    .catch((error) => {
      console.error('Error fetching posts:', error);
  });
  }

  function addFav(){
    axios.post(`http://localhost:5002/api/program/addFav/${post.id}`)
    .then((res)=>{
      console.log("Added to favorite")
      alert("Post added to favorite !")
    })
    .catch((error) => {
      console.error('Error fetching posts:', error);
  });

  }

    return (
        <Card style={{ width: '18rem' }}>
          <Card.Body>
            <Card.Title>{post.title}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">{post.address}</Card.Subtitle>
            <Card.Subtitle className="mb-2 text-muted">{post.status}</Card.Subtitle>
            <Card.Subtitle className="mb-2 text-muted">{post.user.username}</Card.Subtitle>
            
            <Card.Text>
              {post.description}
            </Card.Text>
            <Card.Link onClick={()=>deletePost()}>Delete</Card.Link>
            <Card.Link onClick={()=>navigate(`/update/${post.id}`)}>Edit</Card.Link>
            <Card.Link onClick={()=>(addFav())}>Add fav</Card.Link>
            
          </Card.Body>
        </Card>
      );



}


export default Post;