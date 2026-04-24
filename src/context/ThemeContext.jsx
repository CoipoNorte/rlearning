/* ============================================
   ThemeContext.jsx - Contexto global de tema
   ============================================
   
   Context API permite compartir datos entre
   componentes sin pasar props manualmente
   en cada nivel (evita "prop drilling").
   
   Este contexto maneja:
   - El tema (dark/light)
   - El color de acento
   
   Cualquier componente hijo puede acceder
   a estos valores con useTheme()
*/

import { createContext, useContext, useState } from 'react'

// 1. Crear el contexto (como un "canal" de datos)
const ThemeContext = createContext()

// 2. Componente Provider que envuelve la app
//    y provee los datos a todos los hijos
export function ThemeProvider({ children }) {
  // Estado para el tema actual
  const [theme, setTheme] = useState('dark')
  // Estado para el color de acento
  const [accentColor, setAccentColor] = useState('#61dafb')

  // Función para alternar entre dark y light
  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark')
  }

  // El value es lo que podrán usar los hijos
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, accentColor, setAccentColor }}>
      {children}
    </ThemeContext.Provider>
  )
}

// 3. Hook personalizado para consumir el contexto
//    Más limpio que escribir useContext(ThemeContext) cada vez
export function useTheme() {
  const context = useContext(ThemeContext)

  // Protección: si alguien usa useTheme fuera del Provider, dará error claro
  if (!context) {
    throw new Error('useTheme debe usarse dentro de ThemeProvider')
  }

  return context
}