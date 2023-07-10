import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';

import NavBarFU from './NavBarFu';
import Home from '../pages/Home';
import TabelaEstoque from '../pages/TabelaEstoque';
import TabelaDoadores from '../pages/TabelaDoadores';
import TabelaMedicamentos from '../pages/TabelaMedicamentos';
import TabelaPacientes from '../pages/TabelaPacientes';
import Sobre from '../pages/Sobre';
import Login from '../pages/Login';


export default function AppRouter() {
    return (
        <main>

            <Router>
                <NavBarFU />
                <Routes>
                    <Route path='/*' element={<Home />}/>
                    <Route path='/medicamentos' element={<TabelaMedicamentos />}/>
                    <Route path='/estoque' element={<TabelaEstoque/>}/>
                    <Route path='/doadores' element={<TabelaDoadores/>}/>
                    <Route path='/pacientes' element={<TabelaPacientes/>}/>
                    <Route path='/sobre' element={<Sobre/>}/>
                    <Route path='/login' element={<Login/>}/>
                </Routes>
            </Router>
        </main>
    );
}