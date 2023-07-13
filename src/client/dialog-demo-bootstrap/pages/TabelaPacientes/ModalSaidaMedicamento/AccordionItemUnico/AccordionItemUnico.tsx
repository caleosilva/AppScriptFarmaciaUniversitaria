import Accordion from 'react-bootstrap/Accordion';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';

import { useState, useEffect } from 'react';
import React from 'react';

import { serverFunctions } from '../../../../../utils/serverFunctions';
import idSheet from '../../../../../../server/env';
import MedicamentoEspecifico from '../../../../../../models/MedicamentoEspecifico';
import MedicamentoGeral from '../../../../../../models/MedicamentoGeral';
import InputSelectMedGeral from '../InputSelectMedGeral/InputSelectMedGeral';
import formatarDataParaVisualizacao from '../../../../Functions/formatarDataParaVisualizacao';
import './AccordionItemUnico.css';
import InputPositiveNumber from '../../../../components/InputPositiveNumber';



export default function AccordionitemUnico({ eventKey }: { eventKey: string }) {

    const [dataMedicamentoGeral, setDataMedicamentoGeral] = useState(null);
    const [codigoMedicamentoGeral, setCodigoMedicamentoGeral] = useState(null);

    const [dataMedicamentoEspecifico, setDataMedicamentoEspecifico] = useState(null);
    const [codigoMedicamentoEspecifico, setCodigoMedicamentoEspecifico] = useState(null);

    const [quantidade, setQuantidade] = useState('');


    function renderBuscarOpcoesMedGeral() {
        var listaMedicamentoGeral = [{}];

        if (dataMedicamentoGeral != null) {
            dataMedicamentoGeral.map((event: MedicamentoGeral, index) => (
                listaMedicamentoGeral.push({ value: event.chaveGeral, label: `${event.nome}, ${event.principioAtivo}, ${event.apresentacao}. Em estoque: ${event.quantidadeTotal}` })
            ))
        }
        return (
            <InputSelectMedGeral label={"Selecione o medicamento"} lista={listaMedicamentoGeral} data={codigoMedicamentoGeral} setData={setCodigoMedicamentoGeral} />
        )
    }

    function renderBuscarOpcoesMedEspecifico() {
        var listaMedicamentoEspecifico = [{}];

        if (dataMedicamentoEspecifico != null) {
            if (Object.keys(dataMedicamentoEspecifico).length > 0) {
                dataMedicamentoEspecifico.map((event: MedicamentoEspecifico, index) => (
                    listaMedicamentoEspecifico.push({ value: event.chaveMedicamentoEspecifico, label: `Lote: ${event.lote}. Dosagem: ${event.dosagem}. Validade: ${formatarDataParaVisualizacao(event.validade)}. Quantidade: ${event.quantidade}` })
                ))
            }
        }
        return (
            <InputSelectMedGeral label={"Selecione o medicamento a ser retirado"} lista={listaMedicamentoEspecifico} data={codigoMedicamentoEspecifico} setData={setCodigoMedicamentoEspecifico} />
        )
    }

    useEffect(() => {
        serverFunctions.getMedicamentos().then(dados => { setDataMedicamentoGeral(JSON.parse(dados)) }).catch(alert);
    }, []);

    useEffect(() => {
        if (codigoMedicamentoGeral != null && Object.keys(codigoMedicamentoGeral).length != 0) {
            serverFunctions.getMedEspecificoChaveMedGeral(codigoMedicamentoGeral.value).then(dados => { setDataMedicamentoEspecifico(JSON.parse(dados)) }).catch(alert);
        } else {
            setDataMedicamentoEspecifico(null);
        }
    }, [codigoMedicamentoGeral]);

    return (
        <Accordion.Item eventKey={eventKey} className='corDeFundo'>
            <Accordion.Header>Registrar saída do {eventKey}º medicamento</Accordion.Header>
            <Accordion.Body>
                <Container>
                    <Row className='mb-3'>
                        <Col>
                            {renderBuscarOpcoesMedGeral()}
                        </Col>
                    </Row>

                    <Row>
                        <Col sm={9}>
                            {renderBuscarOpcoesMedEspecifico()}
                        </Col>

                        <Col sm={3}>
                            <InputPositiveNumber label={"Quantidade a sair"} placeholder='' controlId='inputQuantidade' name='inputNumber' data={quantidade} setData={setQuantidade} required={true} max={5} />
                        </Col>
                    </Row>

                    <Row>
                        <Col className='d-flex justify-content-center mt-5'>
                            <Button variant="outline-secondary" className='me-5'>
                                Limpar
                            </Button>

                            <Button variant="dark">
                                Confirmar
                            </Button>
                        </Col>
                    </Row>
                </Container>

            </Accordion.Body>
        </Accordion.Item>
    )
}