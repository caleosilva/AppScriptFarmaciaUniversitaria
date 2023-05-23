import React from 'react';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import ModalEntradaEstoque from '../ModalEntradaEstoque';
import ModalSaidaEstoque from '../ModalSaidaEstoque';
import ModalVerMaisEstoque from '../ModalVerMaisEstoque';
import ModalAtualizarInformacoesEstoque from '../ModalAtualizarInformacoesEstoque';


export default function OperacoesEstoque({ remedio, listaDD, doadores, data, setData}: { remedio: any, listaDD: string[][], doadores: [{}], data: Array<any>, setData: Function }){

    return (
        <ButtonGroup aria-label="Basic example">
            <ModalEntradaEstoque remedio={remedio} listaDD={listaDD} doadores={doadores}/>
            <ModalSaidaEstoque remedio={remedio} listaDD={listaDD}/>
            <ModalVerMaisEstoque remedio={remedio}/>
            <ModalAtualizarInformacoesEstoque remedio={remedio} listaDD={listaDD}/>
        </ButtonGroup>
    )
}