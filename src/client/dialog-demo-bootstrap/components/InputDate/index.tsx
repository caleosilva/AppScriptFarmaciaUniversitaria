import Form from 'react-bootstrap/Form';
import React from 'react';


export default function InputDate({ label, controlId, name, data, setData }:
    { label: string, controlId: string, name: string, data: Date, setData: Function }) {

    const handleChange = (event) => {
        const inputValue = event.target.value;
        const inputDate = new Date(inputValue);

        if (!isNaN(inputDate.getTime())) {
            setData(inputValue);
        }
    }

    return (
        <Form.Group className="mb-3" controlId={controlId}>
            <Form.Label className='labelInputConfig'>{label}</Form.Label>
            <Form.Control type="date" name={name} value={data.toISOString().split('T')[0]} onChange={handleChange}/>
        </Form.Group>


    )
}