import React from 'react';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';

import MedModalVerMais from '../ModalVerMaisMedicamentos';
import MedModalAtualizar from '../ModalAtualizarMedicamentos';

function GrupoBotao({remedio, listaDD, data, setData}) {
    return (
        <ButtonGroup aria-label="Basic example">
            <MedModalVerMais remedio={remedio}/>
            <MedModalAtualizar remedio={remedio} listaDrop={listaDD} data={data} setData={setData}/>
            <Button variant="outline-secondary">Estoque</Button>
        </ButtonGroup>
    )
}

export default GrupoBotao;