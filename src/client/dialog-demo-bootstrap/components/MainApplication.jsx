import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import TabelaMedicamentos from './TabelaMedicamentos';
import NavBarFU from './NavBarFu';
import Router from './routes';


const MainApplication = () => {

  return (
    <div className="App">
      <Router/>
    </div>
  )
}

export default MainApplication;
