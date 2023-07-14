
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import React from "react";
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';


function NavbarK2(){
    
    const params=useParams();
    console.log(params.id)
    return(

      

        <Navbar bg="dark" data-bs-theme="dark">
        <Container>
            <Navbar.Brand href="#home">E-Commerce App</Navbar.Brand>
            <Nav className="me-auto">
                <Nav.Link href="/">Home</Nav.Link>  
                <Nav.Link href='/users'>Users</Nav.Link>
            </Nav>
        </Container>
    </Navbar>
    )
    
    }


export default NavbarK2;