import Form from 'react-bootstrap/Form';
import React, { useState } from 'react';



// const InputSelect = ({ label, name, data, setData, required, lista}) => {

export default function InputSelect({ label, name, data, setData, required, lista }:
    { label: string, name: string, data: any, setData: Function, required: boolean, lista: [any] }) {
    return (
        <section className='mb-3'>
            <Form.Label >{label}</Form.Label>
            <Form.Select
                required={required}
                aria-label={label}
                name={name}
                value={data}
                onChange={(e) => setData(e.target.value)}>

                <option></option>

                {lista?.map((option, index) =>
                    <option key={index} value={option.chaveDoador} label={option.nome}/>

                )}
            </Form.Select>
        </section>
    )
}
