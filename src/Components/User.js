import Card from 'react-bootstrap/Card';
import React from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import './stylingCard.css';

function User({user}){
    const navigate = useNavigate();

    function softDelete() {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          axios.put(`http://localhost:5002/api/program/softDelete/${user.id}`)
            .then(response => {
              Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
              );
              console.log(response);
              window.location.reload();
            })
            .catch(error => {
              console.error('Error creating user:', error);
            });
        }
      });
    }
    

    return (
      <Card className="custom-card" style={{ width: '18rem' }}>
        <Card.Body>
          <div className="icon-container">
            <FontAwesomeIcon icon={faUser} size="3x" />
          </div>
          <Card.Title>{user.username}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{user.role}</Card.Subtitle>
          <Card.Text>{user.address}</Card.Text>
          <Card.Link style={{ cursor: 'pointer' }} onClick={() => navigate(`fav/${user.id}`)}>Favorites</Card.Link>
          <Card.Link style={{ cursor: 'pointer' }} onClick={() => navigate(`post/${user.id}`)}>Posts</Card.Link>
          <Card.Link style={{ cursor: 'pointer' }} onClick={() => softDelete()}>Delete</Card.Link>
        </Card.Body>
      </Card>
    );
    }



export default User;