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
import InputText from '../../../components/InputText';
import InputDate from '../../../components/InputDate';
import InputSelect from '../../../components/InputSelect';


import React, { useState, useEffect } from 'react';

export default function ModalAtualizarInfomacoesEstoque({ remedio, listaDD }: { remedio: any, listaDD: string[][] }) {

    // CRIAR OS USESTATE
    const [lista, setLista] = useState([[]]);

    const [lote, setLote] = useState(remedio.lote);
    const [dosagem, setDosagem] = useState(remedio.dosagem);
    const [validade, setValidade] = useState(remedio.validade);
    const [quantidade, setQuantidade] = useState(remedio.quantidade);
    const [origem, setOrigem] = useState(remedio.origem);
    const [tipo, setTipo] = useState(remedio.tipo);

    const [fabricante, setFabricante] = useState(remedio.fabricante);
    const [motivoDoacao, setMotivoDoacao] = useState(remedio.motivoDoacao);
    const [dataEntrada, setDataEntrada] = useState(remedio.dataEntrada);


    const [show, setShow] = useState(false);

    const handleClose = () => {
        setLote(remedio.lote);
        setDosagem(remedio.dosagem);
        setValidade(remedio.validade);
        setOrigem(remedio.origem)
        setTipo(remedio.tipo);
        setFabricante(remedio.fabricante);
        setMotivoDoacao(remedio.motivoDoacao);
        setDataEntrada(remedio.dataEntrada);

        setShow(false)
    };
    const handleShow = () => setShow(true);


    const handleClick = () => setLoading(true);
    const [isLoading, setLoading] = useState(false);

    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            Atualizar informações
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
        var medicamento = {
            'chaveMedicamentoGeral': remedio.chaveMedicamentoGeral,
            'chaveMedicamentoEspecifica': remedio.chaveMedicamentoEspecifica,
            lote,
            dosagem,
            validade,
            quantidade,
            origem,
            tipo,
            fabricante,
            motivoDoacao,
            dataEntrada,
            'chaveGeral': remedio.chaveGeral
        }

        if (isLoading) {

            // chama a função do server

        }
    }, [isLoading]);

    useEffect(() => {
        setLista(listaDD);
    }, [listaDD]);



    return (

        <>
            <OverlayTrigger
                placement="left"
                delay={{ show: 400, hide: 250 }}
                overlay={renderTooltip}
            >
                <Button variant="outline-secondary" onClick={handleShow}>
                    <i className="bi bi-pencil-square"></i>
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
                    <Modal.Title>Edição de informações</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        <Row>
                            <Col sm={6}>
                                <InputText required={true} type={"text"} placeholder='' name={"lote"} label={"Lote"} controlId={"inputLote"} data={lote} setData={setLote} />
                            </Col>

                            <Col sm={6}>
                                <InputText required={true} type={"text"} placeholder='' name={"dosagem"} label={"Dosagem"} controlId={"inputDosagem"} data={dosagem} setData={setDosagem} />
                            </Col>
                        </Row>

                        <Row>
                            <Col sm={6}>
                                <InputText required={true} type={"text"} placeholder='' name={"fabricante"} label={"Fabricante"} controlId={"inputFabricante"} data={fabricante} setData={setFabricante} />
                            </Col>

                            <Col sm={6}>
                                <InputDate label={"Data de validade"} controlId={"inputDataValidade"} name={"inputDataValidade"} data={validade} setData={setValidade} />
                            </Col>
                        </Row>

                        <Row>
                            <Col sm={6}>
                                <InputSelect required={true} label={"Origem"} name={"origem"} data={origem} setData={setOrigem} lista={listaDD ? listaDD[5] : []} />

                            </Col>

                            <Col sm={6}>
                                <InputSelect required={true} label={"Tipo"} name={"tipo"} data={tipo} setData={setTipo} lista={listaDD ? listaDD[1] : []} />

                            </Col>
                        </Row>

                        <Row>
                            <Col sm={6}>
                                <InputSelect required={true} label={"Motivo da doação"} name={"motivoDoacao"} data={motivoDoacao} setData={setMotivoDoacao} lista={listaDD ? listaDD[4] : []} />

                            </Col>

                            <Col sm={6}>
                                <InputDate label={"Data de entrada"} controlId={"inputDataEntrada"} name={"inputDataEntrada"} data={dataEntrada} setData={setDataEntrada} />
                            </Col>
                        </Row>
                    </Container>

                </Modal.Body>
                <Modal.Footer>
                    <div className='mt-3 mb-3'>
                        <Button variant="outline-secondary" onClick={handleClose} className='me-5'>
                            Cancelar
                        </Button>

                        <Button
                            type="submit"
                            variant="dark"
                            disabled={isLoading || !isFormValid}
                            onClick={!isLoading ? handleClick : null}
                        >
                            {isLoading ? 'Salvando...' : 'Salvar'}
                        </Button>
                    </div>
                </Modal.Footer>
            </Modal>
        </>
    );
}