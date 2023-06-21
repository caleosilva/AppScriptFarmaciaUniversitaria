// import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import Alert from 'react-bootstrap/Alert';
import { Form } from 'react-bootstrap';

import InputText from '../../../components/InputText';
import InputSelect from '../../../components/InputSelect';
import { serverFunctions } from '../../../../utils/serverFunctions';
import MedicamentoGeral from '../../../../../models/MedicamentoGeral';
import ErroMedicamentoGeralExistente from '../../../../../erros/ErroMedicamentoGeralExistente';
import dataHojeFormatada from '../../../Functions/dataHojeFormatada'

import React, { useEffect } from 'react';
import { useState } from 'react';


function MedModalCadastrar({ data, setData, listaDD }: { data: Array<MedicamentoGeral>, setData: Function, listaDD: string[][] }) {

    // Controle ao clicar em cadastrar
    const handleClick = () => setLoading(true);
    const [isLoading, setLoading] = useState(false);

    // Mensagem de erro:
    const [mensagem, setMensagem] = useState(false);


    // Carrega os dados do DropDown
    const [lista, setLista] = useState([[]]);

    // Elementos do formulário:
    const [classe, setClasse] = useState(''); //-----------------SELECT
    const [tarja, setTarja] = useState(''); //-------------------SELECT
    const [apresentacao, setApresentacao] = useState(''); //-----SELECT
    const [nome, setNome] = useState('');
    const [principioAtivo, setPrincipioAtivo] = useState('');

    // Cuida de abrir e fechar o modal:

    const handleClose = () => {
        setNome('');
        setPrincipioAtivo('');
        setClasse('');
        setTarja('');
        setApresentacao('');

        setShow(false)
    };
    const handleShow = () => setShow(true);

    const [show, setShow] = useState(false);

    const [isFormValid, setIsFormValid] = useState(false);
    useEffect(() => {
        if(classe != '' && tarja != '' && apresentacao != '' && nome != '' && principioAtivo != ''){
            setIsFormValid(true);
        }else{
            setIsFormValid(false);
        }
    }, [classe, tarja, apresentacao, nome, principioAtivo]);

    // Realiza o cadastro
    useEffect(() => {

        const dataCadastro = dataHojeFormatada();
        const chaveGeral = (nome + '#' + principioAtivo + '#' + apresentacao).toString().toLowerCase().replace(/\s+/g, '');
        const quantidadeTotal = 0;
        const validadeMaisProxima = "-";

        // Cria um objeto com os dados do medicamento
        const medicamentoGeral = new MedicamentoGeral(chaveGeral, dataCadastro, nome, principioAtivo, tarja, classe, apresentacao, quantidadeTotal, validadeMaisProxima);

        const medicamento = {
            'chaveGeral': (nome + '#' + principioAtivo + '#' + apresentacao).toString().toLowerCase().replace(/\s+/g, ''),
            nome,
            principioAtivo,
            classe,
            tarja,
            apresentacao,
            "quantidadeTotal": "0",
            "validadeMaisProxima": "-",
            dataCadastro
        }

        if (isLoading) {
            serverFunctions.appendRowMedicamentos(medicamentoGeral).then((sucesso) => {
                if (sucesso) {
                    // Atualiza a tabela:
                    setData([...data, medicamentoGeral])

                    // Limpa os formulários
                    setNome('');
                    setPrincipioAtivo('');
                    setClasse('');
                    setTarja('');
                    setApresentacao('');

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

    // Carrega as informações do dropdown
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

                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Cadastro de medicamento</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Container>
                            <Row>
                                <Col>
                                    <InputText type={"text"} required={true} label={"Nome do medicamento"} placeholder={""} controlId={"inputNomeMed"} name={"nome"} data={nome} setData={setNome} />
                                </Col>
                            </Row>

                            <Row>
                                <Col>
                                    <InputText type={"text"} required={true} label={"Princípio ativo"} placeholder={""} controlId={"inputPrincMed"} name={"principioAtivo"} data={principioAtivo} setData={setPrincipioAtivo} />
                                </Col>
                            </Row>

                            <Row className='mb-3'>

                                <Col>
                                    <InputSelect required={true} label={"Classe"} name={"classe"} data={classe} setData={setClasse} lista={lista ? lista[0] : []} />
                                </Col>
                            </Row>

                            <Row className='mb-3'>
                                <Col sm={6}>
                                    <InputSelect required={true} label={"Tarja"} name={"tarja"} data={tarja} setData={setTarja} lista={lista ? lista[2] : []} />
                                </Col>

                                <Col sm={6}>
                                    <InputSelect required={true} label={"Apresentação"} name={"apresentacao"} data={apresentacao} setData={setApresentacao} lista={lista ? lista[3] : []} />
                                </Col>
                            </Row>

                            <Row className='mb-3 mt-2'>
                                {mensagem &&
                                    <Col>
                                        <Alert variant="danger" onClose={() => setMensagem(false)} dismissible>
                                            <Alert.Heading>Não foi possível realizar o cadastro</Alert.Heading>
                                            <p>
                                                Já existe um medicamento cadastrado com o nome e o princípio ativo inserido.
                                            </p>
                                        </Alert>
                                    </Col>
                                }
                            </Row>

                        </Container>

                        <div className='mt-3 d-flex justify-content-around'>
                            <Button variant="outline-secondary" onClick={handleClose}>
                                Cancelar
                            </Button>

                            {/* <Button type="submit" variant="dark" >
                                Cadastrar
                            </Button> */}

                            <Button

                                type="submit"
                                variant="dark"
                                disabled={isLoading || !isFormValid}
                                onClick={!isLoading ? handleClick : null}
                            >
                                {isLoading ? 'Cadastrando...' : 'Cadastrar'}
                            </Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default MedModalCadastrar;
