import React from 'react';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';

import MedModalVerMais from '../MedModalVerMais';
import MedModalAtualizar from '../MedModalAtualizar';
import './GrupoBotao.css'

function GrupoBotao({remedio, tresOpcoes}) {
    return (
        <ButtonGroup aria-label="Basic example">
            <MedModalVerMais remedio={remedio}/>
            <MedModalAtualizar remedio={remedio}/>
            {tresOpcoes &&
            <Button variant="outline-danger">Excluir</Button>}
        </ButtonGroup>
    )
}

export default GrupoBotao;