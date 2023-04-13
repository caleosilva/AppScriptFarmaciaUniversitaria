import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import React from 'react';


import './InputBuscar.css'


function InputBuscar({placeholder}) {
    return (
        <InputGroup className='buscar'>
            <Form.Control
                placeholder={placeholder}
                aria-label={placeholder}
                aria-describedby="basic-addon2"
            />
            <Button variant="outline-secondary" id="button-addon2">
                Buscar
            </Button>
        </InputGroup>
    )


}

export default InputBuscar;