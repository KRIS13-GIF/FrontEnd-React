import React, { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import NavbarK from "../Components/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function UpdatePost() {
  const params = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const [updateTitle, setUpdateTitle] = useState( '')
  const [updateDesc, setUpdateDesc] = useState( "")

  const formData = {

    title: updateTitle,
    description: updateDesc,

  };
  console.log("format", formData);
  console.log("data", data.title);

  useEffect(() => {
    getData();
  }, [])


  const getData = () => {
    axios.get(`http://localhost:5002/api/program/postId/${params.id}`)
      .then((response) => {
        console.log(response);
        setData(response.data);
        setUpdateTitle(response.data.title)
        setUpdateDesc(response.data.description)

      })
      .catch((error) => {
        console.error('Error fetching posts:', error);
      });
  };




  const update = () => {
    console.log(formData)
    axios.patch(`http://localhost:5002/api/program/update/post/${params?.id}`, formData)
      .then((response) => {
        console.log(response);
        console.log("data: ", response.data);
        navigate(-1);


      })
      .catch((error) => {
        console.error('Error updating post:', error);
      });
  };


  return (
    <>

      <div>
        <NavbarK />
      </div>
      <div style={{ marginLeft: "50px", marginRight: "50px", marginTop: "50px" }}>
        {data.status == 'PENDING' &&
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" name="title" onChange={(e) => { setUpdateTitle(e.target.value) }} value={updateTitle}></Form.Control>
              <Form.Text className="text-muted"></Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control type="text" name="description" onChange={(e) => { setUpdateDesc(e.target.value) }} value={updateDesc} />
            </Form.Group>
            <Button variant="primary" onClick={update}>
              Submit
            </Button>
          </Form>}
      </div>
    </>
  );
}

export default UpdatePost;
