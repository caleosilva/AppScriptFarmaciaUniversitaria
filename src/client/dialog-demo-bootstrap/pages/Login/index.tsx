import React from "react";
import { useState } from "react";

import { Container } from "react-bootstrap";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import gerarHashCode from '../../Functions/gerarHashCode';
import InputCpf from "../../components/InputCpf";
import InputText from "../../components/InputText";
import encryptString from '../../Functions/encryptString';
import decryptHash from '../../Functions/decryptHash';
import './login.css';


export default function Login() {

    // const imgUrl = "https://drive.google.com/uc?export=view&id=1_hDV8VxzKeEK9TMefVXRLRgKQXUesGu8";

    const imgUrl = "https://drive.google.com/uc?export=view&id=1CH-FM3Sp24gjoLwM1em0qaegJdMd2LSM";
    const [cpf, setCpf] = useState('');
    const [senha, setSenha] = useState('');


    // sempre gera um hashcode diferente 
    function testar(string) {
        const hashCode = gerarHashCode(string);
        console.log(hashCode);

        if ("ZH7rkQBhXSEXRzKqQ/BbXIQawKfd65BeXRcw7VATsbc=" === hashCode) {
            console.log('SIMMMMM');
        } else {
            console.log('NÃOOOO')
        }
    }

    return (
        <section className="border pageBackground" style={{ height: "100vh", width: "100%" }}>

            <Container className="child pe-5 ps-5">
                <Row className="d-flex justify-content-center pt-4 pb-4">
                    <img
                        src={imgUrl}
                        className="d-inline-block align-top imagem noMaginPadin"
                        alt="React Bootstrap logo"
                    />
                </Row>

                <Row className="mb-3">
                    <p className="texto-fino">Bem vindo novamente. Por gentileza realize o Login em sua conta!</p>
                </Row>
                <InputCpf label={"CPF"} placeholder={""} controlId={"inputCpf"} name={"cpf"} data={cpf} setData={setCpf} />
                <Row>
                    <InputText type={"password"} required={true} label={"Senha"} placeholder={""} controlId={"inputSenha"} name={"nome"} data={senha} setData={setSenha} />
                </Row>

                <Row className="d-flex justify-content-center p-3">
                    <Button variant="outline-primary" className="corBotao tamanhoBotaoPequeno">
                        Entrar
                    </Button>
                </Row>
            </Container>
        </section>

    )
}