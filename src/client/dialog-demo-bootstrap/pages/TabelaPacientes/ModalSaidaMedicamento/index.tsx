import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Alert from 'react-bootstrap/Alert';
import Accordion from 'react-bootstrap/Accordion';

import ExibirInputSimples from '../../../components/ExibirInputSimples';
import Paciente from '../../../../../models/Paciente';
import formatarDataParaVisualizacao from '../../../Functions/formatarDataParaVisualizacao';
import './estiloModalSaida.css';
import AccordionitemUnico from './AccordionItemUnico/AccordionItemUnico';
import { serverFunctions } from '../../../../utils/serverFunctions';


import React, { useState, useEffect } from 'react';


export default function ModalSaidaMedicamento({ paciente, data, setData, index }: { paciente: Paciente, data: Array<Paciente>, setData: Function, index: number }) {

    const [dataMedicamentoGeral, setDataMedicamentoGeral] = useState(null);

    // CRIAR OS USESTATE
    const [mensagem, setMensagem] = useState(false);
    const [mensagemErroBack, setMensagemErroBack] = useState(false);
    const [show, setShow] = useState(false);

    const [valor, setValor] = useState(1);

    const handleClose = () => {
        setShow(false);
        setValor(1);
    };

    const handleShow = () => setShow(true);

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
            accordions.push(<AccordionitemUnico eventKey={i.toString()} paciente={paciente} dataMedicamentoGeral={dataMedicamentoGeral} setDataMedicamentoGeral={setDataMedicamentoGeral}/>);
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


                <Col sm={6} className='d-flex justify-content-center'>

                    <div className='border inputQuantidade '>
                        <Row>
                            <h6 className='d-flex justify-content-center mt-1'>Quantidade a sair</h6>
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
                    </div>



                </Col>
            </Row>

        )
    }

    useEffect(() => {
        serverFunctions.getMedicamentos().then(dados => { setDataMedicamentoGeral(JSON.parse(dados)) }).catch(alert);
    }, []);

    useEffect(() => {
        if (dataMedicamentoGeral === null) {
            console.log("Atualizei papai de fora")
            serverFunctions.getMedicamentos().then(dados => { setDataMedicamentoGeral(JSON.parse(dados)) }).catch(alert);
        }
    }, [dataMedicamentoGeral]);

    return (

        <>
            <OverlayTrigger
                placement="left"
                delay={{ show: 400, hide: 250 }}
                overlay={renderTooltip}
            >
                <Button variant="outline-secondary" onClick={handleShow}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-capsule" viewBox="0 0 16 16">
                        <path d="M1.828 8.9 8.9 1.827a4 4 0 1 1 5.657 5.657l-7.07 7.071A4 4 0 1 1 1.827 8.9Zm9.128.771 2.893-2.893a3 3 0 1 0-4.243-4.242L6.713 5.429l4.243 4.242Z" />
                    </svg>
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
                    <Modal.Title>Saída de medicamento(s)</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container className='mb-5'>

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
                    </div>
                </Modal.Footer>
            </Modal>
        </>
    );
}