import React from 'react'
import ReactDOM from 'react-dom/client'
import { AppProvider } from './AppContext'
import ColBoletasApp from './ColBoletasApp'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppProvider>
      <ColBoletasApp/>
    </AppProvider>
  </React.StrictMode>
)
