import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import React from 'react';
import { Link } from 'react-router-dom';

const NavBarFU = () => {
  const rotas = [{
    label: 'Home',
    to: '/'
  }, {
    label: 'Medicamentos',
    to: '/medicamentos'
  }, {
    label: 'Doadores',
    to: '/doadores'
  }, {
    label: 'Pacientes',
    to: '/pacientes'
  }, {
    label: 'Sobre',
    to: '/sobre'
  }];

  const imgUrl = 'https://drive.google.com/uc?export=view&id=16w37OmWjBmHXN8aWdYud1wQYAJt__jnP';
  
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" fixed='top'>
      <Container fluid>
        <Navbar.Brand>
          <Link to={'/'} style={{ textDecoration: 'none', color: 'white' }}>
            <img
              src={imgUrl}
              width="30"
              height="30"
              className="d-inline-block align-top me-2"
              alt="React Bootstrap logo"
            />
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