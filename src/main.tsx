import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(  // that as HTMLElement is a type assertion
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

