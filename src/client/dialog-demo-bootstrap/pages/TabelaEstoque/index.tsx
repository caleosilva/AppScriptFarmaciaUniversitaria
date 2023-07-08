import Button from 'react-bootstrap/Button';
import { Col, InputGroup } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import { Form } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';
import Row from 'react-bootstrap/Row';
import Breadcrumb from 'react-bootstrap/Breadcrumb';


import { useEffect, useState } from 'react';
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

import { serverFunctions } from '../../../utils/serverFunctions';
import MedicamentoEspecifico from '../../../../models/MedicamentoEspecifico';
import OperacoesEstoque from './OperacoesEstoque';
import '../style.css';
import ModalEstoqueCadastrar from './ModalEstoqueCadastrar';
import formatarData from '../../Functions/formatarData';
import formatarDataParaVisualizacao from '../../Functions/formatarDataParaVisualizacao';

export default function TabelaEstoque() {
    // Carrega a informação da página anterior
    const location = useLocation();
    const infoMedicamentoGeral = location.state.remedio;

    const navigate = useNavigate();

    const handleBack = () => {
        navigate(-1);
    }

    const [busca, setBusca] = useState('');

    // Server: 
    //TO QUERENDO TIPAR ESSE DATA AQUI PRA TUDO FAZER SENTIDO
    const [data, setData] = useState(null);
    const [infoDD, setInfoDD] = useState(null)
    const [doadores, setDoadores] = useState(null);


    useEffect(() => {
        serverFunctions.queryChaveMedicamentoGeral(infoMedicamentoGeral.chaveGeral).then(string => {
            setData(JSON.parse(string));
        }).catch(alert);

    }, []);

    useEffect(() => {
        serverFunctions.getInformacoesSelect().then(string => { setInfoDD(JSON.parse(string)) }).catch(alert);
    }, []);

    useEffect(() => {
        serverFunctions.getDoadores().then(string => { setDoadores(JSON.parse(string)) }).catch(alert);
    }, []);

    useEffect(() => {
        renderTable();
    }, [data]);

    function renderTable() {
        if (data == null) {
            return (
                <div className='d-flex justify-content-center'>
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>

            )
        } else if (data == false) {
            return (
                <Alert key={"infoTabela"} variant={"dark"}>
                    Não há doações registradas para esse medicamento!
                </Alert>
            )
        } else {
            return (
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th style={{ width: '20%' }} >Lote</th>
                            <th style={{ width: '20%' }} >Validade</th>
                            <th style={{ width: '20%' }} >Dosagem</th>
                            <th style={{ width: '20%' }} >Quantidade</th>
                            <th style={{ width: '10%' }} >Operações</th>

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
                                    <td>{medicamento.lote}</td>
                                    <td>{formatarDataParaVisualizacao(medicamento.validade)}</td>
                                    <td>{medicamento.dosagem}</td>
                                    <td>{medicamento.quantidade}</td>
                                    <td>
                                        <OperacoesEstoque remedio={medicamento} listaDD={infoDD} doadores={doadores} data={data} setData={setData} index={index} />
                                    </td>
                                </tr>) : ''}
                        </>
                    </tbody>
                </Table>
            )
        }
    }

    return (
        <section className='margemNavBar ms-5 me-5'>

            <Card>
                <Card.Header>

                    <Breadcrumb>
                        <Breadcrumb.Item onClick={handleBack} >
                            <h6>
                                Medicamentos
                            </h6>

                        </Breadcrumb.Item>
                        <Breadcrumb.Item active style={{ minWidth: '80vh' }} >
                            <h6>{infoMedicamentoGeral.nome}, {infoMedicamentoGeral.principioAtivo}, {infoMedicamentoGeral.apresentacao}</h6>
                        </Breadcrumb.Item>
                    </Breadcrumb>

                    <Navbar>
                        <Container fluid>
                            <Navbar.Brand href="">Controle de estoque</Navbar.Brand>

                            <InputGroup className='buscar'>
                                <Form.Control
                                    placeholder={"Busque pelo lote ou dosagem"}
                                    aria-label={"lote ou dosagem"}
                                    aria-describedby="basic-addon2"
                                    value={busca}
                                    onChange={(ev) => setBusca(ev.target.value)}
                                />
                                <InputGroup.Text>
                                    <i className="bi bi-search"></i>
                                </InputGroup.Text>
                            </InputGroup>

                            <ModalEstoqueCadastrar data={data} setData={setData} listaDD={infoDD} chaveMedicamentoGeral={infoMedicamentoGeral.chaveGeral} />

                        </Container>
                    </Navbar>
                </Card.Header>
                <Card.Body>

                    {renderTable()}
                </Card.Body>
            </Card>

        </section>
    );
}