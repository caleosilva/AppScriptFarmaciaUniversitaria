import './InputSelect.css'
import Form from 'react-bootstrap/Form';
import React, { useState } from 'react';



// const InputSelect = ({ label, name, data, setData, required, lista}) => {

export default function InputSelect({ label, name, data, setData, required, lista }:
    { label: string, name: string, data: string, setData: Function, required: boolean, lista: Array<string> }) {
    return (
        <section>
            <Form.Label className='labelInputConfig'>{label}</Form.Label>
            <Form.Select
                required={required}
                aria-label={label}
                name={name}
                value={data}
                onChange={(e) => setData(e.target.value)}>
                <option>{data}</option>
                {lista?.map((info) =>
                    <option key={info} value={info}>{info}</option>
                )}
            </Form.Select>
        </section>
    )
}
