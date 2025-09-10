import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import AuthContex from './context/AuthContex.jsx'
import AdminContex from './context/AdminContex.jsx'


createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthContex>
      <AdminContex>
        <App />
      </AdminContex>
    </AuthContex>
  </BrowserRouter>,
)
