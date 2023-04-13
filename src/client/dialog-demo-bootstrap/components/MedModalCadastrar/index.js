// import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';

import InputText from '../InputText';
import InputDate from '../InputDate';
import InputSelect from '../InputSelect';

import React from 'react';
import { useState } from 'react';
import { serverFunctions } from '../../../utils/serverFunctions';
import { Form } from 'react-bootstrap';


function MedModalCadastrar({props, data, setData}) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // const [infoDD, setInfoDD] = useState(null)
    // useEffect(() => {
    //     serverFunctions.getInformacoesMedicamentos().then(string => { setInfoDD(JSON.parse(string)) }).catch(alert);
    // }, []);

    // Elementos do formulário:
    const [dataCadastro, setDataCadastro] = useState(''); //--------------DATA
    const [nome, setNome] = useState('');
    const [principioAtivo, setPrincipioAtivo] = useState('');
    const [lote, setLote] = useState('');
    const [origem, setOrigem] = useState('');
    const [classe, setClasse] = useState(''); //-----------------SELECT
    const [tipo, setTipo] = useState(''); //---------------------SELECT
    const [validade, setValidade] = useState(); //------------------------DATA
    const [fabricante, setFabricante] = useState('');
    const [tarja, setTarja] = useState(''); //-------------------SELECT
    const [apresentacao, setApresentacao] = useState(''); //-----SELECT
    const [motivoDescarte, setMotivoDescarte] = useState(''); //-SELECT

    const cadastrarMed = (event) => {
        event.preventDefault();

        const medicamento = {
            dataCadastro, 
            nome, 
            principioAtivo, 
            lote, 
            origem, 
            classe, 
            tipo, 
            validade, 
            fabricante, 
            tarja, 
            apresentacao, 
            motivoDescarte
        }

        // Atualiza a tabela:
        setData([...data, medicamento])

        // Adiciona no google sheets
        serverFunctions.appendRowMedicamentos(medicamento).catch(alert);

        // Limpa os formulários
        setDataCadastro('')
        setNome('')
        setPrincipioAtivo('')
        setLote('')
        setOrigem('')
        setClasse('')
        setTipo('')
        setValidade('')
        setFabricante('')
        setTarja('')
        setApresentacao('')
        setMotivoDescarte('')
    }

    return (
        <>
            <Button variant="outline-secondary" onClick={handleShow}>
                Cadastrar medicamento
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
                    <Modal.Title>Modal title</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={cadastrarMed}>
                        <Container>
                            <Row>
                                <Col sm={6}>
                                    <InputDate label={"Data do cadastro"} placeholder={"DD/MM/AAAA"} controlId={"inputDataCadastro"} name={"dataCadastro"} data={dataCadastro} setData={setDataCadastro}/>
                                </Col>
                                <Col sm={6}>
                                    <InputText label={"Lote"} placeholder={"ABC123"} controlId={"inputLoteMed"} name={"lote"} data={lote} setData={setLote}/>
                                </Col>
                            </Row>

                            <Row>
                                <Col>
                                    <InputText label={"Nome do medicamento"} placeholder={"Nome"} controlId={"inputNomeMed"} name={"nome"} data={nome} setData={setNome}/>
                                </Col>
                            </Row>

                            <Row>
                                <Col>
                                    <InputText label={"Princípio ativo e dosagem"} placeholder={"50mg de ..."} controlId={"inputPrincMed"} name={"principioAtivo"} data={principioAtivo} setData={setPrincipioAtivo}/>
                                </Col>
                            </Row>

                            <Row>
                                <Col>
                                    <InputText label={"Origem do medicamento"} placeholder={"Ex: Doação"} controlId={"inputOrigemMed"} name={"origem"} data={origem} setData={setOrigem}/>
                                </Col>
                            </Row>

                            <Row>
                                <Col>
                                    <InputText label={"Fabricante"} placeholder={"Ex: EMS"} controlId={"inputFabrivanteMed"} name={"fabricante"} data={fabricante} setData={setFabricante}/>
                                </Col>
                            </Row>

                            <Row>
                                <Col sm={6}>
                                    <InputDate label={"Data de validade"} placeholder={"DD/MM/AAAA"} controlId={"inputDataValidade"} name={"validade"} data={validade} setData={setValidade} />
                                </Col>
                                <Col sm={6}>
                                    <InputSelect label={"Classe"} name={"classe"} data={classe} setData={setClasse}/>
                                    <p>Classe: {classe}</p>
                                </Col>
                            </Row>

                            <Row>
                                <Col sm={6}>
                                    <InputSelect label={"Tarja"} name={"tarja"} data={tarja} setData={setTarja}/>
                                </Col>

                                <Col sm={6}>
                                    <InputSelect label={"Apresentação"} name={"apresentacao"} data={apresentacao} setData={setApresentacao}/>
                                </Col>
                            </Row>

                            <Row>
                                <Col sm={6}>
                                    <InputSelect label={"Tipo de medicamento"} name={"tipo"} data={tipo} setData={setTipo}/>
                                </Col>
                                <Col sm={4}>
                                    <InputSelect label={"Motivo do descarte"} name={"motivoDescarte"} data={motivoDescarte} setData={setMotivoDescarte}/>
                                </Col>
                            </Row>
                        </Container>

                        <Button variant="outline-secondary" onClick={handleClose}>
                            Cancelar
                        </Button>

                        <Button type="submit" variant="dark" >Cadastrar</Button>
                        {/* onClick={() => cadastrarMedicamento(formObject)} */}
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    {/* <Button variant="outline-secondary" onClick={handleClose}>
                        Cancelar
                    </Button>
                    <Button variant="dark" onClick={() => cadastrarMedicamento(formObject)}>Cadastrar</Button> */}
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default MedModalCadastrar;
