import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

import ExibirInputSimples from '../../../components/ExibirInputSimples';
import React, { useState, useEffect } from 'react';


export default function ModalExemplo({ remedio }: { remedio: any }) {

    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false)
    };
    const handleShow = () => setShow(true);


    const handleClick = () => setLoading(true);
    const [isLoading, setLoading] = useState(false);

    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            Ver mais informações
        </Tooltip>
    );

    const dataEntrada = new Date(remedio.dataEntrada);
    const dataEntradaFormatada = (dataEntrada.getUTCDate()) + "-" + (dataEntrada.getMonth() + 1) + "-" + dataEntrada.getFullYear();

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
                    <Modal.Title>informação do medicamento em estoque</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        <Row>
                            <Col sm={6}>
                                <ExibirInputSimples label={"Lote"} data={remedio.lote} controlId={"exibirLote"}/>
                            </Col>

                            <Col sm={6}>
                                <ExibirInputSimples label={"Dosagem"} data={remedio.dosagem} controlId={"exibirDosagem"}/>
                            </Col>
                        </Row>

                        <Row>
                            <Col sm={6}>
                                <ExibirInputSimples label={"Data de entrada"} data={dataEntradaFormatada} controlId={"exibirDataEntrada"}/>
                            </Col>

                            <Col sm={6}>
                                <ExibirInputSimples label={"Validade"} data={remedio.validadeFormatada} controlId={"exibirValidade"}/>
                            </Col>
                        </Row>

                        <Row>
                            <Col sm={6}>
                                <ExibirInputSimples label={"Quantidade disponível"} data={remedio.quantidade} controlId={"exibirQuantidade"}/>
                            </Col>

                            <Col sm={6}>
                                <ExibirInputSimples label={"Origem do medicamento"} data={remedio.origem} controlId={"exibirOrigem"}/>
                            </Col>
                        </Row>

                        <Row>
                            <Col sm={6}>
                                <ExibirInputSimples label={"Tipo"} data={remedio.tipo} controlId={"exibirTipo"}/>
                            </Col>

                            <Col sm={6}>
                                <ExibirInputSimples label={"Fabricante"} data={remedio.fabricante} controlId={"exibirFabricante"}/>
                            </Col>
                        </Row>

                        <Row>
                            <Col sm={6}>
                                <ExibirInputSimples label={"Motivo da doação"} data={remedio.motivoDoacao} controlId={"exibirMotivo"}/>
                            </Col>
                        </Row>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <div className='mt-3 mb-3 d-flex justify-content-around'>
                        <Button variant="outline-secondary" onClick={handleClose}>
                            Fechar
                        </Button>
                    </div>
                </Modal.Footer>
            </Modal>
        </>
    );
}