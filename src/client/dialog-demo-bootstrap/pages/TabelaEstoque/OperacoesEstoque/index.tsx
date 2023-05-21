import React from 'react';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import ModalEntradaEstoque from '../ModalEntradaEstoque';
import ModalSaidaEstoque from '../ModalSaidaEstoque';


export default function OperacoesEstoque({ remedio }: { remedio: any }){

    return (
        <ButtonGroup aria-label="Basic example">
            <ModalEntradaEstoque remedio={remedio}/>

            <ModalSaidaEstoque remedio={remedio}/>
            
            
            <Button variant="outline-secondary">
                <img
                    alt=""
                    src="/img/icones/expand_content.svg"
                    width="25"
                    height="25"
                    className="d-inline-block align-top"
                />{' '}
            </Button>
            <Button variant="outline-secondary">
                <img
                    alt=""
                    src="/img/icones/edit.svg"
                    width="25"
                    height="25"
                    className="d-inline-block align-top"
                />{' '}
            </Button>
        </ButtonGroup>
    )
}