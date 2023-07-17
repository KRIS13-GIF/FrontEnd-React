import Card from 'react-bootstrap/Card';
import React from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


function User({user}){
    const navigate = useNavigate();


    function softDelete(){

      axios.put(`http://localhost:5002/api/program/softDelete/${user.id}`)
      .then(response => {
        console.log(response);
        alert('Soft delete done !')
        window.location.reload();
      })
      .catch(error => {
        console.error('Error creating user:', error);
      });
    }

    return (
        
        <Card style={{ width: '18rem' }}>
          <Card.Body>
    
            <Card.Title>{user.username}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">{user.role}</Card.Subtitle>
            <Card.Text>
                {user.address}
            </Card.Text>
           <Card.Link style={{cursor:'pointer'}} onClick={()=>navigate(`fav/${user.id}`)}>Favorites</Card.Link> 
            <Card.Link style={{cursor:'pointer'}} onClick={() => navigate(`post/${user.id}`)}>Posts</Card.Link>
            <Card.Link style={{cursor:'pointer'}} onClick={()=>softDelete()}>Delete</Card.Link>
            
          </Card.Body>
        </Card>
    
      );
    }



export default User;