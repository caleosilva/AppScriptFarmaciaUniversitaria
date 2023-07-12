import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Alert from 'react-bootstrap/Alert';
import Accordion from 'react-bootstrap/Accordion';


import { serverFunctions } from '../../../../utils/serverFunctions';
import ExibirInputSimples from '../../../components/ExibirInputSimples';
import Paciente from '../../../../../models/Paciente';
import formatarDataParaVisualizacao from '../../../Functions/formatarDataParaVisualizacao';
import './estiloModalSaida.css';

import AccordionitemUnico from './AccordionItemUnico/AccordionItemUnico';

import React, { useState, useEffect } from 'react';


export default function ModalSaidaMedicamento({ paciente, data, setData, index }: { paciente: Paciente, data: Array<Paciente>, setData: Function, index: number }) {

    // CRIAR OS USESTATE
    const [mensagem, setMensagem] = useState(false);
    const [mensagemErroBack, setMensagemErroBack] = useState(false);
    const [show, setShow] = useState(false);

    const [valor, setValor] = useState(1);

    const handleClose = () => {
        setShow(false)
    };
    const handleShow = () => setShow(true);

    const handleClick = () => setLoading(true);
    const [isLoading, setLoading] = useState(false);

    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            Registrar saída
        </Tooltip>
    );

    function renderAlertaErro() {
        if (mensagem) {
            return (
                <Row>
                    <Col>
                        <Alert variant="danger" onClose={() => setMensagem(false)} dismissible>
                            <Alert.Heading>Erro!</Alert.Heading>
                            <hr />
                            <p>
                                Não foi possível excluir o paciente, tente novamente mais tarde.
                            </p>
                        </Alert>
                    </Col>
                </Row>
            )
        }
    }

    const handleSubtrair = () => {
        if (valor > 1) {
            setValor(valor - 1);
        }
    }

    const handleSomar = () => {
        if (valor < 9) {
            setValor(valor + 1);
        }
    }

    function renderAccordionItemUnico() {
        const accordions = [];
        for (let i = 1; i <= valor; i++) {
            accordions.push(<AccordionitemUnico eventKey={i.toString()}/>);
        }
        return accordions;
    }

    function renderInformacoesPaciente() {
        const dadosBrevesPaciente = `${paciente.nome}, ${formatarDataParaVisualizacao(paciente.dataNascimento)}`;

        return (
            <Row className='mb-4'>
                <Col sm={6}>
                    <ExibirInputSimples label={"Informações do paciente"} data={dadosBrevesPaciente} controlId={"exibirDados"} />
                </Col>


                <Col sm={6}>

                    <Row>
                        <h6 className='d-flex justify-content-center'>Quantidade a sair</h6>
                    </Row>

                    <Row className="mt-3">

                        <Col className='d-flex justify-content-center align-items-center'>
                            <Button variant="outline-dark" className='botaoRedondo' onClick={handleSomar}>
                                <i className="bi bi-plus"></i>
                            </Button>

                            <h6 className='ms-3 me-3 mt-2'>{valor}</h6>

                            <Button variant="outline-dark" className='botaoRedondo' onClick={handleSubtrair}>
                                <i className="bi bi-dash"></i>
                            </Button>
                        </Col>

                    </Row>

                </Col>


                {/* <Col sm={4} className='d-flex justify-content-center align-items-center'>
                    <Button variant="outline-dark">
                        <i className="bi bi-plus-circle-fill"></i>
                    </Button>
                    <p className='p-2'>1</p>
                    <Button variant="outline-secondary">
                    <i className="bi bi-dash-circle-fill"></i>
                    </Button>
                </Col> */}
            </Row>

        )
    }

    function renderQuanrtidadeSaida() {

        return (
            <Row>
                <Col sm>

                </Col>
            </Row>

        )
    }

    useEffect(() => {

        if (isLoading) {
            serverFunctions.removeRowPaciente(paciente).then((sucesso) => {
                if (sucesso) {
                    // Atualiza a tabela:
                    const novaLista = data.filter((item, posicao) => posicao !== index);
                    setData(novaLista);

                    setLoading(false);
                    setMensagem(false);
                    handleClose();
                } else {
                    setLoading(false);
                    setMensagem(true);
                }
            }).catch(
                (e) => {
                    console.log(e.stack);
                    setMensagemErroBack(true);
                    setLoading(false);
                });

        }
    }, [isLoading]);





    //             <Col SM={8}>
    //                 <InputSelectDoador required={true} label={"Selecione o doador"} name={"opcEntrada"} data={doador} setData={setDoador} lista={doadores} />
    //             </Col>

    return (

        <>
            <OverlayTrigger
                placement="left"
                delay={{ show: 400, hide: 250 }}
                overlay={renderTooltip}
            >
                <Button variant="outline-secondary" onClick={handleShow}>
                    <i className="bi bi-dash-circle"></i>
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

                        {renderInformacoesPaciente()}


                        <Accordion>
                            {renderAccordionItemUnico()}
                        </Accordion>

                        <Row className='mb-3 mt-3'>
                            {mensagemErroBack &&
                                <Col>
                                    <Alert variant="dark" onClose={() => setMensagemErroBack(false)} dismissible>
                                        <Alert.Heading>Erro!</Alert.Heading>
                                        <p>
                                            Não foi possível excluir o registro, tente novamente mais tarde!
                                        </p>
                                    </Alert>
                                </Col>
                            }
                        </Row>



                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <div className='mt-3 mb-3'>
                        <Button variant="outline-secondary" onClick={handleClose} className=''>
                            Concluir
                        </Button>

                        {/* <Button
                            type="submit"
                            variant="dark"
                            disabled={isLoading}
                            onClick={!isLoading ? handleClick : null}
                        >
                            {isLoading ? 'Excluindo...' : 'Excluir'}
                        </Button> */}


                    </div>
                </Modal.Footer>
            </Modal>
        </>
    );
}