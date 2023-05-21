import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Alert from 'react-bootstrap/Alert';

import React, { useState, useEffect } from 'react';
import InputPositiveNumber from '../../../components/InputPositiveNumber';
import { serverFunctions } from '../../../../utils/serverFunctions';


export default function ModalSaidaEstoque({ remedio }: { remedio: any }) {

    const [quantidade, setQuantidade] = useState('');

    const [mensagem, setMensagem] = useState(false);

    const [show, setShow] = useState(false);

    const handleClose = () => {
        setQuantidade('');
        setShow(false);
    };
    const handleShow = () => setShow(true);


    const handleClick = () => setLoading(true);
    const [isLoading, setLoading] = useState(false);

    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            Registrar saída
        </Tooltip>
    );

    const [isFormValid, setIsFormValid] = useState(false);
    useEffect(() => {
        if (quantidade != '') {
            setIsFormValid(true);
        } else {
            setIsFormValid(false);
        }
    }, [quantidade]);

    useEffect(() => {
        // Cria o objeto o

        if (isLoading) {

            serverFunctions.atualizarQuantidadeEstoque(remedio, quantidade, false).then((sucesso) => {
                console.log("Sucesso add: " + sucesso)

                if (sucesso) {
                    // Atualiza a tabela:
                    // setData([...data, medicamentoEspecifico]);

                    setLoading(false);
                    setMensagem(false);
                    handleClose();
                } else {
                    setLoading(false);
                    setMensagem(true);
                    console.log("Não foi possível adicionar")
                }
            }).catch((e) => console.log(e.stack));

        }
    }, [isLoading]);




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
                        src="/img/icones/remove.svg"
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
                    <Modal.Title>Saída de estoque</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        <Row>
                            <Col>
                                <Row>
                                    <p>Quantidade atual no estoque</p>
                                </Row>
                                <Row>
                                    <p > <strong>{remedio.quantidade}</strong></p>
                                </Row>
                            </Col>

                            <Col>
                                <InputPositiveNumber required={true} label={"Quantidade"} placeholder={""} controlId={"inputQuantidade"} name={"quantidade"} data={quantidade} setData={setQuantidade} max={remedio.quantidade} />
                            </Col>
                        </Row>

                        <Row className='mb-3 mt-2'>
                            {mensagem &&
                                <Col>
                                    <Alert variant="danger" onClose={() => setMensagem(false)} dismissible>
                                        <Alert.Heading>Não foi possível retirar</Alert.Heading>
                                        <p>
                                            Tente novamente mais tarde.
                                        </p>
                                    </Alert>
                                </Col>
                            }
                        </Row>

                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <div className=''>
                        <Button variant="outline-secondary" onClick={handleClose} className='me-5'>
                            Cancelar
                        </Button>

                        <Button
                            type="submit"
                            variant="dark"
                            disabled={isLoading || !isFormValid}
                            onClick={!isLoading ? handleClick : null}
                        >
                            {isLoading ? 'Confirmando...' : 'Confirmar'}
                        </Button>
                    </div>
                </Modal.Footer>
            </Modal>
        </>
    );
}