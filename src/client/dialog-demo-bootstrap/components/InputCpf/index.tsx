import './InputCpf.css'
import Form from 'react-bootstrap/Form';
import React from 'react';


// value para defaultValue={value} retirado
export default function InputCpf({label, placeholder, controlId, name, data, setData}:
  {label: string, placeholder: string, controlId: string, name: string, data: string, setData: Function}) {

  return (
    <Form.Group className="mb-3" controlId={controlId}>
      <Form.Label className='labelInputConfig'>{label}</Form.Label>
      <Form.Control
        type={'text'}
        maxLength={14}
        pattern={'d{3}\.\d{3}\.\d{3}-\d{2}'}
        placeholder={placeholder}
        name={name}
        value={data}
        onChange={(e) => setData(e.target.value)} />
    </Form.Group>

  );
}