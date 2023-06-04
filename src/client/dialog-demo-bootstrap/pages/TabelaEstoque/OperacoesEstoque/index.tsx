import React from 'react';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import ModalEntradaEstoque from '../ModalEntradaEstoque';
import ModalSaidaEstoque from '../ModalSaidaEstoque';
import ModalVerMaisEstoque from '../ModalVerMaisEstoque';
import ModalAtualizarInformacoesEstoque from '../ModalAtualizarInformacoesEstoque';
import ModalExcluir from '../ModalExcluir';


export default function OperacoesEstoque({ remedio, listaDD, doadores, data, setData, index}: { remedio: any, listaDD: string[][], doadores: [{}], data: Array<any>, setData: Function, index: number }){

    return (
        <ButtonGroup aria-label="Basic example">
            <ModalEntradaEstoque remedio={remedio} listaDD={listaDD} doadores={doadores} data={data} setData={setData}/>
            <ModalSaidaEstoque remedio={remedio} listaDD={listaDD} data={data} setData={setData}/>
            <ModalVerMaisEstoque remedio={remedio}/>
            <ModalAtualizarInformacoesEstoque remedio={remedio} listaDD={listaDD}/>
            <ModalExcluir remedio={remedio}/>
        </ButtonGroup>
    )
}