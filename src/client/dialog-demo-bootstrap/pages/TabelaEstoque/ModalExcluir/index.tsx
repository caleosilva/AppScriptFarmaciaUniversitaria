import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { Form } from 'react-bootstrap';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Alert from 'react-bootstrap/Alert';

import { serverFunctions } from '../../../../utils/serverFunctions';
import ExibirInputSimples from '../../../components/ExibirInputSimples';


import React, { useState, useEffect } from 'react';

export default function ModalExcluir({ remedio }: { remedio: any }) {

    // CRIAR OS USESTATE
    const [mensagem, setMensagem] = useState(false);
    const [show, setShow] = useState(false);

    const handleClose = () => {
        // SETAR COMO '' OS USESTATE
        setShow(false)
    };
    const handleShow = () => setShow(true);


    const handleClick = () => setLoading(true);
    const [isLoading, setLoading] = useState(false);

    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            Escluir registro
        </Tooltip>
    );

    const [isFormValid, setIsFormValid] = useState(false);
    useEffect(() => {
        if (true) {
            setIsFormValid(true);
        } else {
            setIsFormValid(false);
        }
    }, []);

    useEffect(() => {
        // Cria o objeto o

        if (isLoading) {

            // chama a função do server

        }
    }, [isLoading]);


    function renderAlerta() {
        if (parseInt(remedio.quantidade) > 0) {
            return (
                <Row>
                    <Col>
                        <Alert variant="warning">
                            <Alert.Heading>Atenção!</Alert.Heading>
                            <p>
                                O medicamento escolhido ainda possui estoque. 
                            </p>
                        </Alert>
                    </Col>
                </Row>
            )
        }
    }

    return (

        <>
            <OverlayTrigger
                placement="left"
                delay={{ show: 400, hide: 250 }}
                overlay={renderTooltip}
            >
                <Button variant="outline-secondary" onClick={handleShow}>
                    <i className="bi bi-trash-fill"></i>
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
                    <Modal.Title>Exclusão de registro</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        <Row className='mb-4'>
                            <h6>
                                Revisar informações
                            </h6>
                        </Row>
                        <Row>
                            <Col sm={4}>
                                <ExibirInputSimples label={"Lote"} data={remedio.lote} controlId={"exibirLote"} />
                            </Col>

                            <Col sm={4}>
                                <ExibirInputSimples label={"Dosagem"} data={remedio.dosagem} controlId={"exibirDosagem"} />
                            </Col>

                            <Col sm={4}>
                                <ExibirInputSimples label={"Quantidade disponível"} data={remedio.quantidade} controlId={"exibirQuantidade"} />
                            </Col>
                        </Row>

                        {renderAlerta()}
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <div className='mt-3 mb-3d-flex justify-content-around'>
                        <Button
                            className='me-5'
                            type="submit"
                            variant="outline-secondary"
                            disabled={isLoading || !isFormValid}
                            onClick={!isLoading ? handleClick : null}
                        >
                            {isLoading ? 'Excluindo...' : 'Excluir'}
                        </Button>

                        <Button variant="dark" onClick={handleClose}>
                            Cancelar
                        </Button>
                    </div>
                </Modal.Footer>
            </Modal>
        </>
    );
}