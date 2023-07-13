import React from 'react';
import Select from 'react-select';
import { useEffect, useState } from 'react';




export default function InputSelectMedGeral({ label, lista, data, setData }: { label: string, lista: any, data: string, setData: Function}) {

    const [medGeral, setMedGeral] = useState(null);

    const handelSelect = (e: any) => {
        setData(e);
    }

    return (
        <>
            <h6 style={{marginBottom: '18px'}}>{label}</h6>
            <Select
                className="basic-single ReactSelect"
                classNamePrefix="select"
                isDisabled={false}
                isLoading={false}
                isClearable={true}
                isRtl={false}
                isSearchable={true}
                name="color"

                options={lista}
                onChange={handelSelect}
                value={data}
            />
        </>
    );
}