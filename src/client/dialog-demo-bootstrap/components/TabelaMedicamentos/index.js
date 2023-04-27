import './TabelaMedicamentos.css'

import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import InputBuscar from '../InputBuscar';
import GrupoBotao from '../GrupoBotao';
import MedModalCadastrar from '../MedModalCadastrar';
import Button from 'react-bootstrap';
import { InputGroup } from 'react-bootstrap';
import { Form } from 'react-bootstrap';

import React from 'react';
import { useState, useEffect } from 'react';

import { serverFunctions } from '../../../utils/serverFunctions';



function TabelaMedicamentos() {

    const [data, setData] = useState(null);
    useEffect(() => {
        serverFunctions.getMedicamentos().then(string => { setData(JSON.parse(string)) }).catch(alert);
    }, []);

    const [infoDD, setInfoDD] = useState(null)
    useEffect(() => {
        serverFunctions.getInformacoesMedicamentos().then(string => { setInfoDD(JSON.parse(string)) }).catch(alert);
    }, []);

    const [busca, setBusca] = useState('');

    return (
        <section className='m-5'>
            <Card>
                <Card.Header>
                    
                    <Navbar>
                        <Container d-flex className='justify-content-around'>
                            <Navbar.Brand href="">Medicamentos</Navbar.Brand>
                            <InputGroup className='buscar'>
                                <Form.Control
                                    placeholder={"Digite o nome do medicamento a ser buscado"}
                                    aria-label={"Nome do medicamento"}
                                    aria-describedby="basic-addon2"
                                    value={busca}
                                    onChange={(ev) => setBusca(ev.target.value)}
                                />
                                {/* <Button variant="outline-secondary" id="button-addon2">
                                    Buscar
                                </Button> */}
                            </InputGroup>

                            <MedModalCadastrar listaDD={infoDD} data={data} setData={setData} cadastrarMedicamento={medicamento => adicionarNovoMedicamento(medicamento)}/>
                        </Container>
                    </Navbar>

                </Card.Header>
                <Card.Body>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th style={{ width: '40%' }} >Nome</th>
                                <th style={{ width: '20%' }} >Lote</th>
                                <th style={{ width: '20%' }} >Data de validade</th>
                                <th style={{ width: '20%' }} >Operações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data ? data.filter((item) => {
                                return busca.toLowerCase() === '' 
                                ? item 
                                : item.nome.toLowerCase().includes(busca.toLowerCase())
                            }).map((remedio, index) =>
                                <tr key={index}>
                                    <td>{remedio.nome}</td>
                                    <td>{remedio.lote}</td>
                                    <td>{remedio.validade}</td>
                                    <td colSpan={"1"}>
                                        <GrupoBotao remedio={remedio} />
                                    </td>
                                </tr>
                            ) : ''}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
        </section>
    )
}

export default TabelaMedicamentos;