import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles/global.css' // importanto o css
import {Home} from './pages/Home' // importando home com os dados html

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Home />
  </React.StrictMode>,
)
