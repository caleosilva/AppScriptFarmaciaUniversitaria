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

import { useEffect, useState } from 'react';
import React from 'react'

import { serverFunctions } from '../../../utils/serverFunctions';
import MedicamentoGeral from '../../../../models/MedicamentoGeral';
import OperacoesEstoque from './OperacoesEstoque';
import EntradaEstoque from './EntradaEstoque';
import { number } from 'prop-types';
import FormCadastro from './FormCadastro';


export default function ModalTabelaEstoque({ remedio }: { remedio: MedicamentoGeral }) {

    // Controle de entrada e saida:
    const [adicionar, setAdicionar] = useState('');
    const [showAdicionar, setShowAdicionar] = useState(false);

    // Controle de cadastro:
    const [showCadastro, setShowCadastro] = useState(false);

    function renderCadastro() {
        if (showCadastro) {
            return <FormCadastro />;
        }
        return null;
    }

    // Controle da tabela:
    const [showTabela, setShowTabela] = useState(true);

    function renderTabela() {
        if (showTabela) {
            if (data) {
                return (
                    <Card>
                        <Card.Header>

                            <Navbar>
                                <Container className='justify-content-around' fluid>
                                    <InputGroup className='buscar'>
                                        <Form.Control
                                            placeholder={"Busque pelo lote ou dosagem"}
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

                                    <Button variant="outline-secondary" onClick={() => setShowCadastro(true)}>Cadastrar nova entrada</Button>{' '}
                                </Container>
                            </Navbar>


                        </Card.Header>
                        <Card.Body>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th style={{ width: '20%' }} >Nome</th>
                                        <th style={{ width: '10%' }} >Lote</th>
                                        <th style={{ width: '20%' }} >Dosagem</th>
                                        <th style={{ width: '10%' }} >Validade</th>
                                        <th style={{ width: '10%' }} >Quantidade</th>
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
                                                <td>{remedio.nome}</td>
                                                <td>{medicamento.lote}</td>
                                                <td>{medicamento.dosagem}</td>
                                                <td>{medicamento.validade}</td>
                                                <td>{medicamento.quantidade}</td>
                                                <td>
                                                    {showAdicionar ?
                                                        <EntradaEstoque type='number' label='Adicionar' placeholder='' controlId='inputEntrada' name='entradaEstoque' data={adicionar} setData={setAdicionar} required={true} />
                                                        : <OperacoesEstoque showAdicionar={showAdicionar} setShowAdicionar={setShowAdicionar} />}
                                                </td>

                                            </tr>
                                        ) : ''}
                                    </>
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                )
            } else {
                return <p>Sem medicamentos cadastrados</p>
            }
        }
        return null;
    }

    const [data, setData] = useState(null);
    const [busca, setBusca] = useState('');



    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            Estoque
        </Tooltip>
    )

    useEffect(() => {
        serverFunctions.queryChaveMedicamentoGeral(remedio.chaveGeral).then(string => { setData(JSON.parse(string)) }).catch(alert);
    }, []);

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
                        {renderCadastro()}
                        {renderTabela()}
                    </section>
                </Modal.Body>
            </Modal>
        </>
    );
}