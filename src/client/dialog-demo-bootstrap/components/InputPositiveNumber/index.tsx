import './InputText.css'
import Form from 'react-bootstrap/Form';
import React from 'react';


// value para defaultValue={value} retirado
export default function InputPositiveNumber({ label, placeholder, controlId, name, data, setData, required, max }:
  { label: string, placeholder: string, controlId: string, name: string, data: string, setData: Function, required: boolean, max: number }) {

  const handleChange = (e) => {
    const inputValue = e.target.value;
    if (inputValue === '' || (parseFloat(inputValue) > 0 && parseFloat(inputValue) <= max)) {
      setData(inputValue);
    }
  }

  return (
    <Form.Group className="mb-3" controlId={controlId}>
      <Form.Label className='labelInputConfig'>{label}</Form.Label>
      <Form.Control
        type={"number"}
        required={required}
        placeholder={placeholder}
        name={name}
        value={data}
        onChange={handleChange} />
    </Form.Group>

  );
}