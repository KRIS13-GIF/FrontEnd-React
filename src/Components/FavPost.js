import React from "react";
import Card from 'react-bootstrap/Card';

function FavPost({ fav }) {

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
  </Card.Body>
  </Card>
  </>
)
   
}

export default FavPost;