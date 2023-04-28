import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import React from 'react';
import { Link } from 'react-router-dom';

const NavBarFU = () => {
  const rotas = [{
    label: 'Home',
    to: '/home'
  }, {
    label: 'Medicamentos',
    to: '/medicamentos'
  }, {
    label: 'Doadores',
    to: '/doadores'
  }, {
    label: 'Pacientes',
    to: '/pacientes'
  }];

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand>
          <Link to={'/home'} style={{ textDecoration: 'none', color: 'white' }}>
            {"Farmácia Universitária"}
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto" />
          <Nav>
            {rotas.map((rota, index) => (
              <Nav.Item key={index}>
                <Nav.Link>
                  <Link to={rota.to} style={{ textDecoration: 'none', color: 'white' }}>
                    {rota.label}
                  </Link>
                </Nav.Link>
              </Nav.Item>
            ))}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBarFU;