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
import MedicamentoEspecifico from '../../../../../models/MedicamentoEspecifico';
import formatarData from '../../../Functions/formatarData';
import dataHojeFormatada from '../../../Functions/dataHojeFormatada';

import React, { useEffect } from 'react';
import { useState } from 'react';
import InputPositiveNumber from '../../../components/InputPositiveNumber';
import { object } from 'prop-types';


export default function ModalEstoqueCadastrar({ data, setData, listaDD, chaveMedicamentoGeral }: { data: Array<MedicamentoEspecifico>, setData: Function, listaDD: string[][], chaveMedicamentoGeral: string }) {

    // Controle ao clicar em cadastrar
    const handleClick = () => setLoading(true);
    const [isLoading, setLoading] = useState(false);

    // Mensagem de erro:
    const [mensagem, setMensagem] = useState(false);
    const [mensagemErroBack, setMensagemErroBack] = useState(false);

    // Carrega os dados do DropDown
    const [lista, setLista] = useState([[]]);

    // Elementos do formulário:
    const [lote, setLote] = useState('');
    const [dosagem, setDosagem] = useState('');
    const [validade, setValidade] = useState('');
    const [quantidade, setQuantidade] = useState('');//
    const [origem, setOrigem] = useState('');
    const [tipo, setTipo] = useState(''); //-----------------SELECT
    const [fabricante, setFabricante] = useState('');
    const [motivoDoacao, setMotivoDoacao] = useState('');//-----------------SELECT

    function renderErroExistente() {
        if (mensagem) {
            return (
                <Row className='mb-3 mt-2'>
                    <Col>
                        <Alert variant="danger" onClose={() => setMensagem(false)} dismissible>
                            <Alert.Heading>Não foi possível realizar o cadastro</Alert.Heading>
                            <p>
                                Já existe um medicamento cadastrado com a dosagem, lote e validade inserida.
                            </p>
                        </Alert>
                    </Col>
                </Row>
            )
        }
    }

    function renderErroBack() {
        if (mensagemErroBack) {
            return (
                <Row className='mb-3 mt-3'>
                    <Col>
                        <Alert variant="dark" onClose={() => setMensagemErroBack(false)} dismissible>
                            <Alert.Heading>Erro!</Alert.Heading>
                            <p>
                                Não foi possível cadastrar o medicamento, tente novamente mais tarde!
                            </p>
                        </Alert>
                    </Col>
                </Row>
            )
        }

    }

    // Cuida de abrir e fechar o modal:
    const handleClose = () => {
        setLote('')
        setDosagem('')
        setValidade('')
        setQuantidade('')
        setOrigem('')
        setTipo('')
        setFabricante('')
        setMotivoDoacao('')

        setShow(false)
    };
    const handleShow = () => setShow(true);

    const [show, setShow] = useState(false);

    const [isFormValid, setIsFormValid] = useState(false);
    useEffect(() => {
        if (lote != '' && dosagem != '' && validade != '' && origem != '' && tipo != '' && fabricante != '' && motivoDoacao != '' && quantidade != '') {
            setIsFormValid(true);
        } else {
            setIsFormValid(false);
        }
    }, [lote, dosagem, validade, origem, tipo, fabricante, motivoDoacao, quantidade]);

    // Realiza o cadastro
    useEffect(() => {

        var validadeFormatada = formatarData(validade);
        var dataHoje = dataHojeFormatada();

        var chaveMedicamentoEspecifico = (lote + '#' + dosagem + '#' + validadeFormatada).toString().toLowerCase().replace(/\s+/g, '');

        var chaveGeral = chaveMedicamentoGeral + '#' + chaveMedicamentoEspecifico;

        // const dadosMedicamentoEspecifico = new MedicamentoEspecifico(chaveMedicamentoGeral, chaveMedicamentoEspecifico, lote, dosagem, dataValidade, parseInt(quantidade), origem, tipo, fabricante, motivoDoacao, dataHoje, chaveGeral);

        const medicamentoEspecifico = {
            chaveMedicamentoGeral,
            chaveMedicamentoEspecifico,
            lote,
            dosagem,
            "validade": validadeFormatada,
            quantidade,
            origem,
            tipo,
            fabricante,
            motivoDoacao,
            "dataEntrada": dataHoje,
            chaveGeral
        }

        console.log("validadeFormatada", validadeFormatada);
        console.log(medicamentoEspecifico);

        if (isLoading) {
            serverFunctions.appendRowMedicamentoEspecifico(medicamentoEspecifico).then((sucesso) => {
                if (sucesso) {
                    // Atualiza a tabela:
                    setData([...data, medicamentoEspecifico]);

                    // Limpa os formulários
                    setLote('');
                    setDosagem('');
                    setValidade('');
                    setQuantidade('');
                    setOrigem('');
                    setTipo('');
                    setFabricante('');
                    setMotivoDoacao('');

                    setLoading(false);
                    setMensagem(false);
                    handleClose();
                } else {
                    setLoading(false);
                    setMensagem(true);
                    console.log("Medicamento específico já existe na tabela")
                }
            }).catch(
                (e) => {
                    console.log(e.stack);
                    setMensagemErroBack(true);
                    setLoading(false);
                });
        }

    }, [isLoading]);

    // Carrega as informações do dropdown
    useEffect(() => {
        setLista(listaDD)
    }, [listaDD]);

    return (
        <>
            <Button variant="outline-secondary" onClick={handleShow}>
                Cadastrar nova doação
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
                    <Modal.Title>Cadastro de doação</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Container>
                            {/* <Row>
                                <Col>
                                    <InputText type={"text"} required={true} label={"Doador"} placeholder={"Informe o nome, CPF ou CNPJ e selecione um doador"} controlId={"inputDoador"} name={"doador"} data={dosagem} setData={setDosagem} />
                                </Col>
                            </Row>
                            <hr/> */}

                            <Row>
                                <Col>
                                    <InputText type={"text"} required={true} label={"Dosagem"} placeholder={""} controlId={"inputDosagem"} name={"dosagem"} data={dosagem} setData={setDosagem} />
                                </Col>
                            </Row>

                            <Row>
                                <Col sm={6}>
                                    <InputText type={"text"} required={true} label={"Lote"} placeholder={""} controlId={"inputLote"} name={"lote"} data={lote} setData={setLote} />
                                </Col>

                                <Col sm={6}>
                                    <InputText type={"date"} required={true} label={"Validade"} placeholder={""} controlId={"inputValidade"} name={"validade"} data={validade} setData={setValidade} />
                                </Col>
                            </Row>

                            <Row>
                                <Col sm={6}>
                                    <InputPositiveNumber required={true} label={"Quantidade"} placeholder={""} controlId={"inputQuantidade"} name={"quantidade"} data={quantidade} setData={setQuantidade} max={9999} />
                                </Col>

                                <Col sm={6}>
                                    <InputText type={"text"} required={true} label={"Fabricante"} placeholder={""} controlId={"inputFabricante"} name={"fabricante"} data={fabricante} setData={setFabricante} />
                                </Col>
                            </Row>

                            <Row className='mb-3'>

                                <Col >
                                    <InputSelect required={true} label={"Motivo da doação"} name={"motivoDoacao"} data={motivoDoacao} setData={setMotivoDoacao} lista={lista ? lista[4] : []} />
                                </Col>
                            </Row>

                            <Row className='mb-3'>
                                <Col sm={6}>
                                    <InputSelect required={true} label={"Tipo"} name={"tipo"} data={tipo} setData={setTipo} lista={lista ? lista[1] : []} />
                                </Col>



                                <Col sm={6}>
                                    <InputSelect required={true} label={"Origem"} name={"origem"} data={origem} setData={setOrigem} lista={lista ? lista[5] : []} />
                                </Col>
                            </Row>

                            {renderErroExistente()}

                            {renderErroBack()}

                        </Container>
                    </Form>
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
                            {isLoading ? 'Cadastrando...' : 'Cadastrar'}
                        </Button>
                    </div>
                </Modal.Footer>
            </Modal>
        </>
    );
}
