import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

import { InputGroup } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import { Form } from 'react-bootstrap';

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';


import InputSelect from '../../../components/InputSelect';
import InputText from '../../../components/InputText';

import { useEffect, useState } from 'react';
import React from 'react'

import { serverFunctions } from '../../../../utils/serverFunctions';


function ModalSaidaEstoque({ props, remedio }) {


    const [data, setData] = useState(null);
    const [busca, setBusca] = useState('');

    { console.log("chave: " + remedio.chaveGeral) }
    useEffect(() => {
        serverFunctions.queryChaveMedicamentoGeral(remedio.chaveGeral).then(string => { setData(JSON.parse(string)) }).catch(alert);
    }, []);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            Estoque
        </Tooltip>
    )

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
                        src="/img/icones/inventory.svg"
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

                {...props}
                size="xl"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        Estoque de medicamento
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <section className=''>
                        <Card>
                            <Card.Header>

                                <Navbar>
                                    <Container className='justify-content-around' fluid>
                                        <InputGroup className='buscar'>
                                            <Form.Control
                                                placeholder={"Busque pelo nome ou princípio ativo"}
                                                aria-label={"Nome do medicamento"}
                                                aria-describedby="basic-addon2"
                                                value={busca}
                                                onChange={(ev) => setBusca(ev.target.value)}
                                            />
                                            <InputGroup.Text>
                                                <img
                                                    alt=""
                                                    src="/img/icones/search.svg"
                                                    width="25"
                                                    height="25"
                                                    className="d-inline-block align-top"
                                                />{' '}
                                            </InputGroup.Text>
                                        </InputGroup>

                                        <Button variant="outline-secondary">Cadastrar nova entrada</Button>{' '}


                                        {/* <MedModalCadastrar listaDD={infoDD} data={data} setData={setData} cadastrarMedicamento={medicamento => adicionarNovoMedicamento(medicamento)} /> */}
                                    </Container>
                                </Navbar>


                            </Card.Header>
                            <Card.Body>

                                {data ?
                                    <Table striped bordered hover>


                                        <thead>
                                            <tr>
                                                <th style={{ width: '20%' }} >Nome</th>
                                                <th style={{ width: '20%' }} >Lote</th>
                                                <th style={{ width: '20%' }} >Dosagem</th>
                                                <th style={{ width: '20%' }} >Validade</th>
                                                <th style={{ width: '20%' }} >Quantidade</th>
                                                <th style={{ width: '20%' }} >Operações</th>

                                            </tr>
                                        </thead>
                                        <tbody>
                                            <>
                                                {data ? data.filter((item) => {
                                                    return busca.toLowerCase() === ''
                                                        ? item
                                                        : item.lote.toLowerCase().includes(busca.toLowerCase()) ||
                                                        item.dosagem.toLowerCase().includes(busca.toLowerCase())

                                                }).map((medicamento, index) =>
                                                    <tr key={index}>
                                                        {console.log(medicamento)}
                                                        <td>{remedio.nome}</td>
                                                        <td>{medicamento.lote}</td>
                                                        <td>{medicamento.dosagem}</td>
                                                        <td>{medicamento.validade}</td>
                                                        <td>{medicamento.quantidade}</td>
                                                        <td>{"+       -"}</td>
                                                        {/* <td>
                                                            <OperacoesMedicamento remedio={remedio} listaDD={infoDD} data={data} setData={setData} />
                                                        </td> */}
                                                    </tr>
                                                ) : ''}
                                            </>
                                        </tbody>
                                    </Table> : "Sem medicamentos cadastrados"}

                            </Card.Body>
                        </Card>
                    </section>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default ModalSaidaEstoque;
