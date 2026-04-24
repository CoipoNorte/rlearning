/* ============================================
   main.jsx - Punto de entrada de la app
   ============================================
   
   Este es el PRIMER archivo que se ejecuta.
   Toma nuestro componente App y lo "monta" 
   dentro del div#root del HTML.
   
   StrictMode: herramienta de desarrollo que
   detecta problemas potenciales en tu código.
   Solo afecta en desarrollo, no en producción.
*/

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css' // Importar estilos globales + Tailwind

// Buscar el div#root en el HTML y renderizar la App ahí
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)