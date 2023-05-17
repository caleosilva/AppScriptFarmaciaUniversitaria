import React from 'react';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

import MedModalVerMais from '../ModalVerMaisMedicamentos';
import MedModalAtualizar from '../ModalAtualizarMedicamentos';

import MedicamentoGeral from '../../../../../models/MedicamentoGeral'
import ModalTabelaEstoque from '../../TabelaEstoque'

import ModalEntradaEstoque from '../ModalEntradaEstoque';
import ModalSaidaEstoque from '../ModalSaidaEstoque';



export default function OperacoesMedicamento({ remedio, listaDD, data, setData }:
    { remedio: MedicamentoGeral, listaDD: string[][], data: Array<MedicamentoGeral>, setData: Function }) {

    return (
        <ButtonGroup aria-label="Basic example">

            {/* <ModalEntradaEstoque /> */}
            {/* <ModalSaidaEstoque remedio={remedio} /> */}
            <ModalTabelaEstoque remedio={remedio}/>
            <MedModalVerMais remedio={remedio} />
            <MedModalAtualizar remedio={remedio} listaDrop={listaDD} data={data} setData={setData} />
        </ButtonGroup>
    )
}