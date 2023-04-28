import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import { Form } from 'react-bootstrap';

import BotaoDark from '../../../components/BotaoDark';
import BotaoSecondary from '../../../components/BotaoSecondary';
import ExibirInputSimples from '../../../components/ExibirInputSimples';

function MedModalVerMais({ props, remedio }) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    return (
        <>
            <Button variant="outline-secondary" onClick={handleShow}>
                Info
            </Button>

            <Modal
                dialogClassName='modal-dialog-scrollable'
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}

                {...props}
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
                                    <ExibirInputSimples label={'Data do cadastro'} data={remedio.dataCadastro} controlId={"inputDataCadastro"} />
                                </Col>
                                <Col sm={6}>
                                    <ExibirInputSimples label={'Lote'} data={remedio.lote} controlId={"inputLoteMed"} />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <ExibirInputSimples label={'Nome do medicamento'} data={remedio.nome} controlId={"inputNomeMed"} />
                                </Col>
                            </Row>

                            <Row>
                                <Col>
                                    <ExibirInputSimples label={'Princípio ativo e dosagem'} data={remedio.principioAtivo} controlId={"inputPrincMed"} />
                                </Col>
                            </Row>

                            <Row>
                                <Col>
                                    <ExibirInputSimples label={'Origem do medicamento'} data={remedio.origem} controlId={"inputOrigemMed"} />
                                </Col>
                            </Row>

                            <Row>
                                <Col>
                                    <ExibirInputSimples label={'Fabricante'} data={remedio.fabricante} controlId={"inputFabrivanteMed"} />
                                </Col>
                            </Row>

                            <Row>
                                <Col sm={6}>
                                    <ExibirInputSimples label={'Data de validade'} data={remedio.validade} controlId={"inputDataValidade"} />
                                </Col>
                                <Col sm={6}>
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

                            <Row>
                                <Col>
                                    <ExibirInputSimples label={'Motivo do descarte'} data={remedio.motivoDescarte} controlId={"motivoDescarte"} />
                                </Col>

                            </Row>

                            <Row>
                                <Col sm={6}>
                                    <ExibirInputSimples label={'Tipo de medicamento'} data={remedio.tipo} controlId={"tipoMed"} />
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

export default MedModalVerMais;
