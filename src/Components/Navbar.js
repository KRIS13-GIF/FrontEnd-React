
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
            <Nav.Link href="/admin/62c40260-6792-497f-af62-f6974220ee59">Admin</Nav.Link>
        </Nav>
    </Container>
</Navbar>
)

}

export default NavbarK;