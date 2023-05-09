import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBarFU from './NavBarFu';
import TabelaMedicamentos from '../pages/TabelaMedicamentos';
import Home from '../pages/Home';
import React from 'react';


export default function AppRouter() {
    return (
        <main>
            <Router>
                <NavBarFU />
                <Routes>
                    <Route path='/*' element={<Home />}/>
                    <Route path='/medicamentos' element={<TabelaMedicamentos />} />

                    {/* <Route path='/' element={<Home />} /> */}
                </Routes>
            </Router>
        </main>
    );
}