import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import NavbarK from "../Components/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

function UpdatePost() {
  const params = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const [updateTitle, setUpdateTitle] = useState("");
  const [updateDesc, setUpdateDesc] = useState("");
  const [updateAddress, setAddress] = useState("");

  const formData = {
    title: updateTitle,
    description: updateDesc,
    address: updateAddress,
  };
  console.log("format", formData);
  console.log("data", data.title);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios
      .get(`http://localhost:5002/api/program/postId/${params.id}`)
      .then((response) => {
        console.log(response);
        setData(response.data);
        setUpdateTitle(response.data.title);
        setUpdateDesc(response.data.description);
        setAddress(response.data.address);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
  };

  const update = () => {
    console.log(formData);
    axios
      .patch(
        `http://localhost:5002/api/program/update/post/${params?.id}`,
        formData
      )
      .then((response) => {
        console.log(response);
        console.log("data: ", response.data);
        navigate(-1);
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Fill the fields on the form!",
        });
        console.error("Error updating post:", error);
      });
  };

  return (
    <>
      <div>
        <NavbarK />
      </div>
      <div
        style={{ marginLeft: "50px", marginRight: "50px", marginTop: "50px" }}
      >
        {data.status == "PENDING" && (
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Title</Form.Label>
              <Form.Control
                style={{ width: "800px", height: "50px" }}
                type="text"
                name="title"
                placeholder="Title"
                onChange={(e) => {
                  setUpdateTitle(e.target.value);
                }}
                value={updateTitle}
              ></Form.Control>
              <Form.Text className="text-muted"></Form.Text>
            </Form.Group>

            <div class="product-description-form">
              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  style={{ width: "800px", height: "150px" }}
                  name="description"
                  placeholder="Description"
                  onChange={(e) => {
                    setUpdateDesc(e.target.value);
                  }}
                  value={updateDesc}
                />
              </Form.Group>
            </div>

            <div class="product-description-form">
              <Form.Group className="mb-3">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  style={{ width: "800px", height: "50px" }}
                  name="address"
                  placeholder="Address"
                  onChange={(e) => {
                    setAddress(e.target.value);
                  }}
                  value={updateAddress}
                />
              </Form.Group>
            </div>
            <Button variant="primary" onClick={update}>
              Submit
            </Button>
          </Form>
        )}
      </div>
    </>
  );
}

export default UpdatePost;
