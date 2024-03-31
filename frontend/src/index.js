import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

import Section from './Routes/Inner_section';
import Outer_section from './Routes/Outer_section';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    
  <Outer_section/>
  </React.StrictMode>
);
