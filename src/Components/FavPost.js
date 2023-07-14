import axios from "axios";
import React from "react";
import Card from 'react-bootstrap/Card';


function FavPost({fav}){

  

  function removeFromFav(){

    axios.delete(`http://localhost:5002/api/program/deleteFav/${fav.id}`)
    .then((response) => {
      console.log(response);
      window.location.reload();
    })
  .catch((error) => {
      console.error('Error fetching posts:', error);
  });
  }


  return(
    <>
  
  <Card style={{ width: '18rem' }}>
  <Card.Body>
      <Card.Title>{fav.post.title}</Card.Title>
      <Card.Subtitle className="mb-2 text-muted">{fav.post.address}</Card.Subtitle>
      <Card.Subtitle className="mb-2 text-muted">{fav.post.status}</Card.Subtitle>
      <Card.Text>
          {fav.post.description}
      </Card.Text>
     <button onClick={()=>removeFromFav()}>Delete from favorites</button> 
  </Card.Body>
  </Card>
  </>
)
   
  }

export default FavPost;