import React, { useState, useEffect } from 'react';

import TabelaMedicamentos from './TabelaMedicamentos';
import NavBarFU from './NavBarFu';

const MainApplication = () => {

  return (
    <div className="App">
      <NavBarFU/>
      <TabelaMedicamentos/>
    </div>
  )
}

export default MainApplication;
