import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import React from 'react';

const NavBarFU = () => {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#home">Farmácia Universitária</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />

        <Navbar.Collapse id="responsive-navbar-nav">

          <Nav className="me-auto"/>

          <Nav>
            <Nav.Item>
              <Nav.Link href="">Estoque</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="">Doadores</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="">Pacientes</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="">Medicamentos</Nav.Link>
            </Nav.Item>
          </Nav>

        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBarFU;