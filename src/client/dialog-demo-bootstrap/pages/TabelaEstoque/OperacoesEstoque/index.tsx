import React from 'react';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';


export default function OperacoesEstoque({showAdicionar, setShowAdicionar}:{showAdicionar: boolean, setShowAdicionar: Function}){

    return (
        <ButtonGroup aria-label="Basic example">
            <Button variant="outline-secondary">
                <img
                    alt=""
                    src="/img/icones/add.svg"
                    width="25"
                    height="25"
                    className="d-inline-block align-top"
                />{' '}
            </Button>
            <Button variant="outline-secondary">
                <img
                    alt=""
                    src="/img/icones/remove.svg"
                    width="25"
                    height="25"
                    className="d-inline-block align-top"
                />{' '}
            </Button>
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