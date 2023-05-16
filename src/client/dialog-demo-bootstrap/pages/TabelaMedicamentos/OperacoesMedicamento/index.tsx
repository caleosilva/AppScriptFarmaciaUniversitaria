import React from 'react';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

import MedModalVerMais from '../ModalVerMaisMedicamentos';
import MedModalAtualizar from '../ModalAtualizarMedicamentos';
import ModalEntradaEstoque from '../ModalEntradaEstoque';
import ModalSaidaEstoque from '../ModalSaidaEstoque';
import MedicamentoGeral from '../../../classes/MedicamentoGeral'



export default function OperacoesMedicamento({ remedio, listaDD, data, setData }:
    { remedio: MedicamentoGeral, listaDD: string[][], data: Array<MedicamentoGeral>, setData: Function }) {

    return (
        <ButtonGroup aria-label="Basic example">
            <ModalEntradaEstoque />
            <ModalSaidaEstoque remedio={remedio} />
            <MedModalVerMais remedio={remedio} />
            <MedModalAtualizar remedio={remedio} listaDrop={listaDD} data={data} setData={setData} />
        </ButtonGroup>
    )
}