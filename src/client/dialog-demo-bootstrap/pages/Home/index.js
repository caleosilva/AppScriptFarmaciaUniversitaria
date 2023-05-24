import React from "react"
import Image from 'react-bootstrap/Image';
import style from '../style.css'


export default function Home() {

    const imgUrl = 'https://drive.google.com/uc?export=view&id=16w37OmWjBmHXN8aWdYud1wQYAJt__jnP';

    return (
        <div className="d-flex justify-content-center margemNavBar">
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