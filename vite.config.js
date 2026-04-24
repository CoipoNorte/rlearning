// vite.config.js
// Aquí configuramos los plugins de Vite
// React para JSX y Tailwind para los estilos
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),        // Soporte para React/JSX
    tailwindcss(),  // Tailwind v4 como plugin de Vite
  ],
})