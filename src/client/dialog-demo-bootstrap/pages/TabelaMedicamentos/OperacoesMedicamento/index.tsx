import React from 'react';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

import MedModalVerMais from '../ModalVerMaisMedicamentos';
import MedModalAtualizar from '../ModalAtualizarMedicamentos';
import MedicamentoGeral from '../../../../../models/MedicamentoGeral'

import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Button from 'react-bootstrap/Button';

import { Link, useNavigate } from 'react-router-dom';

import ModalTabelaEstoque from '../../TabelaEstoque'



export default function OperacoesMedicamento({ remedio, listaDD, data, setData }:
    { remedio: MedicamentoGeral, listaDD: string[][], data: Array<MedicamentoGeral>, setData: Function }) {

    const navigate = useNavigate();

    const handleNavigateEstoque = () => {
        navigate('/estoque', { state: { remedio } })
    }

    function renderEstoque() {

        const renderTooltip = (props) => (
            <Tooltip id="button-tooltip" {...props}>
                Estoque
            </Tooltip>
        )

        return (
            <OverlayTrigger
                placement="left"
                delay={{ show: 400, hide: 250 }}
                overlay={renderTooltip}
            >
                <Button variant="outline-secondary" onClick={()=> {handleNavigateEstoque()}}>
                    <img
                        alt=""
                        src="/img/icones/inventory.svg"
                        width="25"
                        height="25"
                        className="d-inline-block align-top"
                    />{' '}
                </Button>
            </OverlayTrigger>
        )
    }

    return (
        <ButtonGroup aria-label="Basic example">



            {renderEstoque()}
            {/* <ModalTabelaEstoque remedio={remedio} /> */}
            <MedModalVerMais remedio={remedio} />
            <MedModalAtualizar remedio={remedio} listaDrop={listaDD} data={data} setData={setData} />
        </ButtonGroup>
    )
}