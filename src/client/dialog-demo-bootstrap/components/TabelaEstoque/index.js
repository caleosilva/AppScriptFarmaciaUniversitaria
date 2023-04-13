import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import InputBuscar from '../InputBuscar';
import BotaoSecondary from '../BotaoSecondary';
import GrupoBotao from '../GrupoBotao';

function TabelaEstoque() {
    return (
        <section className='m-5'>
            <Card>
                <Card.Header>

                    <Navbar>
                        <Container d-flex className='justify-content-around'>
                            <Navbar.Brand href="">Estoque de medicamento</Navbar.Brand>
                            <InputBuscar placeholder={"Nome do medicamento"}/>
                        </Container>
                    </Navbar>

                </Card.Header>
                <Card.Body>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Lote</th>
                                <th>Data de validade</th>
                                <th>Operações</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Dorflex</td>
                                <td>AB53GF</td>
                                <td>12/03/2023</td>
                                <td colSpan={"1"} className='BotoesOperacoes'>
                                    <GrupoBotao primeiroLabel={"Registrar entrada"} segundoLabel={"Registrar saída"} terceiroLabel={""}/>
                                </td>
                            </tr>
                            <tr>
                                <td>Dramin</td>
                                <td>DH738S</td>
                                <td>08/06/2024</td>
                                <td colSpan={"1"}>
                                    <GrupoBotao primeiroLabel={"Registrar entrada"} segundoLabel={"Registrar saída"} terceiroLabel={""}/>
                                </td>
                            </tr>
                            <tr>
                                <td>Paracetamol</td>
                                <td>14R46FS</td>
                                <td>28/03/2025</td>
                                <td colSpan={"1"}>
                                    <GrupoBotao primeiroLabel={"Registrar entrada"} segundoLabel={"Registrar saída"} terceiroLabel={""}/>
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
        </section>
    )
}

export default TabelaEstoque;