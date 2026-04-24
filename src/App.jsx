/* ============================================
   App.jsx - Componente raíz de la aplicación
   ============================================
   
   Este es el componente PRINCIPAL que contiene
   toda la estructura de la landing page.
   
   Aquí importamos y organizamos:
   - El ThemeProvider (contexto global)
   - La navegación
   - El hero
   - Todas las secciones de aprendizaje
   - El footer
*/

// Importar el proveedor de contexto (tema global)
import { ThemeProvider } from './context/ThemeContext'

// Importar componentes de estructura
import Navbar from './components/Navbar'
import Hero from './components/Hero'

// Importar todas las secciones de aprendizaje
import JSXSection from './components/sections/JSXSection'
import ComponentsSection from './components/sections/ComponentsSection'
import PropsSection from './components/sections/PropsSection'
import StateSection from './components/sections/StateSection'
import EffectsSection from './components/sections/EffectsSection'
import ConditionalSection from './components/sections/ConditionalSection'
import ListsSection from './components/sections/ListsSection'
import FormsSection from './components/sections/FormsSection'
import ContextSection from './components/sections/ContextSection'
import RefsSection from './components/sections/RefsSection'
import CustomHooksSection from './components/sections/CustomHooksSection'
import MemoSection from './components/sections/MemoSection'
import ReducerSection from './components/sections/ReducerSection'
import PortalsSection from './components/sections/PortalsSection'

function App() {
  return (
    // ThemeProvider envuelve TODO para que cualquier
    // componente hijo pueda acceder al tema (Context API)
    <ThemeProvider>
      <div className="min-h-screen bg-dark-900">
        
        {/* Barra de navegación fija arriba */}
        <Navbar />

        {/* Sección hero con título grande */}
        <Hero />

        {/* Contenido principal con todas las secciones */}
        <main className="relative">
          
          {/* Esferas decorativas de fondo (solo visual) */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-react-500/5 rounded-full blur-3xl" />
            <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
            <div className="absolute top-1/2 left-1/3 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
          </div>

          {/* === LAS 14 SECCIONES DE REACT === */}
          <JSXSection />
          <ComponentsSection />
          <PropsSection />
          <StateSection />
          <EffectsSection />
          <ConditionalSection />
          <ListsSection />
          <FormsSection />
          <ContextSection />
          <RefsSection />
          <CustomHooksSection />
          <MemoSection />
          <ReducerSection />
          <PortalsSection />

          {/* === FOOTER === */}
          <footer className="relative py-16 border-t border-white/10">
            <div className="max-w-7xl mx-auto px-4 text-center">
              <div className="text-6xl mb-4">⚛️</div>
              <h3 className="text-2xl font-bold gradient-text mb-4">
                ¡Sigue Aprendiendo React!
              </h3>
              <p className="text-gray-400 mb-8 max-w-lg mx-auto">
                Esta guía cubre los conceptos fundamentales. Practica cada uno
                y construye proyectos reales para dominar React.
              </p>
              <div className="flex justify-center gap-4 flex-wrap">
                <a
                  href="https://react.dev"
                  target="_blank"
                  rel="noreferrer"
                  className="px-6 py-3 glass rounded-xl hover:bg-react-500/20 transition-all duration-300 text-react-500 font-medium"
                >
                  📖 Docs Oficiales
                </a>
                <a
                  href="https://github.com/facebook/react"
                  target="_blank"
                  rel="noreferrer"
                  className="px-6 py-3 glass rounded-xl hover:bg-white/10 transition-all duration-300 text-gray-300 font-medium"
                >
                  🐙 GitHub
                </a>
              </div>
              <p className="text-gray-600 mt-12 text-sm">
                Hecho con ❤️ y React + Tailwind CSS v4
              </p>
            </div>
          </footer>
        </main>
      </div>
    </ThemeProvider>
  )
}

// Exportar para que main.jsx pueda usarlo
export default App