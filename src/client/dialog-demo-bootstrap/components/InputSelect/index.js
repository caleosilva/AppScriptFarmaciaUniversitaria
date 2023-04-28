import './InputSelect.css'
import Form from 'react-bootstrap/Form';
import React, { useState } from 'react';

const InputSelect = ({ label, name, data, setData, lista}) => {
    return (
        <section>
            <Form.Label className='labelInputConfig'>{label}</Form.Label>
            <Form.Select aria-label={label} name={name} value={data} onChange={(e) => setData(e.target.value)}>
                <option selected={data}>{data}</option>
                {lista?.map((info) =>
                    <option key={info} value={info}>{info}</option>
                )}
            </Form.Select>
        </section>
    )
}

export default InputSelect;