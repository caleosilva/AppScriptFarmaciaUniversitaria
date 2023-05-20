import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import { Form } from 'react-bootstrap';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Alert from 'react-bootstrap/Alert';


import InputText from '../../../components/InputText';
import InputSelect from '../../../components/InputSelect';
import { serverFunctions } from '../../../../utils/serverFunctions';

import MedicamentoGeral from '../../../../../models/MedicamentoGeral'

function MedModalAtualizar({ remedio, listaDrop, data, setData }:
    { remedio: MedicamentoGeral, listaDrop: string[][], data: Array<MedicamentoGeral>, setData: Function }) {

    const [lista, setLista] = useState([[]]);

    const [dataCadastro, setDataCadastro] = useState(remedio.dataCadastro); //--------------DATA
    const [nome, setNome] = useState(remedio.nome);
    const [principioAtivo, setPrincipioAtivo] = useState(remedio.principioAtivo);
    const [classe, setClasse] = useState(remedio.classe); //--------------SELECT
    const [tarja, setTarja] = useState(remedio.tarja); //-------------------SELECT
    const [apresentacao, setApresentacao] = useState(remedio.apresentacao); //-----SELECT

    const [show, setShow] = useState(false);

    const handleClose = () => {
        setNome(remedio.nome);
        setPrincipioAtivo(remedio.principioAtivo);
        setClasse(remedio.classe);
        setTarja(remedio.tarja);
        setApresentacao(remedio.apresentacao);

        setShow(false);
    };
    const handleShow = () => setShow(true);

    // Controle ao clicar em atualizar
    const handleClick = () => setLoading(true);
    const [isLoading, setLoading] = useState(false);

    const [mensagem, setMensagem] = useState(false);


    const [isFormValid, setIsFormValid] = useState(false);
    useEffect(() => {
        if(classe != '' && tarja != '' && apresentacao != '' && nome != '' && principioAtivo != ''){
            setIsFormValid(true);
        } else{
            setIsFormValid(false);
        }
    }, [classe, tarja, apresentacao, nome, principioAtivo]);


    useEffect(() => {
        // Cria um objeto com os dados atualizados do medicamento
        var chaveGeral = remedio.chaveGeral;

        const medicamento = {
            chaveGeral,
            dataCadastro,
            nome,
            principioAtivo,
            classe,
            tarja,
            apresentacao
        }
        if (isLoading) {

            serverFunctions.updateRowMedicamentos(medicamento).then((sucesso) => {
                console.log("Sucesso: " + sucesso)
                if (sucesso) {
                    setMensagem(false);
                    setLoading(false);
                    handleClose();
                    console.log("Informações atualizadas")
                } else {
                    setMensagem(true);
                    setLoading(false);
                    console.log("Não foi possível atualizar")
                }
            })

        }
    }, [isLoading]);

    // const salvarAlteracoes = (event) => {
    //     event.preventDefault();

    //     // Cria um objeto com os dados atualizados do medicamento
    //     var chaveGeral = remedio.chaveGeral;

    //     // const medicamento = new MedicamentoGeral(chaveGeral,dataCadastro, nome, principioAtivo, classe, tarja, apresentacao)

    //     // const medicamento = {
    //     //     chaveGeral,
    //     //     dataCadastro,
    //     //     nome,
    //     //     principioAtivo,
    //     //     classe,
    //     //     tarja,
    //     //     apresentacao
    //     // }

    //     // serverFunctions.updateRowMedicamentos(medicamento).then((sucesso) => {
    //     //     console.log(sucesso)
    //     //     if (sucesso) {
    //     //         data[sucesso - 2] = medicamento
    //     //         setData([...data])
    //     //         console.log("Informações atualizadas")
    //     //     } else {
    //     //         console.log("Não foi possível atualizar")
    //     //     }
    //     // })
    // }

    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            Atualizar informações
        </Tooltip>
    )


    useEffect(() => {
        setLista(listaDrop)
    }, [listaDrop]);

    return (
        <>
            <OverlayTrigger
                placement="left"
                delay={{ show: 400, hide: 250 }}
                overlay={renderTooltip}
            >
                <Button variant="outline-secondary" onClick={handleShow}>
                    <img
                        alt=""
                        src="/img/icones/edit.svg"
                        width="25"
                        height="25"
                        className="d-inline-block align-top"
                    />{' '}
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
                    <Modal.Title>Atualizar dados de um medicamento</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        <Form>
                            <Row>
                                <Col>
                                    <InputText required={true} type={"text"} placeholder='' name={"nome"} label={"Nome do medicamento"} controlId={"inputNomeMed"} data={nome} setData={setNome} />
                                </Col>
                            </Row>

                            <Row>
                                <Col>
                                    <InputText required={true} type={"text"} placeholder='' name={"principioAtivo"} label={"Princípio ativo"} controlId={"inputPrincMed"} data={principioAtivo} setData={setPrincipioAtivo} />
                                </Col>
                            </Row>

                            <Row>
                                <Col>
                                    <InputSelect required={true} label={"Classe"} name={"classe"} data={classe} setData={setClasse} lista={lista ? lista[0] : []} />
                                </Col>
                            </Row>

                            <Row className='mt-3'>
                                <Col sm={6}>
                                    <InputSelect required={true} label={"Tarja"} name={"tarja"} data={tarja} setData={setTarja} lista={lista ? lista[2] : []} />
                                </Col>

                                <Col sm={6}>
                                    <InputSelect required={true} label={"Apresentação"} name={"apresentacao"} data={apresentacao} setData={setApresentacao} lista={lista ? lista[3] : []} />
                                </Col>
                            </Row>

                            <Row className='mb-3 mt-3'>
                                {mensagem &&
                                    <Col>
                                        <Alert variant="danger" onClose={() => setMensagem(false)} dismissible>
                                            <Alert.Heading>Não foi possível atualizar as informações</Alert.Heading>
                                            <p>
                                                Já existe um medicamento cadastrado com o nome e o princípio ativo inserido.
                                            </p>
                                        </Alert>
                                    </Col>
                                }
                            </Row>

                            <div className='mt-3 mb-3 d-flex justify-content-around'>
                                <Button variant="outline-secondary" onClick={handleClose}>
                                    Cancelar
                                </Button>

                                {/* <Button type="submit" variant="dark" onClick={handleClose}>
                                    Salvar alterações
                                </Button> */}

                                <Button
                                    type="submit"
                                    variant="dark"
                                    disabled={isLoading || !isFormValid}
                                    onClick={!isLoading ? handleClick : null}
                                >
                                    {isLoading ? 'Salvando...' : 'Salvar'}
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