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
import InputSelect from '../../../components/InputSelect';
import InputSelectDoador from '../InputSelectDoador';
import MedicamentoEspecifico from '../../../../../models/MedicamentoEspecifico';


export default function ModalEntradaEstoque({ remedio, listaDD, doadores, data, setData }: { remedio: MedicamentoEspecifico, listaDD: string[][], doadores: [{}], data: Array<MedicamentoEspecifico>, setData: Function }) {

    const [quantidade, setQuantidade] = useState('');
    // const [doador, setDoador] = useState('');

    const [opcaoEntrada, setOpcaoEntrada] = useState('');
    const [lista, setLista] = useState([[]]);


    const [mensagem, setMensagem] = useState(false);

    const [show, setShow] = useState(false);

    const handleClose = () => {
        // setDoador('');
        setOpcaoEntrada('');
        setQuantidade('');
        setShow(false);
    };
    const handleShow = () => setShow(true);


    const handleClick = () => setLoading(true);
    const [isLoading, setLoading] = useState(false);

    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            Registrar entrada
        </Tooltip>
    );

    // function renderDoador() {
    //     if (opcaoEntrada === 'Doação') {
    //         return (
    //             <Col SM={8}>
    //                 <InputSelectDoador required={true} label={"Selecione o doador"} name={"opcEntrada"} data={doador} setData={setDoador} lista={doadores} />
    //             </Col>
    //         )
    //     }
    // }

    const [isFormValid, setIsFormValid] = useState(false);
    useEffect(() => {
        if (quantidade != '' && opcaoEntrada === "Doação") {
            setIsFormValid(true);
        } else if (quantidade != '' && opcaoEntrada != 'Doação' && opcaoEntrada != '') {
            setIsFormValid(true);
        } else {
            setIsFormValid(false);
        }
    }, [quantidade, opcaoEntrada]);

    useEffect(() => {

        if (isLoading) {

            serverFunctions.atualizarQuantidadeEstoque(remedio, quantidade, true).then((sucesso) => {
                if (sucesso) {
                    // Atualiza a tabela:
                    remedio.quantidade = remedio.quantidade + parseInt(quantidade);
                    setData([...data]);

                    setLoading(false);
                    setMensagem(false);
                    handleClose();
                } else {
                    setLoading(false);
                    setMensagem(true);
                }
            }).catch((e) => console.log(e.stack));

        }
    }, [isLoading]);

    useEffect(() => {
        setLista(listaDD)
    }, [listaDD]);

    return (

        <>
            <OverlayTrigger
                placement="left"
                delay={{ show: 400, hide: 250 }}
                overlay={renderTooltip}
            >
                <Button variant="outline-secondary" onClick={handleShow}>
                    <i className="bi bi-plus-circle"></i>
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
                    <Modal.Title>Entrada de estoque</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>

                        <Row className='d-flex justify-content-center'>
                            <Col sm={6}>
                                <Alert key="success" variant="success">
                                    <p>Em estoque: <strong>{remedio.quantidade}</strong></p>
                                </Alert>
                            </Col>

                            
                        </Row>

                        <Row className='d-flex justify-content-center'>
                            <Col sm={6}>
                                <InputPositiveNumber required={true} label={"Quantidade a ser adicionada"} placeholder={""} controlId={"inputQuantidade"} name={"quantidade"} data={quantidade} setData={setQuantidade} max={9999} />
                            </Col>
                        </Row>

                        <Row className='mb-3 d-flex justify-content-center'>
                            <Col sm={6}>
                                <InputSelect required={true} label={"Opção de entrada"} name={"opcEntrada"} data={opcaoEntrada} setData={setOpcaoEntrada} lista={lista ? lista[10] : []} />
                            </Col>

                            {/* {renderDoador()} */}
                        </Row>

                        <Row className='mb-3 mt-2'>
                            {mensagem &&
                                <Col>
                                    <Alert variant="danger" onClose={() => setMensagem(false)} dismissible>
                                        <Alert.Heading>Não foi possível adicionar</Alert.Heading>
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