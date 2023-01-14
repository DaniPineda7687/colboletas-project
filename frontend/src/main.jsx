import React from 'react'
import ReactDOM from 'react-dom/client'
import { AppProvider } from './AppContext'
import ColBoletasApp from './ColBoletasApp'
import './index.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppProvider>
        <ToastContainer/>
        <ColBoletasApp/>
      </AppProvider>
  </React.StrictMode>
)
