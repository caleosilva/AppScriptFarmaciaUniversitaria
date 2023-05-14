// import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';


import React, { useEffect } from 'react';
import { useState } from 'react';

import InputSelect from '../../../components/InputSelect';
import InputText from '../../../components/InputText';

function ModalEntradaEstoque({ props, data, setData }) {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const opcaoEntrada = ['Doação', 'Ajuste de estoque']

    const [opSelect, setOpSelect] = useState('');
    const [opLote, setOpLote] = useState('');
    const [opDosagem, setOpDosagem] = useState('');
    const [opValidade, setOpValidade] = useState('');
    const [quantidade, setQuantidade] = useState('');



    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            Entrada no estoque
        </Tooltip>
    )

    const acao = (event) => {
        event.preventDefault();
    }

    return (
        <>
            <OverlayTrigger
                placement="left"
                delay={{ show: 400, hide: 250 }}
                overlay={renderTooltip}
            >
                <Button variant="outline-secondary" onClick={handleShow}>
                    <img
                        alt=""
                        src="/img/icones/add.svg"
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

                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        Registrar entrada
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        <Row>
                            <Col sm={6}>
                                <InputSelect label={"Opção de entrada"} name={"opcEntrada"} data={opSelect} setData={setOpSelect} lista={opcaoEntrada} />
                                <p>{opSelect}</p>
                            </Col>

                            <Col sm={6}>
                                <InputText label={"Doador"} placeholder={""} controlId={"inputDoador"} name={"doador"} data={quantidade} setData={setQuantidade} />
                            </Col>
                        </Row>

                        <hr />

                        <Row>
                            <Col sm={3}>
                                <InputSelect label={"Lote"} name={"lote"} data={opSelect} setData={setOpSelect} lista={opcaoEntrada} />
                            </Col>

                            <Col sm={3}>
                                <InputSelect label={"Dosagem"} name={"dosagem"} data={opSelect} setData={setOpSelect} lista={opcaoEntrada} />
                            </Col>

                            <Col sm={3}>
                                <InputSelect label={"Validade"} name={"Validade"} data={opSelect} setData={setOpSelect} lista={opcaoEntrada} />
                            </Col>

                            <Col sm={3}>
                                <InputText label={"Quantidade"} placeholder={""} controlId={"inputQuantidade"} name={"quantidade"} data={quantidade} setData={setQuantidade} />
                            </Col>
                        </Row>

                        <Row>
                            <Col sm={6}>
                                <Button variant="outline-secondary">+ Outro medicamento</Button>{' '}
                            </Col>
                        </Row>


                        <Row className='mt-5'>

                            <Col sm={6} className='d-flex justify-content-end'>
                                <Button variant="outline-secondary">Cancelar</Button>{' '}
                            </Col>

                            <Col sm={6}>
                                <Button variant="dark">Confirmar</Button>
                            </Col>
                        </Row>


                    </Container>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default ModalEntradaEstoque;
