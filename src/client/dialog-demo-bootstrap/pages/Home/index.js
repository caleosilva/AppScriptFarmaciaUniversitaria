import React from "react"
import Image from 'react-bootstrap/Image';
import style from '../style.css'


export default function Home() {
    return (
        <div className="d-flex justify-content-center margemNavBar">
            <img
                alt=""
                src="/img/logoFarmacia.png"
                width="400"
                height="400"
                className="d-inline-block align-top"
            />{' '}
        </div>
    )
}