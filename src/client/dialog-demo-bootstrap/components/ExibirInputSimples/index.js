import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import React from 'react'

//{overflowWrap: 'break-word', wordBreak: 'break-word'}
//        style={{whiteSpace: 'pre-wrap', overflowWrap: 'break-word'}}/>


function ExibirInputSimples({label, data, controlId}) {
  return (
    <Form.Group className="mb-3" controlId={controlId} >
        <Form.Label className='labelInputConfig'>{label}</Form.Label>
        <Form.Control plaintext readOnly defaultValue={data}/>
        <hr></hr>
    </Form.Group>
  );
}

export default ExibirInputSimples;