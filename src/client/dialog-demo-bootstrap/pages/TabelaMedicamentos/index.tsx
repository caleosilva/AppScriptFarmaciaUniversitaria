import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { InputGroup } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import React from 'react';
import { useState, useEffect } from 'react';


// import InputBuscar from '../../components/InputBuscar' // TENHO QUE REFATORAR PARA UTILIZAR ISSO AQ
import MedModalCadastrar from './ModalCadastrarMedicamento';
import OperacoesMedicamento from './OperacoesMedicamento'
import { serverFunctions } from '../../../utils/serverFunctions';
import '../style.css'
import './TabelaMedicamentos.css'

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
        <section className='margemNavBar ms-5 me-5'>
            <Card>
                <Card.Header>

                    <Navbar>
                        <Container className='justify-content-around' fluid>
                            <Navbar.Brand href="">Medicamentos</Navbar.Brand>
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

                            <MedModalCadastrar
                                listaDD={infoDD}
                                data={data}
                                setData={setData}
                            />

                            {/* <MedModalCadastrar
                                listaDD={infoDD}
                                data={data}
                                setData={setData}
                                cadastrarMedicamento={medicamento => adicionarNovoMedicamento(medicamento)}
                            /> */}
                        </Container>
                    </Navbar>

                </Card.Header>
                <Card.Body>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th style={{ width: '20%' }} >Nome</th>
                                <th style={{ width: '40%' }} >Princípio ativo</th>
                                <th style={{ width: '20%' }} >Apresentação</th>
                                <th style={{ width: '20%' }} >Operações</th>
                            </tr>
                        </thead>
                        <tbody>
                            <>
                                {data ? data.filter((item) => {
                                    return busca.toLowerCase() === ''
                                        ? item
                                        : item.nome.toLowerCase().includes(busca.toLowerCase()) ||
                                        item.principioAtivo.toLowerCase().includes(busca.toLowerCase())
                                }).map((remedio, index) =>
                                    <tr key={index}>
                                        <td>{remedio.nome}</td>
                                        <td>{remedio.principioAtivo}</td>
                                        <td>{remedio.apresentacao}</td>
                                        <td>
                                            <OperacoesMedicamento remedio={remedio} listaDD={infoDD} data={data} setData={setData} />
                                        </td>
                                    </tr>
                                ) : ''}
                            </>
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
        </section>
    )
}

export default TabelaMedicamentos;