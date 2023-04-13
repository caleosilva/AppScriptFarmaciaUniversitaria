import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';

import InputText from '../InputText';
import InputDate from '../InputDate';
import InputSelect from '../InputSelect';

import { Form } from 'react-bootstrap';

function MedModalAtualizar({props, remedio}) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button variant="outline-secondary" onClick={handleShow}>
                Atualizar
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
                    <Modal.Title>Atualizar dados de um medicamento</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        <Form>
                            <Row>
                                <Col sm={6}>
                                    {/* remedio.dataCadastro */}
                                    <InputDate label={"Data do cadastro"} controlId={"inputDataCadastro"} value={remedio.dataCadastroPura.substr(0, 10)}/>
                                </Col>
                                <Col sm={6}>
                                    <InputText label={"Lote"} controlId={"inputLoteMed"} value={remedio.lote}/>
                                </Col>
                            </Row>

                            <Row>
                                <Col>
                                    <InputText label={"Nome do medicamento"} controlId={"inputNomeMed"} value={remedio.nome}/>
                                </Col>
                            </Row>

                            <Row>
                                <Col>
                                    <InputText label={"Princípio ativo e dosagem"} controlId={"inputPrincMed"} value={remedio.principioAtivo}/>
                                </Col>
                            </Row>

                            <Row>
                                <Col>
                                    <InputText label={"Origem do medicamento"} controlId={"inputOrigemMed"} value={remedio.origem}/>
                                </Col>
                            </Row>

                            <Row>
                                <Col>
                                    <InputText label={"Fabricante"} controlId={"inputFabrivanteMed"} value={remedio.fabricante}/>
                                </Col>
                            </Row>

                            <Row>
                                <Col sm={6}>
                                    <InputDate label={"Data de validade"} controlId={"inputDataValidade"} value={remedio.validadePura.substr(0, 10)}/>
                                </Col>
                                <Col sm={6}>
                                    <InputSelect label={"Classe"} opcao={"Genérico"}/>
                                </Col>


                            </Row>

                            <Row>
                                <Col sm={6}>
                                    <InputSelect label={"Tarja"} opcao={"Sem tarja"}/>
                                </Col>

                                <Col sm={6}>
                                    <InputSelect label={"Apresentação"} opcao={"Líquido"}/>
                                </Col>
                            </Row>

                            <Row>
                                <Col sm={6}>
                                    <InputSelect label={"Tipo de medicamento"} opcao={"Aquele tipo lá"}/>
                                </Col>
                                <Col sm={6}>
                                    <InputSelect label={"Motivo do descarte"} opcao={"Doação"}/>
                                </Col>
                            </Row>
                        </Form>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-secondary" onClick={handleClose}>
                        Cancelar
                    </Button>
                    <Button variant="dark">Salvar</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default MedModalAtualizar;
