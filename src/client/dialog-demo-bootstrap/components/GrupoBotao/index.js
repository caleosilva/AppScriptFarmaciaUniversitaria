import React from 'react';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';

import MedModalVerMais from '../MedModalVerMais';
import MedModalAtualizar from '../../pages/TabelaMedicamentos/ModalAtualizarMedicamentos';
import './GrupoBotao.css'

function GrupoBotao({remedio, tresOpcoes, listaDD, data, setData}) {
    return (
        <ButtonGroup aria-label="Basic example">
            <MedModalVerMais remedio={remedio}/>
            <MedModalAtualizar remedio={remedio} listaDrop={listaDD} data={data} setData={setData}/>
            {tresOpcoes && <Button variant="outline-secondary">Estoque</Button>}
        </ButtonGroup>
    )
}

export default GrupoBotao;