import { InputGroup } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import { Form } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';

import { useEffect, useState } from 'react';
import React from 'react'

import { serverFunctions } from '../../../utils/serverFunctions';
import '../style.css';
import formatarData from '../../Functions/formatarData';
import OperacaoPacientes from './OperacaoPacientes';

export default function TabelaPaciente() {

    const [busca, setBusca] = useState('');

    // Server: 
    const [data, setData] = useState(null);
    const [infoDD, setInfoDD] = useState(null);

    useEffect(() => {
        serverFunctions.getPacientes().then(string => { setData(JSON.parse(string)) }).catch(alert);
    }, []);

    useEffect(() => {
        serverFunctions.getInformacoesSelect().then(string => { setInfoDD(JSON.parse(string)) }).catch(alert);
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
                    Não há pacientes cadastrados no sistema!
                </Alert>
            )
        } else {
            return (
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th style={{ width: '50%' }} >Nome</th>
                            <th style={{ width: '20%' }} >Data de nascimento</th>
                            <th style={{ width: '20%' }} >CPF</th>
                            <th style={{ width: '10%' }} >Operações</th>

                        </tr>
                    </thead>
                    <tbody>
                        <>
                            {data ? data.filter((item) => {
                                return busca.toLowerCase() === ''
                                    ? item
                                    : item.nome.toLowerCase().includes(busca.toLowerCase()) ||
                                    formatarData(item.dataNascimento).toLowerCase().includes(busca.toLowerCase()) ||
                                    item.cpf.toLowerCase().includes(busca.toLowerCase())

                            }).map((paciente, index) =>
                                <tr key={index}>
                                    <td>{paciente.nome}</td>
                                    <td>{formatarData(paciente.dataNascimento)}</td>
                                    <td>{paciente.cpf}</td>
                                    <td>
                                        {/* paciente={paciente} listaDD={infoDD} data={data} setData={setData} index={index} */}
                                        <OperacaoPacientes />
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
                    <Navbar>
                        <Container fluid>
                            <Navbar.Brand href="">Doadores</Navbar.Brand>

                            {/* para que esse buscar aqui? */}
                            <InputGroup className='buscar'>
                                <Form.Control
                                    placeholder={"Busque pelo nome, data de nascimento ou CPF"}
                                    aria-label={"nome ou nascimento"}
                                    aria-describedby="basic-addon2"
                                    value={busca}
                                    onChange={(ev) => setBusca(ev.target.value)}
                                />
                                <InputGroup.Text>
                                    <i className="bi bi-search"></i>
                                </InputGroup.Text>
                            </InputGroup>

                            {/* <ModalCadastarDoador data={data} setData={setData} listaDD={infoDD}/> */}

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