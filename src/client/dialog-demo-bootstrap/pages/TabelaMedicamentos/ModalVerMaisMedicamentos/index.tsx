import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import { Form } from 'react-bootstrap';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

import React, { useState } from 'react';

import ExibirInputSimples from '../../../components/ExibirInputSimples';
import MedicamentoGeral from '../../../../../models/MedicamentoGeral'

// Mudar de ANY para Medicamento Geral
export default function MedModalVerMais({ remedio }: { remedio: MedicamentoGeral }) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // console.log("Dados1: " + remedio)

    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            Ver mais informações
        </Tooltip>
    );

    return (

        <>
            {console.log(remedio)}
            <OverlayTrigger
                placement="left"
                delay={{ show: 400, hide: 250 }}
                overlay={renderTooltip}
            >
                <Button variant="outline-secondary" onClick={handleShow}>
                    <img
                        alt=""
                        src="/img/icones/expand_content.svg"
                        width="25"
                        height="25"
                        className="d-inline-block align-top"
                    />{' '}
                </Button>
            </OverlayTrigger>

            <Modal
                dialogClassName='modal-dialog-scrollable'
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}

                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >

                <Modal.Header closeButton>
                    <Modal.Title>Informações do medicamento</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        <Form>
                            <Row>
                                <Col sm={6}>
                                    <ExibirInputSimples label={'Data do cadastro'} data={remedio.dataCadastroFormatada} controlId={"inputDataCadastro"} />
                                </Col>
                                <Col sm={6}>
                                    <ExibirInputSimples label={'Nome do medicamento'} data={remedio.nome} controlId={"inputNomeMed"} />
                                </Col>
                            </Row>

                            <Row>
                                <Col>
                                    <ExibirInputSimples label={'Princípio ativo'} data={remedio.principioAtivo} controlId={"inputPrincMed"} />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <ExibirInputSimples label={'Classe'} data={remedio.classe} controlId={"classe"} />
                                </Col>
                            </Row>

                            <Row>
                                <Col sm={6}>
                                    <ExibirInputSimples label={'Tarja'} data={remedio.tarja} controlId={"tarja"} />
                                </Col>

                                <Col sm={6}>
                                    <ExibirInputSimples label={'Apresentação'} data={remedio.apresentacao} controlId={"apresentacao"} />
                                </Col>
                            </Row>

                        </Form>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-secondary" onClick={handleClose}>
                        Fechar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}