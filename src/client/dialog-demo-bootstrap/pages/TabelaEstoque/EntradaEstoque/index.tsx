import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import InputText from '../../../components/InputText';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';



import React from 'react';

export default function EntradaEstoque({ type, label, placeholder, controlId, name, data, setData, required }:
    { type: string, label: string, placeholder: string, controlId: string, name: string, data: string, setData: Function, required: boolean }) {

    return (
        <Container>
            <Row>
                <InputText type={type} required={required} label={label} placeholder={placeholder} controlId={controlId} name={name} data={data} setData={setData} />
            </Row>
            <Row>
                <ButtonGroup aria-label="Basic example">
                    <Button variant="outline-secondary">
                        <img
                            alt=""
                            src="/img/icones/check.svg"
                            width="25"
                            height="25"
                            className="d-inline-block align-top"
                        />{' '}
                    </Button>
                    <Button variant="outline-secondary">
                        <img
                            alt=""
                            src="/img/icones/cancel.svg"
                            width="25"
                            height="25"
                            className="d-inline-block align-top"
                        />{' '}
                    </Button>
                </ButtonGroup>
            </Row>
        </Container>
    )
}