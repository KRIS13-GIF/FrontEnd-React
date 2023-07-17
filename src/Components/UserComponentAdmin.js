import Card from 'react-bootstrap/Card';
import React from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';


function UserComponentAdmin({user}){
    const navigate=useNavigate();

    function deleteUser(){
        axios.delete(`http://localhost:5002/api/program/delete/user/${user?.id}`)
        .then((response) => {
            console.log("data: ", response.data);
            console.log("deleted")
            window.location.reload();
        })
        .catch((error) => {
            console.error('Error fetching posts:', error);
        });
    };


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
            
           <Card.Link style={{ cursor: "pointer"}} onClick={()=>deleteUser()}>Delete</Card.Link> 
            <Card.Link style={{ cursor: "pointer"}} onClick={()=>navigate(`updateUsers/${user.id}`)}>Update</Card.Link>
          </Card.Body>
        </Card>
    

    )



}


export default UserComponentAdmin;