import Card from 'react-bootstrap/Card';
import React from "react";





function UserComponentAdmin({user}){


    return(

        <Card style={{ width: '18rem' }}>
          <Card.Body>
    
            <Card.Title>{user.username}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">{user.role}</Card.Subtitle>
            <Card.Text>
                {user.firstName}
            </Card.Text>
            <Card.Text>
                {user.lastName}
            </Card.Text>
            {user.deleted &&
            <Card.Text>
                <b>This is deleted</b>
            </Card.Text>
            }
            
           <Card.Link >Delete</Card.Link> 
            <Card.Link>Update</Card.Link>
          </Card.Body>
        </Card>
    

    )



}


export default UserComponentAdmin;