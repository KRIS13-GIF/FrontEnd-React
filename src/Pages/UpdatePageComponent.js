import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import NavbarK from "../Components/Navbar";
import { useParams } from "react-router-dom";
import axios from "axios";

function UpdatePost() {
  const params = useParams();


  const [formData, setFormData] = useState({
    title:"",
    description:"",
   
  });

  const update = () => {
    console.log(formData)
    axios.patch(`http://localhost:5002/api/program/update/post/${params?.id}`, formData)
      .then((response) => {
        console.log(response);
        console.log("data: ", response.data);
        alert("Post updated! ")
      })
      .catch((error) => {
        console.error('Error updating post:', error);
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    
 
  };

  return (
    <>
      <div>
        <NavbarK />
      </div>
      <div style={{ marginLeft: "50px", marginRight: "50px", marginTop: "50px" }}>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Title</Form.Label>
            <Form.Control type="text" name="title" onChange={handleInputChange} />
            <Form.Text className="text-muted"></Form.Text>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control type="text" name="description" onChange={handleInputChange} />
          </Form.Group>
          <Button variant="primary" onClick={update}>
            Submit
          </Button>
        </Form>
      </div>
    </>
  );
}

export default UpdatePost;
