// import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React, { useEffect } from 'react';
import { useState } from 'react';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

function ModalEntradaEstoque({ props, data, setData }) {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const opcaoEntrada = ['Doação', 'Ajuste de estoque']

    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            Entrada no estoque
        </Tooltip>
    )

    const acao = (event) => {
        event.preventDefault();
    }

    return (
        <>
            <OverlayTrigger
                placement="left"
                delay={{ show: 400, hide: 250 }}
                overlay={renderTooltip}
            >
                <Button variant="outline-secondary" onClick={handleShow}>
                    <img
                        alt=""
                        src="/img/icones/add.svg"
                        width="25"
                        height="25"
                        className="d-inline-block align-top"
                    />{' '}
                </Button>
            </OverlayTrigger>

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
                    <Modal.Title>
                        Registrar entrada
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    a
                </Modal.Body>
            </Modal>
        </>
    );
}

export default ModalEntradaEstoque;
