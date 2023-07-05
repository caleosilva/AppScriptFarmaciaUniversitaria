import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

import Paciente from '../../../../../models/Paciente';
import ModalVerMaisPaciente from '../ModalVerMaisPaciente';
import ModalExcluirPaciente from '../ModalExcluirPaciente';

import React from 'react';

export default function operacoesPaciente({ paciente, listaDD, data, setData, index }: { paciente: Paciente, listaDD: string[][], data: Array<Paciente>, setData: Function, index: number }) {
    return (
        <ButtonGroup aria-label="Basic example">
            <ModalVerMaisPaciente paciente={paciente} />

            <Button variant="outline-secondary">
                <i className="bi bi-pencil-square"></i>
            </Button>

            <ModalExcluirPaciente paciente={paciente} data={data} setData={setData} index={index} />
        </ButtonGroup>
    );
}

