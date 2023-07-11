import CardGroup from 'react-bootstrap/CardGroup';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import React from 'react';

import '../style.css'
import Cardes from './Cardes';


export default function Sobre() {

    const imgCaleo = 'https://drive.google.com/uc?export=view&id=168LHuHXIjsmfOcbMU2M8HokShk2MRbvF';
    const imgJoao = 'https://drive.google.com/uc?export=view&id=11zlrSANsOgJnKbMTfj_ok5gSHvNafg_7';
    const imgTinin = 'https://drive.google.com/uc?export=view&id=1Ff_429EOcDw1a9hzwtPWpMVz2qgrPWBw';

    return (
        <section className='margemNavBar ms-5 me-5'>

            <div>
                <h3 className='d-flex justify-content-center'>
                    Nosso objetivo
                </h3>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi vitae tortor dui. Nunc sed consequat ante, ac porttitor ipsum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Fusce lacinia dui non congue ultricies. Quisque dignissim fringilla lorem quis consequat. Pellentesque consequat erat a quam aliquam accumsan. Nullam imperdiet, nibh ac lacinia dignissim, ante erat tincidunt ipsum, quis euismod lectus diam eget elit. Sed eget felis enim. Morbi et felis tellus.
                </p>
            </div>

            <section className='margemTop'>
                <h5 className='d-flex justify-content-center'>
                    Equipe
                </h5>
                <CardGroup className='mt-5'>
                    <Container>
                        <Row className=''>
                            <Col md={4} className='d-flex justify-content-center mb-3'>
                                <Cardes titulo={"Caleo Silva"} descricao={"Desenvolvedor"} urlImg={imgCaleo} />
                            </Col>

                            <Col md={4} className='d-flex justify-content-center mb-3'>
                                <Cardes titulo={"Carlos Tinin"} descricao={"Desenvolvedor"} urlImg={imgTinin} />
                            </Col>

                            <Col md={4} className='d-flex justify-content-center mb-3'>
                                <Cardes titulo={"João Batista"} descricao={"Coordenador"} urlImg={imgJoao} />
                            </Col>
                        </Row>
                    </Container>
                </CardGroup>
            </section>




        </section>
    )
}