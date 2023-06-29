import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import Alert from 'react-bootstrap/Alert';
import { Form } from 'react-bootstrap';

import InputText from '../../../components/InputText';
import InputSelect from '../../../components/InputSelect';
import InputCpf from '../../../components/InputCpf';
import { serverFunctions } from '../../../../utils/serverFunctions';
// import MedicamentoEspecifico from '../../../../../models/MedicamentoEspecifico';
import Doador from '../../../../../models/Doador';

import React, { useEffect } from 'react';
import { useState } from 'react';
import InputPositiveNumber from '../../../components/InputPositiveNumber';
import { object } from 'prop-types';


export default function ModalCadastarDoador({ data, setData, listaDD }: { data: Array<Doador>, setData: Function, listaDD: string[][] }) {

    // Controle ao clicar em cadastrar
    const handleClick = () => setLoading(true);
    const [isLoading, setLoading] = useState(false);

    // Mensagem de erro:
    const [mensagem, setMensagem] = useState(false);

    // Carrega os dados do DropDown
    const [lista, setLista] = useState([[]]);

    // Elementos do formulário:
    const [lote, setLote] = useState('');
    const [dosagem, setDosagem] = useState('');
    const [validade, setValidade] = useState('');
    const [quantidade, setQuantidade] = useState('');
    const [origem, setOrigem] = useState('');
    const [tipo, setTipo] = useState('');
    const [fabricante, setFabricante] = useState('');
    const [motivoDoacao, setMotivoDoacao] = useState('');
    //------------------------------------------------------
    const [nome, setNome] = useState('');
    const [tipoDoador, setTipoDoador] = useState('');
    const [cidade, setCidade] = useState('');
    const [bairro, setBairro] = useState('');
    const [endereco, setEndereco] = useState('');
    const [numero, setNumero] = useState('');
    const [comoSoube, setComoSoube] = useState('');
    const [cnpj, setCnpj] = useState('');
    const [cpf, setCpf] = useState('');
    const [dataNascimento, setDataNascimento] = useState('');
    const [sexo, setSexo] = useState('');
    const [estadoCivil, setEstadoCivil] = useState('');

    // Cuida de abrir e fechar o modal:
    const handleClose = () => {
        setNome('');
        setTipoDoador('');
        setCidade('');
        setBairro('');
        setEndereco('');
        setNumero('');
        setComoSoube('');
        setCnpj('');
        setCpf('');
        setDataNascimento('');
        setSexo('');
        setEstadoCivil('');

        setShow(false)
    };

    const handleShow = () => setShow(true);

    const [show, setShow] = useState(false);

    // É necessário tipar com base no tipoDoador
    const [isFormValid, setIsFormValid] = useState(false);
    useEffect(() => {
        if (nome != '' && tipoDoador != '' && cidade != '' && bairro != '' && endereco != '' && numero != '' && cnpj != '' && cpf != '' && dataNascimento != '' && sexo != '' && estadoCivil != '') {
            setIsFormValid(true);
        } else {
            setIsFormValid(false);
        }
    }, [nome, tipoDoador, cidade, bairro, endereco, numero, cnpj, cpf, dataNascimento, sexo, estadoCivil]);

    // Realiza o cadastro
    useEffect(() => {

        var nascimento = new Date(dataNascimento);
        var nascimentoFormatada = (nascimento.getUTCDate()) + "-" + (nascimento.getMonth() + 1) + "-" + nascimento.getFullYear();

        var chaveDoador;

        if (tipoDoador === 'Pessoa física') {
            chaveDoador = cpf;
            setCnpj('-');
        } else if (tipoDoador === 'Pessoa jurídica') {
            chaveDoador = cnpj;
            setCpf('-');
        } else {
            setCnpj('');
            setCpf('');
            setDataNascimento('');
            setSexo('');
            setEstadoCivil('');

            // qual será a chaveDoador?

        }

        const dadosDoador = new Doador(chaveDoador, nome, tipoDoador, cidade, bairro, endereco, numero, comoSoube, cnpj, cpf, nascimento, sexo, estadoCivil);


        if (isLoading) {
            // serverFunctions.appendRowMedicamentoEspecifico(dadosMedicamentoEspecifico).then((sucesso) => {
            //     console.log("Sucesso: " + sucesso)

            //     if (sucesso) {

            //         // Atualiza a tabela:
            //         // setData([...data, dadosMedicamentoEspecifico]);
            //         orderData(dadosMedicamentoEspecifico);

            //         // Limpa os formulários
            //         setLote('');
            //         setDosagem('');
            //         setValidade('');
            //         setQuantidade('');
            //         setOrigem('');
            //         setTipo('');
            //         setFabricante('');
            //         setMotivoDoacao('');

            //         setLoading(false);
            //         setMensagem(false);
            //         handleClose();
            //     } else {
            //         setLoading(false);
            //         setMensagem(true);
            //         console.log("Medicamento específico já existe na tabela")
            //     }
            // }).catch((e) => console.log(e.stack));
        }

    }, [isLoading]);

    // Carrega as informações do dropdown
    useEffect(() => {
        setLista(listaDD)
    }, [listaDD]);

    return (
        <>
            <Button variant="outline-secondary" onClick={handleShow}>
                Cadastrar novo doador
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
                    <Modal.Title>Cadastro de doador</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Container>

                            <Row>
                                <Col>
                                    <InputCpf label={"Dosagem"} placeholder={"xxx.xxx.xxx-xx"} controlId={"inputDosagem"} name={"dosagem"} data={cpf} setData={setCpf} />
                                </Col>
                            </Row>

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

                                <Col>
                                    <InputSelect required={true} label={"Origem"} name={"origem"} data={origem} setData={setOrigem} lista={lista ? lista[5] : []} />
                                </Col>
                            </Row>

                            <Row className='mb-3'>
                                <Col sm={6}>
                                    <InputSelect required={true} label={"Tipo"} name={"tipo"} data={tipo} setData={setTipo} lista={lista ? lista[1] : []} />
                                </Col>

                                <Col sm={6}>
                                    <InputSelect required={true} label={"Motivo da doação"} name={"motivoDoacao"} data={motivoDoacao} setData={setMotivoDoacao} lista={lista ? lista[4] : []} />
                                </Col>
                            </Row>

                            <Row className='mb-3 mt-2'>
                                {mensagem &&
                                    <Col>
                                        <Alert variant="danger" onClose={() => setMensagem(false)} dismissible>
                                            <Alert.Heading>Não foi possível realizar o cadastro</Alert.Heading>
                                            <p>
                                                Já existe um medicamento cadastrado com a dosagem, lote e validade inserida.
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
