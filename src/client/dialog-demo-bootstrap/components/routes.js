import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBarFU from './NavBarFu';
import TabelaMedicamentos from '../pages/TabelaMedicamentos';
// import TabelaDoadores from '../pages/TabelaDoadores';
// import TabelaPacientes from '../pages/TabelaPacientes'
import Home from '../pages/Home';
import React from 'react';


export default function AppRouter() {
    return (
        <main>
            <Router>
                <NavBarFU/>
                <Routes>
                    <Route path='/home' element={<Home/>} />
                    <Route path='/medicamentos' element={<TabelaMedicamentos/>} />
                    {/* <Route path='/pacientes' element={<TabelaPacientes/>} />
                    <Route path='/doadores' element={<TabelaDoadores/>} /> */}
                </Routes>
            </Router>
        </main>
    );
}