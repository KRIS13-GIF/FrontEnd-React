import axios from "axios";
import React from "react";
import Card from 'react-bootstrap/Card';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
  
  <Card style={{
            width: '18rem',
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
            transition: 'box-shadow 0.3s ease',
            borderRadius: '8px',
            cursor: 'pointer',
            
          }}>
  <Card.Body>
  <FontAwesomeIcon
        icon={faStar}
        style={{
          position: 'absolute',
          top: '10%',
          right: '20px',
          transform: 'translateY(-50%)',
          fontSize: '30px',
          color: 'black',
         
      
        }}
      />
      <Card.Title>{fav.post.title}</Card.Title>
      <Card.Subtitle className="mb-2 text-muted">{fav.post.address}</Card.Subtitle>
      <Card.Subtitle className="mb-2 text-muted">{fav.post.status}</Card.Subtitle>
      <Card.Text>
          {fav.post.description}
      </Card.Text>
     <button style={{
                fontSize: '18px',
                padding: '10px 20px',
                margin: '8px',
                border: '2px solid #000',
                borderRadius: '4px',
                fontWeight: 'bold',
                backgroundColor: '#fff',
                transition: 'all 0.3s',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#000';
                e.target.style.color = '#fff';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = '#fff';
                e.target.style.color = '#000';
              }}
                onClick={()=>removeFromFav()}>Delete from Favorites</button> 
          
  </Card.Body>
  </Card>
  </>
)
   
  }

export default FavPost;