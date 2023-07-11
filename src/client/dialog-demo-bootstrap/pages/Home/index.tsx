import React from "react"
import { Spinner } from 'react-bootstrap';
import { useState } from 'react';


export default function Home() {

    const imgUrl = 'https://drive.google.com/uc?export=view&id=1LqXNwpjQQCfQtM1ml4iLLBJQHJIv9PV1';


    return (
        <div className="d-flex justify-content-center" style={{ marginTop: "100px" }}>
            <img
                alt=""
                src={imgUrl}
                width="400"
                height="400"
                className="d-inline-block align-top"
            />{' '}
        </div>
    )
}