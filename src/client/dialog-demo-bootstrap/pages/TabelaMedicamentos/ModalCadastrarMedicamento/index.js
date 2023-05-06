// import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';

import InputText from '../../../components/InputText';
import InputDate from '../../../components/InputDate'
import InputSelect from '../../../components/InputSelect';

import React, { useEffect } from 'react';
import { useState } from 'react';
import { serverFunctions } from '../../../../utils/serverFunctions';
import { Form } from 'react-bootstrap';

function MedModalCadastrar({ props, data, setData, listaDD }) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // Carrega os dados do DropDown
    const [lista, setLista] = useState();

    // Elementos do formulário:
    const [classe, setClasse] = useState(''); //-----------------SELECT
    // const [tipo, setTipo] = useState(''); //---------------------SELECT 
    const [tarja, setTarja] = useState(''); //-------------------SELECT
    const [apresentacao, setApresentacao] = useState(''); //-----SELECT
    // const [motivoDescarte, setMotivoDescarte] = useState(''); //-SELECT
    const [dataCadastro, setDataCadastro] = useState(''); //--------------DATA
    // const [validade, setValidade] = useState(); //------------------------DATA
    const [nome, setNome] = useState('');
    const [principioAtivo, setPrincipioAtivo] = useState('');
    // const [lote, setLote] = useState('');
    // const [origem, setOrigem] = useState('');
    // const [fabricante, setFabricante] = useState('');


    const cadastrarMed = (event) => {
        event.preventDefault();

        // Cria um objeto com os dados do medicamento
        const medicamento = {
            'chaveGeral': (nome + '#' + principioAtivo).toString().toLowerCase(),
            dataCadastro,
            nome,
            principioAtivo,
            classe,
            tarja,
            apresentacao
        }

        // Verifica se ele não existe para poder finalizar o cadastro
        serverFunctions.appendRowMedicamentos(medicamento).then((sucesso) => {
            console.log("Sucesso " + sucesso)

            if (sucesso) {
                // Atualiza a tabela:
                setData([...data, medicamento])

                // Limpa os formulários
                setDataCadastro('');
                setNome('');
                setPrincipioAtivo('');
                setClasse('');
                setTarja('');
                setApresentacao('');
            } else {
                console.log("Medicamento já existe na tabela")
            }
        }).catch(alert);
    }

    useEffect(() => {
        setLista(listaDD)
    }, [listaDD]);

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
                    <Modal.Title>Cadastro de medicamento</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={cadastrarMed}>
                        <Container>
                            <Row>
                                <Col sm={6}>
                                    <InputDate label={"Data do cadastro"} placeholder={"DD/MM/AAAA"} controlId={"inputDataCadastro"} name={"dataCadastro"} data={dataCadastro} setData={setDataCadastro} />
                                </Col>

                                <Col sm={6}>
                                    <InputText label={"Nome do medicamento"} placeholder={""} controlId={"inputNomeMed"} name={"nome"} data={nome} setData={setNome} />
                                </Col>

                                {/* <Col sm={6}>
                                    <InputText label={"Fabricante"} placeholder={"Ex: EMS"} controlId={"inputFabrivanteMed"} name={"fabricante"} data={fabricante} setData={setFabricante} />
                                </Col> */}

                                {/* <Col sm={6}>
                                    <InputText label={"Lote"} placeholder={"ABC123"} controlId={"inputLoteMed"} name={"lote"} data={lote} setData={setLote} />
                                </Col> */}
                            </Row>

                            {/* <Row>
                                <Col>
                                    <InputText label={"Nome do medicamento"} placeholder={"Nome"} controlId={"inputNomeMed"} name={"nome"} data={nome} setData={setNome} />
                                </Col>
                            </Row> */}

                            <Row>
                                <Col>
                                    <InputText label={"Princípio ativo"} placeholder={""} controlId={"inputPrincMed"} name={"principioAtivo"} data={principioAtivo} setData={setPrincipioAtivo} />
                                </Col>
                            </Row>

                            {/* <Row>
                                <Col>
                                    <InputText label={"Origem do medicamento"} placeholder={"Ex: Doação"} controlId={"inputOrigemMed"} name={"origem"} data={origem} setData={setOrigem} />
                                </Col>
                            </Row> */}

                            <Row>
                                {/* <Col sm={6}>
                                    <InputDate label={"Data de validade"} placeholder={"DD/MM/AAAA"} controlId={"inputDataValidade"} name={"validade"} data={validade} setData={setValidade} />
                                </Col> */}
                            </Row>

                            <Row className='mb-3'>
                                
                                <Col>
                                    <InputSelect label={"Classe"} name={"classe"} data={classe} setData={setClasse} lista={lista ? lista[0] : []} />
                                </Col>
                            </Row>

                            <Row className='mb-3'>
                                <Col sm={6}>
                                    <InputSelect label={"Tarja"} name={"tarja"} data={tarja} setData={setTarja} lista={lista ? lista[2] : []} />
                                </Col>

                                <Col sm={6}>
                                    <InputSelect label={"Apresentação"} name={"apresentacao"} data={apresentacao} setData={setApresentacao} lista={lista ? lista[3] : []} />
                                </Col>
                            </Row>

                            {/* <Row>
                                <Col sm={6}>
                                    <InputSelect label={"Tipo de medicamento"} name={"tipo"} data={tipo} setData={setTipo} lista={lista ? lista[1] : []} />
                                </Col>
                                <Col sm={6}>
                                    <InputSelect label={"Motivo do descarte"} name={"motivoDescarte"} data={motivoDescarte} setData={setMotivoDescarte} lista={lista ? lista[4] : []} />
                                </Col>
                            </Row> */}
                        </Container>

                        <div className='mt-3 d-flex justify-content-around'>
                            <Button variant="outline-secondary" onClick={handleClose}>
                                Cancelar
                            </Button>

                            <Button type="submit" variant="dark" onClick={handleClose}>
                                Cadastrar
                            </Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default MedModalCadastrar;
