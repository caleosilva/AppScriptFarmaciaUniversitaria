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
import InputCnpj from '../../../components/InputCnpj';
import { serverFunctions } from '../../../../utils/serverFunctions';
import Doador from '../../../../../models/Doador';

import React, { useEffect } from 'react';
import { useState } from 'react';


export default function ModalCadastarDoador({ data, setData, listaDD }: { data: Array<Doador>, setData: Function, listaDD: string[][] }) {

    // Controle ao clicar em cadastrar
    const handleClick = () => setLoading(true);
    const [isLoading, setLoading] = useState(false);

    // Mensagem de erro:
    const [mensagem, setMensagem] = useState(false);

    // Carrega os dados do DropDown
    const [lista, setLista] = useState([[]]);

    // Elementos do formulário:
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

    function renderCamposCondicionais() {
        if (tipoDoador === 'Pessoa física') {
            return (
                <>
                    <Row>
                        <Col sm={6}>
                            <InputCpf label={"CPF"} placeholder={"XXX.XXX.XXX-XX"} controlId={"inputCpf"} name={"cpf"} data={cpf} setData={setCpf} />
                        </Col>

                        <Col sm={6}>
                            <InputText type={"date"} required={true} label={"Data de nascimento"} placeholder={""} controlId={"inputNascimento"} name={"nascimento"} data={dataNascimento} setData={setDataNascimento} />
                        </Col>
                    </Row>

                    <Row>
                        <Col sm={6}>
                            <InputSelect required={true} label={"Sexo"} name={"sexo"} data={sexo} setData={setSexo} lista={lista ? lista[7] : []} />
                        </Col>

                        <Col sm={6}>
                            <InputSelect required={true} label={"Estado Civil"} name={"estadoCivil"} data={estadoCivil} setData={setEstadoCivil} lista={lista ? lista[8] : []} />
                        </Col>
                    </Row>

                </>
            )

        } else if (tipoDoador === 'Pessoa jurídica') {
            return (
                <>
                    <Row>
                        <Col sm={6}>
                            <InputCnpj label={"CNPJ"} placeholder={"XX.XXX.XXX/XXXX-XX"} controlId={"inputCnpj"} name={"cnpj"} data={cnpj} setData={setCnpj} />
                        </Col>
                    </Row>

                </>
            )
        }

    }


    const [isFormValid, setIsFormValid] = useState(false);
    useEffect(() => {

        if (nome !== '' && cidade !== '' && bairro !== '' && endereco !== '' && numero !== '' && comoSoube !== '' && tipoDoador === "Outro") {
            setIsFormValid(true);

        } else if ((nome !== '' && cidade !== '' && bairro !== '' && endereco !== '' && numero !== '' && comoSoube !== '' && cnpj.length === 18) && (tipoDoador === "Pessoa jurídica")) {
            setIsFormValid(true);

        } else if ((nome !== '' && cidade !== '' && bairro !== '' && endereco !== '' && numero !== '' && comoSoube !== '' && cpf.length === 14 && dataNascimento !== '' && dataNascimento !== '-' && sexo !== '' && sexo !== '-' && estadoCivil !== '' && estadoCivil !== '-') && (tipoDoador === "Pessoa física")) {
            setIsFormValid(true);

        } else {
            setIsFormValid(false);
        }
    }, [nome, tipoDoador, cidade, bairro, endereco, numero, comoSoube, cnpj, cpf, dataNascimento, sexo, estadoCivil]);

    useEffect(() => {
        if (tipoDoador === 'Pessoa física') {
            setCnpj('-');
            console.log("- cnpj")
        } else if (tipoDoador === 'Pessoa jurídica') {
            setCpf('-');
            setDataNascimento('-');
            setSexo('-');
            setEstadoCivil('-');
            console.log("- nos 4")
        } else if (tipoDoador === 'Outro') {
            setCnpj('-');
            setCpf('-');
            setDataNascimento('-');
            setSexo('-');
            setEstadoCivil('-');
            console.log("- nos 5")

        }

    }, [tipoDoador]);

    // Realiza o cadastro //TO-DO
    useEffect(() => {

        var nascimento;
        if (typeof dataNascimento == 'string' && dataNascimento.length === 1) {
            nascimento = dataNascimento;
        } else {
            nascimento = new Date(dataNascimento);
        }

        var chaveDoador = '';
        if (tipoDoador === 'Pessoa física') {
            chaveDoador = cpf;
        } else if (tipoDoador === 'Pessoa jurídica') {
            chaveDoador = cnpj;
        } else if (tipoDoador === 'Outro') {
            chaveDoador = nome.replace(/\s/g, '').toLowerCase(); // Nome sem espaco
        }

        const dadosDoador = new Doador(chaveDoador, nome, tipoDoador, cidade, bairro, endereco, numero, comoSoube, cnpj, cpf, nascimento, sexo, estadoCivil);


        if (isLoading) {
            console.log(dadosDoador);
            setLoading(false);
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
                                    <InputText type={"text"} required={true} label={"Nome"} placeholder={""} controlId={"inputNome"} name={"nome"} data={nome} setData={setNome} />
                                </Col>
                            </Row>

                            <Row>
                                <Col sm={6}>
                                    <InputText type={"text"} required={true} label={"Cidade"} placeholder={""} controlId={"inputCidade"} name={"cidade"} data={cidade} setData={setCidade} />
                                </Col>

                                <Col sm={6}>
                                    <InputText type={"text"} required={true} label={"Bairro"} placeholder={""} controlId={"inputBairro"} name={"bairro"} data={bairro} setData={setBairro} />
                                </Col>
                            </Row>

                            <Row>
                                <Col sm={6}>
                                    <InputText type={"text"} required={true} label={"Endereço"} placeholder={""} controlId={"inputEndereco"} name={"endereco"} data={endereco} setData={setEndereco} />
                                </Col>

                                <Col sm={6}>
                                    <InputText type={"text"} required={true} label={"Número do endereço"} placeholder={""} controlId={"inputNumero"} name={"numero"} data={numero} setData={setNumero} />
                                </Col>
                            </Row>

                            <Row>
                                <Col sm={6}>
                                    <InputSelect required={true} label={"Como soube?"} name={"comoSoube"} data={comoSoube} setData={setComoSoube} lista={lista ? lista[12] : []} />
                                </Col>

                                <Col sm={6}>
                                    <InputSelect required={true} label={"Tipo do doador"} name={"tipoDoador"} data={tipoDoador} setData={setTipoDoador} lista={lista ? lista[6] : []} />
                                </Col>
                            </Row>

                            {renderCamposCondicionais()}

                            <Row className='mb-3 mt-2 mt-3'>
                                {mensagem &&
                                    <Col>
                                        <Alert variant="danger" onClose={() => setMensagem(false)} dismissible>
                                            <Alert.Heading>Não foi possível realizar o cadastro</Alert.Heading>
                                            <p>
                                                Já existe um doador com o CPF ou CNPJ inserido.
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