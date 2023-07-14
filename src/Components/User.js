import Card from 'react-bootstrap/Card';
import React from "react";
import { useNavigate } from 'react-router-dom';


function User({user}){
    const navigate = useNavigate();
    return (
        
        <Card style={{ width: '18rem' }}>
          <Card.Body>
    
            <Card.Title>{user.username}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">{user.role}</Card.Subtitle>
            <Card.Text>
                {user.address}
            </Card.Text>
           <Card.Link onClick={()=>navigate(`fav/${user.id}`)}>Favorites</Card.Link> 
            <Card.Link onClick={() => navigate(`post/${user.id}`)}>Posts</Card.Link>
          </Card.Body>
        </Card>
    
      );
    }



export default User;