/* ============================================
   Navbar.jsx - Barra de navegación
   ============================================
   
   Navegación fija arriba de la página.
   
   Características:
   - Se vuelve translúcida al hacer scroll
   - Resalta la sección activa
   - Menú responsive (hamburguesa en móvil)
   - Scroll suave al hacer click
   
   Hooks usados: useState, useEffect
*/

import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'

// Array con todas las secciones para generar el menú
const sections = [
  { id: 'jsx', label: 'JSX', icon: '📝' },
  { id: 'components', label: 'Componentes', icon: '🧩' },
  { id: 'props', label: 'Props', icon: '📦' },
  { id: 'state', label: 'Estado', icon: '🔄' },
  { id: 'effects', label: 'Efectos', icon: '⚡' },
  { id: 'conditional', label: 'Condicional', icon: '🔀' },
  { id: 'lists', label: 'Listas', icon: '📋' },
  { id: 'forms', label: 'Formularios', icon: '📝' },
  { id: 'context', label: 'Context', icon: '🌐' },
  { id: 'refs', label: 'Refs', icon: '🎯' },
  { id: 'custom-hooks', label: 'Custom Hooks', icon: '🪝' },
  { id: 'memo', label: 'Memo', icon: '🧠' },
  { id: 'reducer', label: 'Reducer', icon: '⚙️' },
  { id: 'portals', label: 'Portals', icon: '🌀' },
]

export default function Navbar() {
  // ¿Está abierto el menú móvil?
  const [isOpen, setIsOpen] = useState(false)
  // ¿El usuario hizo scroll?
  const [scrolled, setScrolled] = useState(false)
  // ¿Qué sección está visible actualmente?
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const handleScroll = () => {
      // Si scrolleó más de 50px, activar fondo translúcido
      setScrolled(window.scrollY > 50)

      // Detectar qué sección está visible
      // Recorremos de abajo hacia arriba para encontrar
      // la última sección que ya pasó el tope de la pantalla
      const sectionElements = sections.map(s => ({
        id: s.id,
        el: document.getElementById(s.id)
      }))

      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const { id, el } = sectionElements[i]
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= 150) {
            setActiveSection(id)
            break
          }
        }
      }
    }

    // Escuchar el evento scroll
    window.addEventListener('scroll', handleScroll)
    // Cleanup: remover listener al desmontar
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Función para scroll suave hacia una sección
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setIsOpen(false) // Cerrar menú móvil
  }

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled ? 'glass-strong shadow-lg shadow-black/20' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo - click para ir arriba */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2 group"
          >
            <span className="text-2xl group-hover:animate-spin-slow transition-transform">⚛️</span>
            <span className="font-bold text-lg gradient-text hidden sm:inline">
              rlearning
            </span>
          </button>

          {/* Navegación desktop - horizontal con scroll */}
          <div className="hidden lg:flex items-center gap-1 max-w-3xl overflow-x-auto py-2 px-2">
            {sections.map(section => (
              <button
                key={section.id}
                onClick={() => scrollTo(section.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all duration-300 ${
                  activeSection === section.id
                    ? 'bg-react-500/20 text-react-500'   // Activo
                    : 'text-gray-400 hover:text-white hover:bg-white/5' // Inactivo
                }`}
              >
                {section.label}
              </button>
            ))}
          </div>

          {/* Botón hamburguesa - solo en móvil */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-lg glass hover:bg-white/10 transition-colors"
          >
            {/* Cambiar icono según estado */}
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Menú móvil desplegable */}
      {isOpen && (
        <div className="lg:hidden glass-strong animate-slide-down border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 py-4 grid grid-cols-2 gap-2">
            {sections.map(section => (
              <button
                key={section.id}
                onClick={() => scrollTo(section.id)}
                className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm transition-all ${
                  activeSection === section.id
                    ? 'bg-react-500/20 text-react-500'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <span>{section.icon}</span>
                <span>{section.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}