import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import NavBarFU from './NavBarFu';
import TabelaMedicamentos from '../pages/TabelaMedicamentos';
import Home from '../pages/Home';
import React, { useEffect } from 'react';
import TabelaEstoque from '../pages/TabelaEstoque';



export default function AppRouter() {
    return (
        <main>

            <Router>
                <NavBarFU />
                <Routes>
                    <Route path='/*' element={<Home />}/>
                    <Route path='/medicamentos' element={<TabelaMedicamentos />}/>
                    <Route path='/estoque' element={<TabelaEstoque/>}/>
                </Routes>
            </Router>
        </main>
    );
}