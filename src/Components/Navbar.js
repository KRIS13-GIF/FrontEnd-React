
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import React from "react";



function NavbarK(){

return(
    <Navbar bg="dark" data-bs-theme="dark">
    <Container>
        <Navbar.Brand href="#home">E-Commerce App</Navbar.Brand>
        <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/admin/8ecac890-69d7-4f7b-a739-3c64c58bafda">Admin</Nav.Link>
        </Nav>
    </Container>
</Navbar>
)

}

export default NavbarK;