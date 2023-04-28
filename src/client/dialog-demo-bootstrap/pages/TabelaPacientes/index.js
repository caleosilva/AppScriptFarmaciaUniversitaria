import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import InputBuscar from '../InputBuscar';
import BotaoSecondary from '../BotaoSecondary';
import GrupoBotao from '../GrupoBotao';

function TabelaPacientes() {
    return (
        <section className='m-5'>
            <Card>
                <Card.Header>

                    <Navbar>
                        <Container d-flex className='justify-content-around'>
                            <Navbar.Brand href="">Pacientes</Navbar.Brand>
                            <InputBuscar placeholder={"Nome do paciente"}/>
                            <BotaoSecondary label={"Cadastrar paciente"} />
                        </Container>
                    </Navbar>

                </Card.Header>
                <Card.Body>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>CPF</th>
                                <th>Data de nascimento</th>
                                <th>Operações</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Carlos José Almeida Neto</td>
                                <td>038.475.967-12</td>
                                <td>12/03/2003</td>
                                <td colSpan={"1"} className='BotoesOperacoes'>
                                    <GrupoBotao primeiroLabel={"Ver mais +"} segundoLabel={"Atualizar"} terceiroLabel={"Excluir"} />
                                </td>
                            </tr>
                            <tr>
                                <td>Maria Eduarda Nascimento Silva</td>
                                <td>364.283.195-90</td>
                                <td>08/06/2004</td>
                                <td colSpan={"1"}>
                                    <GrupoBotao primeiroLabel={"Ver mais +"} segundoLabel={"Atualizar"} terceiroLabel={"Excluir"} />
                                </td>
                            </tr>
                            <tr>
                                <td>Ana Júlia Silvana Albina</td>
                                <td>364.019.243-78</td>
                                <td>28/03/2001</td>
                                <td colSpan={"1"}>
                                    <GrupoBotao primeiroLabel={"Ver mais +"} segundoLabel={"Atualizar"} terceiroLabel={"Excluir"} />
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
        </section>
    )
}


export default TabelaPacientes;