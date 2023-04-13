import './InputDate.css'
import Form from 'react-bootstrap/Form';
import React from 'react';


const InputDate = ({label, controlId, value, name, data, setData}) => {
    return (
        <Form.Group className="mb-3" controlId={controlId}>
            <Form.Label className='labelInputConfig'>{label}</Form.Label>
            <Form.Control type="date" defaultValue={value} name={name} value={data} onChange={(e) => setData(e.target.value)}/>
        </Form.Group>
    )
}

export default InputDate;