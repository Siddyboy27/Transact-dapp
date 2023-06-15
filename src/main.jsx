import React from 'react'
import ReactDOM from 'react-dom/client'
import { TransactionProvider } from './context/TransactionContext.jsx'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <TransactionProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </TransactionProvider>,
  
  
)
