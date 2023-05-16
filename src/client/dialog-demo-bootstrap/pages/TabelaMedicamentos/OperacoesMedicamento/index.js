import React from 'react';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';

import MedModalVerMais from '../ModalVerMaisMedicamentos';
import MedModalAtualizar from '../ModalAtualizarMedicamentos';
import ModalEntradaEstoque from '../ModalEntradaEstoque';
import ModalSaidaEstoque from '../ModalSaidaEstoque';

function OperacoesMedicamento({remedio, listaDD, data, setData}) {
    return (
        <ButtonGroup aria-label="Basic example">
            <ModalEntradaEstoque/>
            <ModalSaidaEstoque remedio={remedio}/>
            <MedModalVerMais remedio={remedio}/>
            <MedModalAtualizar remedio={remedio} listaDrop={listaDD} data={data} setData={setData}/>
        </ButtonGroup>
    )
}

export default OperacoesMedicamento;