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
import { data } from 'autoprefixer';

function MedModalAtualizar({props, remedio}) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // Elementos do formulário:
    const [dataCadastro, setDataCadastro] = useState(remedio.dataCadastroPura); //--------------DATA
    const [validadePura, setValidadePura] = useState(remedio.validadePura); //--------------DATA    
    const [nome, setNome] = useState(remedio.nome);
    const [principioAtivo, setPrincipioAtivo] = useState(remedio.principioAtivo);
    const [lote, setLote] = useState(remedio.lote);
    const [origem, setOrigem] = useState(remedio.origem);
    const [classe, setClasse] = useState(remedio.classe); //-----------------SELECT
    // const [tipo, setTipo] = useState(remedio.tipo); //---------------------SELECT
    const [validade, setValidade] = useState(remedio.validade); //------------------------DATA
    const [fabricante, setFabricante] = useState(remedio.fabricante);
    // const [tarja, setTarja] = useState(remedio.tarja); //-------------------SELECT
    // const [apresentacao, setApresentacao] = useState(remedio.apresentacao); //-----SELECT
    // const [motivoDescarte, setMotivoDescarte] = useState(remedio.motivoDescarte); //-SELECT

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
                                    <InputDate label={"Data do cadastro"} controlId={"inputDataCadastro"} value={dataCadastro?.substr(0, 10)} setData={setDataCadastro}/>
                                    <p>{dataCadastro}</p>
                                </Col>
                                <Col sm={6}>
                                    <InputText label={"Lote"} controlId={"inputLoteMed"} value={lote} data={lote} setData={setLote}/>
                                </Col>
                            </Row>

                            <Row>
                                <Col>
                                    <InputText label={"Nome do medicamento"} controlId={"inputNomeMed"} value={nome} data={nome} setData={setNome}/>
                                </Col>
                            </Row>

                            <Row>
                                <Col>
                                    <InputText label={"Princípio ativo e dosagem"} controlId={"inputPrincMed"} value={principioAtivo} data={principioAtivo} setData={setPrincipioAtivo}/>
                                </Col>
                            </Row>

                            <Row>
                                <Col>
                                    <InputText label={"Origem do medicamento"} controlId={"inputOrigemMed"} value={origem} data={origem} setData={setOrigem}/>
                                </Col>
                            </Row>

                            <Row>
                                <Col>
                                    <InputText label={"Fabricante"} controlId={"inputFabrivanteMed"} value={fabricante} data={fabricante} setData={setFabricante}/>
                                </Col>
                            </Row>

                            <Row>
                                <Col sm={6}>
                                    <InputDate label={"Data de validade"} controlId={"inputDataValidade"} value={validadePura?.substr(0, 10)} setData={setValidadePura}/>
                                    <p>{validadePura}</p>
                                </Col>
                                <Col sm={6}>
                                    <InputSelect label={"Classe"} data={classe} setData={setClasse}/>
                                    {classe}
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
