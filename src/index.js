
import React from 'react';
import { createRoot } from 'react-dom/client';

import App from './App'
import 'bootstrap/dist/css/bootstrap-utilities.min.css'

// web mobile console
import eruda from 'eruda'
eruda.init()

const root = createRoot(document.getElementById('root'));
root.render(<App/>);