import Form from 'react-bootstrap/Form';
import React from 'react';


export default function InputDate ({label, controlId, name, data, setData}: 
    {label: string, controlId: string, name: string, data: Date, setData: Function})  {

    // var dataObj= new Date(data);
    var dataFormatada = data.toISOString().split('T')[0];

    

    return (
        <Form.Group className="mb-3" controlId={controlId}>
            <Form.Label className='labelInputConfig'>{label}</Form.Label>
            <Form.Control type="date" name={name} value={dataFormatada} onChange={(e) => setData(e.target.value)}/>
        </Form.Group>

        
    )
}