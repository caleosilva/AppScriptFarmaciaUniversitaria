import './InputText.css'
import Form from 'react-bootstrap/Form';
import React from 'react';




function InputText({ label, placeholder, controlId, value, name, data, setData, required}) {
  return (
    <Form.Group className="mb-3" controlId={controlId}>
      <Form.Label className='labelInputConfig'>{label}</Form.Label>
      <Form.Control
        type="text"
        required={required}
        placeholder={placeholder}
        defaultValue={value}
        name={name}
        value={data}
        onChange={(e) => setData(e.target.value)} />
    </Form.Group>

  );
}

export default InputText;