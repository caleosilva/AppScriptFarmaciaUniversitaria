import Button from 'react-bootstrap/Button';
import { InputGroup } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import { Form } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Alert from 'react-bootstrap/Alert';


import { useEffect, useState } from 'react';
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';


import { serverFunctions } from '../../../utils/serverFunctions';
import MedicamentoGeral from '../../../../models/MedicamentoGeral';
import OperacoesEstoque from './OperacoesEstoque';
import '../style.css';

export default function TabelaEstoque() {

    // Carrega a informação da página anterior
    const location = useLocation();
    const infoMedicamentoGeral = location.state.remedio;

    const navigate = useNavigate();

    const handleBack = () => {
        navigate(-1);
    }

    function renderTable() {
        if (data) {
            return (
                <Table striped bordered hover>
                    <thead>
                        <tr>
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
                                    <td>{medicamento.lote}</td>
                                    <td>{medicamento.dosagem}</td>
                                    <td>{medicamento.validade}</td>
                                    <td>{medicamento.quantidade}</td>
                                    <td>
                                        <p>+ -</p>
                                    </td>

                                </tr>
                            ) : ''}
                        </>
                    </tbody>
                </Table>
            )

        } else {
            return (
                <Alert key={"infoTabela"} variant={"dark"}>
                    Não há doações registradas para esse medicamento!
                </Alert>
            )
        }
    }

    const [busca, setBusca] = useState('');

    // Server:
    const [data, setData] = useState(null);
    const [infoDD, setInfoDD] = useState(null)

    useEffect(() => {
        serverFunctions.queryChaveMedicamentoGeral(infoMedicamentoGeral.chaveGeral).then(string => {
            setData(JSON.parse(string));
        }).catch(alert);

    }, []);

    useEffect(() => {
        serverFunctions.getInformacoesMedicamentos().then(string => { setInfoDD(JSON.parse(string)) }).catch(alert);
    }, []);

    return (

        <section className='margemNavBar ms-5 me-5'>

            <Card>
                <Card.Header>

                    <Navbar>
                        <Container className='justify-content-around' fluid>
                            <Navbar.Brand href="">Estoque de {infoMedicamentoGeral.nome}</Navbar.Brand>

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

                            <Button variant="outline-secondary">Cadastrar nova doação</Button>{' '}
                            <Button variant="dark" onClick={handleBack}>Voltar</Button>{' '}

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