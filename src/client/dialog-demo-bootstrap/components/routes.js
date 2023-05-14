import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { Link, Route } from "wouter";


import NavBarFU from './NavBarFu';
import TabelaMedicamentos from '../pages/TabelaMedicamentos';
import Home from '../pages/Home';
import React, { useEffect } from 'react';



export default function AppRouter() {
    return (
        <main>

            {/* <Route path="/"><Home /></Route>
            <Route path="/medicamentos"><TabelaMedicamentos /></Route> */}

            <Router>
                <NavBarFU />
                <Routes>
                    <Route path='/*' element={<Home />}/>
                    <Route path='/medicamentos' element={<TabelaMedicamentos />}/>
                </Routes>
            </Router>
        </main>
    );
}