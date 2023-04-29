// import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';

import InputText from '../../../components/InputText';
import InputDate from '../../../components/InputDate'
import InputSelect from '../../../components/InputSelect';

import React, { useEffect } from 'react';
import { useState } from 'react';
import { serverFunctions } from '../../../../utils/serverFunctions';
import { Form } from 'react-bootstrap';

function ModalEstoque({ props, data, setData }) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // Elementos do formulário:
    const [classe, setClasse] = useState(''); //-----------------SELECT
    const [tipo, setTipo] = useState(''); //---------------------SELECT 
    const [tarja, setTarja] = useState(''); //-------------------SELECT
    const [apresentacao, setApresentacao] = useState(''); //-----SELECT
    const [motivoDescarte, setMotivoDescarte] = useState(''); //-SELECT
    const [dataCadastro, setDataCadastro] = useState(''); //--------------DATA
    const [validade, setValidade] = useState(); //------------------------DATA
    const [nome, setNome] = useState('');
    const [principioAtivo, setPrincipioAtivo] = useState('');
    const [lote, setLote] = useState('');
    const [origem, setOrigem] = useState('');
    const [fabricante, setFabricante] = useState('');


    const acao = (event) => {
        event.preventDefault();
    }

    return (
        <>
            <Button variant="outline-secondary" onClick={handleShow}>
                Estoque
            </Button>

            <Modal
                dialogClassName='modal-dialog-scrollable'
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}

                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Controle de estoque</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Nav variant="tabs" defaultActiveKey="/home">
                        <Nav.Item>
                            <Nav.Link href="/entrada-estoque">Registrar entrada</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="entrada-estoque">Registrar saída</Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Modal.Body>
                <Modal.Footer>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalEstoque;
