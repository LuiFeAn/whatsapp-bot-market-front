import React from 'react';

import ReactDOM from 'react-dom/client';

import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import { BrowserRouter } from 'react-router-dom';

import App from './components/App';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    
      <BrowserRouter>

        <ToastContainer position={toast.POSITION.BOTTOM_LEFT}/>

        <App/>

      </BrowserRouter>
      
  </React.StrictMode>,
)
