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

// import formatarData from '../../../functions.js';
import gerarObjetoEstiloMedicamentoGeral from '../../../Functions/gerarObjetoEstiloMedicamentoGeral.js';
import formatarData from '../../../Functions/formatarData.js';

import MedicamentoGeral from '../../../../../models/MedicamentoGeral'

function MedModalAtualizar({ remedio, index, listaDrop, data, setData }:
    { remedio: MedicamentoGeral, index: number, listaDrop: string[][], data: Array<MedicamentoGeral>, setData: Function }) {

    const [lista, setLista] = useState([[]]);

    const [dataCadastro, setDataCadastro] = useState(remedio.dataCadastro);
    const [nome, setNome] = useState(remedio.nome);
    const [principioAtivo, setPrincipioAtivo] = useState(remedio.principioAtivo);
    const [classe, setClasse] = useState(remedio.classe);
    const [tarja, setTarja] = useState(remedio.tarja);
    const [apresentacao, setApresentacao] = useState(remedio.apresentacao);

    const [alterado, setAlterado] = useState(false);

    const validadeMaisProxima = remedio.validadeMaisProxima;
    const quantidadeTotal = remedio.quantidadeTotal;
    const chaveGeral = remedio.chaveGeral;

    console.log("Alterado: ", alterado)


    const [show, setShow] = useState(false);

    const handleClose = () => {
        setNome(remedio.nome);
        setPrincipioAtivo(remedio.principioAtivo);
        setClasse(remedio.classe);
        setTarja(remedio.tarja);
        setApresentacao(remedio.apresentacao);

        setShow(false);
        setMensagem(false);
        setAlterado(false);

    };

    const handleShow = () => {
        setNome(remedio.nome);
        setPrincipioAtivo(remedio.principioAtivo);
        setClasse(remedio.classe);
        setTarja(remedio.tarja);
        setApresentacao(remedio.apresentacao);

        setShow(true);
        setAlterado(false);

    };

    // Controle ao clicar em atualizar
    const handleClick = () => setLoading(true);
    const [isLoading, setLoading] = useState(false);

    const [mensagem, setMensagem] = useState(false);


    const [isFormValid, setIsFormValid] = useState(false);
    useEffect(() => {
        if (classe != '' && tarja != '' && apresentacao != '' && nome != '' && principioAtivo != '') {
            setIsFormValid(true);
        } else {
            setIsFormValid(false);
        }

        setAlterado(true);

    }, [classe, tarja, apresentacao, nome, principioAtivo]);

    useEffect(() => {
        // Cria um objeto com os dados atualizados do medicamento


        if (!alterado) {
            setLoading(false);
            setMensagem(false);
            handleClose();
        } else {
            var dataCadastroFormatada = formatarData(dataCadastro);

            const medicamentoGeral = new MedicamentoGeral(chaveGeral, dataCadastroFormatada, nome, principioAtivo, tarja, classe, apresentacao, quantidadeTotal, validadeMaisProxima);

            if (isLoading) {

                serverFunctions.updateRowMedicamentos(medicamentoGeral).then((sucesso) => {
                    if (sucesso) {
                        var novosDados = gerarObjetoEstiloMedicamentoGeral(medicamentoGeral);

                        data[index] = novosDados;
                        setData([...data]);

                        setMensagem(false);
                        setLoading(false);
                        handleClose();
                        setAlterado(false);

                    } else {
                        setMensagem(true);
                        setLoading(false);
                    }
                })

            }
        }

    }, [isLoading]);

    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            Atualizar informações
        </Tooltip>
    )

    // useEffect(() => {
    //     console.log("Alterou aqui hein")
    // }, [nome, principioAtivo, classe, tarja, apresentacao]);


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


                        </Form>
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

export default MedModalAtualizar;
