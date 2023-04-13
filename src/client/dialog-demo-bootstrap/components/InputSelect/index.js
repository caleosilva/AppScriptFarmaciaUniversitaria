import './InputSelect.css'
import Form from 'react-bootstrap/Form';
import React from 'react';



const InputSelect = ({label, name, data, setData}) => {
    return (
        <section>
            <Form.Label className='labelInputConfig'>{label}</Form.Label>
            <Form.Select aria-label={label} name={name} value={data} onChange={(e) => setData(e.target.value)}>
                <option></option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
            </Form.Select>
        </section>

    )
}

export default InputSelect;