import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import { Form } from 'react-bootstrap';

import InputText from '../../../components/InputText';
import InputDate from '../../../components/InputDate'
import InputSelect from '../../../components/InputSelect';
import { serverFunctions } from '../../../../utils/serverFunctions';





function MedModalAtualizar({ props, remedio, listaDrop, data, setData }) {
    const [lista, setLista] = useState();

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // Elementos do formulário:
    const [validade, setValidade] = useState(remedio.validade); //---DATA
    const [dataCadastro, setDataCadastro] = useState(remedio.dataCadastroPura); //--------------DATA
    const [validadePura, setValidadePura] = useState(remedio.validadePura); //--------------DATA    
    const [nome, setNome] = useState(remedio.nome);
    const [principioAtivo, setPrincipioAtivo] = useState(remedio.principioAtivo);
    const [lote, setLote] = useState(remedio.lote);
    const [origem, setOrigem] = useState(remedio.origem);
    const [fabricante, setFabricante] = useState(remedio.fabricante);
    const [classe, setClasse] = useState(remedio.classe); //--------------SELECT
    const [tipo, setTipo] = useState(remedio.tipo); //---------------------SELECT
    const [tarja, setTarja] = useState(remedio.tarja); //-------------------SELECT
    const [apresentacao, setApresentacao] = useState(remedio.apresentacao); //-----SELECT
    const [motivoDescarte, setMotivoDescarte] = useState(remedio.motivoDescarte); //-SELECT

    const salvarAlteracoes = (event) => {
        event.preventDefault();

        // Cria um objeto com os dados atualizados do medicamento
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
            motivoDescarte,
            'index': remedio.index
        }

        serverFunctions.updateRowMedicamentos(medicamento).then((sucesso) => {
            if (sucesso) {
                setData([medicamento, ...data])
            } else {
                console.log("Não foi possível atualizar")
            }

        })

    }


    useEffect(() => {
        setLista(listaDrop)
    }, [listaDrop]);

    return (
        <>
            <Button variant="outline-secondary" onClick={handleShow}>
                <img
                    alt=""
                    src="/img/icones/edit.svg"
                    width="25"
                    height="25"
                    className="d-inline-block align-top"
                />{' '}
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
                        <Form onSubmit={salvarAlteracoes}>
                            <Row>
                                <Col sm={6}>
                                    <InputDate label={"Data do cadastro"} controlId={"inputDataCadastro"} value={dataCadastro?.substr(0, 10)} setData={setDataCadastro} />
                                </Col>
                                <Col sm={6}>
                                    <InputText label={"Lote"} controlId={"inputLoteMed"} value={lote} data={lote} setData={setLote} />
                                </Col>
                            </Row>

                            <Row>
                                <Col>
                                    <InputText label={"Nome do medicamento"} controlId={"inputNomeMed"} value={nome} data={nome} setData={setNome} />
                                </Col>
                            </Row>

                            <Row>
                                <Col>
                                    <InputText label={"Princípio ativo e dosagem"} controlId={"inputPrincMed"} value={principioAtivo} data={principioAtivo} setData={setPrincipioAtivo} />
                                </Col>
                            </Row>

                            <Row>
                                <Col>
                                    <InputText label={"Origem do medicamento"} controlId={"inputOrigemMed"} value={origem} data={origem} setData={setOrigem} />
                                </Col>
                            </Row>

                            <Row>
                                <Col sm={6}>
                                    <InputText label={"Fabricante"} controlId={"inputFabrivanteMed"} value={fabricante} data={fabricante} setData={setFabricante} />
                                </Col>

                                <Col sm={6}>
                                    <InputDate label={"Data de validade"} controlId={"inputDataValidade"} value={validadePura?.substr(0, 10)} setData={setValidadePura} />
                                </Col>
                            </Row>

                            <Row>
                                <Col>
                                    <InputSelect label={"Classe"} name={"classe"} data={classe} setData={setClasse} lista={lista ? lista[0] : []} />
                                </Col>
                            </Row>

                            <Row className='mt-3'>
                                <Col sm={6}>
                                    <InputSelect label={"Tarja"} name={"tarja"} data={tarja} setData={setTarja} lista={lista ? lista[2] : []} />
                                </Col>

                                <Col sm={6}>
                                    <InputSelect label={"Apresentação"} name={"apresentacao"} data={apresentacao} setData={setApresentacao} lista={lista ? lista[3] : []} />
                                </Col>
                            </Row>

                            <Row className='mt-3'>
                                <Col sm={6}>
                                    <InputSelect label={"Tipo de medicamento"} name={"tipo"} data={tipo} setData={setTipo} lista={lista ? lista[1] : []} />
                                </Col>
                                <Col sm={6}>
                                    <InputSelect label={"Motivo do descarte"} name={"motivoDescarte"} data={motivoDescarte} setData={setMotivoDescarte} lista={lista ? lista[4] : []} />
                                </Col>
                            </Row>

                            <div className='mt-3 mb-3 d-flex justify-content-around'>
                                <Button variant="outline-secondary" onClick={handleClose}>
                                    Cancelar
                                </Button>

                                <Button type="submit" variant="dark" onClick={handleClose}>
                                    Salvar alterações
                                </Button>
                            </div>
                        </Form>
                    </Container>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default MedModalAtualizar;
