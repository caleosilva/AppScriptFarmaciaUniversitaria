import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';

import InputText from '../../../components/InputText';

import React from 'react';

export default function FormCadastro(){
    return (
        <Container>
            <Row>
                <Col sm={6}>
                    <p>Lote</p>
                </Col>
                <Col sm={6}>
                    <p>Dosagem</p>
                </Col>
            </Row>

            <Row>
                <Col sm={6}>
                    <p>Validade</p>
                </Col>
                <Col sm={6}>
                    <p>Quantidade</p>
                </Col>
            </Row>

            <Row>
                <Col sm={6}>
                    <p>Origem</p>
                </Col>
                <Col sm={6}>
                    <p>Tipo</p>
                </Col>
            </Row>

            <Row>
                <Col sm={6}>
                    <p>Fabricante</p>
                </Col>
                <Col sm={6}>
                    <p>Motivo Do descarte</p>
                </Col>
            </Row>

            <Row>
                <Col sm={6}>
                    <p>Confirmar</p>
                </Col>
                <Col sm={6}>
                    <p>Cancelar</p>
                </Col>
            </Row>
        </Container>
    )

}