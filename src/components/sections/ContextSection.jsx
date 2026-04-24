/* ============================================
   ContextSection.jsx - Sección 09: Context API
   ============================================
   
   PROBLEMA: "Prop Drilling"
   Cuando necesitas pasar datos por muchos niveles:
   App → Layout → Sidebar → Menu → MenuItem
   Cada nivel recibe y pasa props que no usa.
   
   SOLUCIÓN: Context API
   Crea un "canal" de datos que cualquier componente
   puede leer sin importar qué tan profundo esté.
   
   3 pasos:
   1. createContext()           → Crear el canal
   2. <Context.Provider>        → Proveer datos
   3. useContext(MiContexto)    → Consumir datos
*/

import { createContext, useContext, useState } from 'react'
import SectionWrapper from '../ui/SectionWrapper'
import CodeBlock from '../ui/CodeBlock'
import LiveDemo from '../ui/LiveDemo'

// ==========================================
// MINI DEMO: Sistema de idiomas con Context
// ==========================================

// 1. CREAR el contexto
const IdiomaContext = createContext()

// 2. PROVIDER: componente que provee los datos
function IdiomaProvider({ children }) {
  const [idioma, setIdioma] = useState('es')

  // Traducciones
  const traducciones = {
    es: { saludo: '¡Hola Mundo!', boton: 'Cambiar idioma', desc: 'Estás viendo en Español' },
    en: { saludo: 'Hello World!', boton: 'Change language', desc: 'You are viewing in English' },
    fr: { saludo: 'Bonjour le Monde!', boton: 'Changer de langue', desc: 'Vous regardez en Français' },
    pt: { saludo: 'Olá Mundo!', boton: 'Mudar idioma', desc: 'Você está vendo em Português' },
  }

  const t = traducciones[idioma]

  // value = lo que podrán usar TODOS los hijos
  return (
    <IdiomaContext.Provider value={{ idioma, setIdioma, t }}>
      {children}
    </IdiomaContext.Provider>
  )
}

// 3. CONSUMIR: componentes hijos usan useContext
function SelectorIdioma() {
  // Acceder al contexto SIN recibir props
  const { idioma, setIdioma } = useContext(IdiomaContext)

  const idiomas = [
    { code: 'es', flag: '🇪🇸', label: 'ES' },
    { code: 'en', flag: '🇺🇸', label: 'EN' },
    { code: 'fr', flag: '🇫🇷', label: 'FR' },
    { code: 'pt', flag: '🇧🇷', label: 'PT' },
  ]

  return (
    <div className="flex gap-2">
      {idiomas.map(i => (
        <button
          key={i.code}
          onClick={() => setIdioma(i.code)}
          className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
            idioma === i.code
              ? 'bg-react-500/20 text-react-500 border border-react-500/30'
              : 'glass text-gray-400 hover:bg-white/10'
          }`}
        >
          {i.flag} {i.label}
        </button>
      ))}
    </div>
  )
}

// Otro componente hijo que también consume el contexto
function MensajeTraducido() {
  const { t } = useContext(IdiomaContext)

  return (
    <div className="p-4 glass rounded-xl text-center space-y-2">
      <h3 className="text-2xl font-bold text-white">{t.saludo}</h3>
      <p className="text-sm text-gray-400">{t.desc}</p>
    </div>
  )
}

// Demo completa con Provider envolviendo hijos
function ContextDemo() {
  return (
    <IdiomaProvider>
      <div className="space-y-4">
        <SelectorIdioma />
        <MensajeTraducido />
        <p className="text-xs text-gray-500 text-center">
          Ambos componentes acceden al idioma sin prop drilling ✨
        </p>
      </div>
    </IdiomaProvider>
  )
}

export default function ContextSection() {
  return (
    <SectionWrapper
      id="context"
      number="09"
      title="Context API"
      subtitle="Estado global sin prop drilling"
      icon="🌐"
      color="indigo"
    >
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="glass rounded-2xl p-6 space-y-4">
            <h3 className="text-xl font-bold text-white">¿Qué es Context?</h3>
            <p className="text-gray-400 leading-relaxed">
              Context pasa datos por el árbol de componentes
              <span className="text-indigo-400 font-medium"> sin prop drilling</span>.
            </p>
            <div className="space-y-2 text-sm">
              <div className="p-2 rounded-lg bg-indigo-500/10 code-font text-indigo-300">
                1. createContext() → Crear el canal
              </div>
              <div className="p-2 rounded-lg bg-indigo-500/10 code-font text-indigo-300">
                2. {'<Context.Provider>'} → Proveer datos
              </div>
              <div className="p-2 rounded-lg bg-indigo-500/10 code-font text-indigo-300">
                3. useContext() → Consumir datos
              </div>
            </div>
          </div>

          <CodeBlock
            title="Context.jsx"
            code={`import { createContext, useContext, useState } from 'react';

// 1. Crear el contexto
const IdiomaContext = createContext();

// 2. Provider con estado
function IdiomaProvider({ children }) {
  const [idioma, setIdioma] = useState('es');
  
  return (
    <IdiomaContext.Provider value={{ idioma, setIdioma }}>
      {children}
    </IdiomaContext.Provider>
  );
}

// 3. Hook personalizado (buena práctica)
function useIdioma() {
  const context = useContext(IdiomaContext);
  if (!context) {
    throw new Error('Debe usarse dentro de IdiomaProvider');
  }
  return context;
}

// 4. Consumir en cualquier hijo (sin importar profundidad)
function Boton() {
  const { idioma, setIdioma } = useIdioma();
  return <button>{idioma}</button>;
}

// 5. Envolver la app
function App() {
  return (
    <IdiomaProvider>
      <Header />   {/* puede acceder */}
      <Main />     {/* puede acceder */}
      <Footer />   {/* puede acceder */}
    </IdiomaProvider>
  );
}`}
          />
        </div>

        <div className="space-y-6">
          <LiveDemo title="Context - Selector de idioma">
            <ContextDemo />
          </LiveDemo>

          <div className="glass rounded-2xl p-6 space-y-3">
            <h4 className="text-white font-bold">🤔 ¿Cuándo usar Context?</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="flex gap-2"><span className="text-green-400">✓</span> Tema dark/light</li>
              <li className="flex gap-2"><span className="text-green-400">✓</span> Idioma</li>
              <li className="flex gap-2"><span className="text-green-400">✓</span> Usuario autenticado</li>
              <li className="flex gap-2"><span className="text-green-400">✓</span> Configuración global</li>
              <li className="flex gap-2"><span className="text-red-400">✗</span> Estado local de un componente</li>
              <li className="flex gap-2"><span className="text-red-400">✗</span> Estado complejo → useReducer</li>
            </ul>
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}